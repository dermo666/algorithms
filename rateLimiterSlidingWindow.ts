import { strict as assert } from 'node:assert';

const RATE_LIMIT = 3;

class SlidingWindowRateLimiter {
  private buckets: { [index: string]: { [index: string]: number }} = {};

  canServeRequest(ipAddress: string, isoTime: string): boolean {
    // 2023-10-17T04:33:09.549Z => 2023-10-17T04:33 => limiting per minute interval
    const timeUnit = new Date(isoTime).setSeconds(0, 0).valueOf();

    if (!this.buckets[ipAddress]) {
      this.buckets[ipAddress] = {};
    }

    if (!this.buckets[ipAddress][timeUnit]) {
      this.buckets[ipAddress][timeUnit] = 0;
    }

    const previousRate = this.buckets[ipAddress][timeUnit - 60000] || 0;
    const currentRate = this.buckets[ipAddress][timeUnit] || 0;

    const proRataRemaining = 1 - new Date(isoTime).getSeconds() / 60;

    if (previousRate * proRataRemaining + currentRate < RATE_LIMIT) {
      this.buckets[ipAddress][timeUnit]++;

      // TODO: clean up bucket

      return true;
    }

    // TODO: clean up bucket

    return false;
  }
}

const ipOne = '1.1.1.1';
const ipTwo = '2.2.2.2';

const limiter = new SlidingWindowRateLimiter();

assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:33:09.549Z'), true);
assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:33:30.549Z'), true);
assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:33:45.549Z'), true);
assert.strictEqual(limiter.canServeRequest(ipTwo, '2023-10-17T04:33:59.549Z'), true);
assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:33:59.549Z'), false);

assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:34:01.549Z'), true);
assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:34:09.549Z'), false);
assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:34:20.549Z'), false);
assert.strictEqual(limiter.canServeRequest(ipOne, '2023-10-17T04:34:40.549Z'), true);
