import { strict as assert } from 'node:assert';

const MAX_PER_IP = 3;
const WINDOW_INTERVAL_MS = 60 * 1000;

class SlidingWindowLogLimiter {
  logs: { [index: string]: number[] } = {};

  canServeRequest(ipAddress: string, epochTime: number) {
    if (!this.logs[ipAddress]) {
      this.logs[ipAddress] = [epochTime];
      return true;
    }

    while (this.logs[ipAddress][0] <= epochTime - WINDOW_INTERVAL_MS) {
      this.logs[ipAddress].shift();
    }

    if (this.logs[ipAddress].length < MAX_PER_IP) {
      this.logs[ipAddress].push(epochTime);
      return true;
    }

    return false;
  }
}

const limiter = new SlidingWindowLogLimiter();

const ipOne = '1.1.1.1';
const ipTwo = '2.2.2.2';

assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:00:00.000Z').valueOf()), true);
assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:00:01.000Z').valueOf()), true);
assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:00:02.000Z').valueOf()), true);
assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:00:03.000Z').valueOf()), false);

assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:01:00.000Z').valueOf()), true);
assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:01:01.000Z').valueOf()), true);
assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:01:01.500Z').valueOf()), false);
assert.strictEqual(limiter.canServeRequest(ipOne, new Date('2023-10-30T10:01:02.000Z').valueOf()), true);

