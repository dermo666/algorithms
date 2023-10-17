import { strict as assert } from 'node:assert';

const MAX_RATE = 3;

class LeakyBucketRateLimiter {
  private buckets: { [index: string]: string[] } = {};

  canServeRequest(ipAddress, request) {
    if (!this.buckets[ipAddress]) {
      this.buckets[ipAddress] = [];
    }

    if (this.buckets[ipAddress].length < MAX_RATE) {
      this.buckets[ipAddress].push(request);
      return true;
    }

    return false;
  }

  serveRequests() {
    Object.entries(this.buckets).map(([ipAddress, bucket]) => {
      const request = bucket.shift();

      console.log(`execute request ${request} for ip ${ipAddress}`);

      if (bucket.length === 0) {
        delete this.buckets[ipAddress];
      }
    });
  }
}

const ipOne = '1.1.1.1';
const ipTwo = '2.2.2.2';

const request1 = 'https://url1';
const request2 = 'https://url2';
const request3 = 'https://url3';
const request4 = 'https://url4';
const request5 = 'https://url5';

const limiter = new LeakyBucketRateLimiter();

limiter.serveRequests();

assert.strictEqual(limiter.canServeRequest(ipOne, request1), true);
assert.strictEqual(limiter.canServeRequest(ipOne, request2), true);
assert.strictEqual(limiter.canServeRequest(ipOne, request3), true);
assert.strictEqual(limiter.canServeRequest(ipTwo, request1), true);
assert.strictEqual(limiter.canServeRequest(ipOne, request4), false);

limiter.serveRequests();

console.log(limiter);

assert.strictEqual(limiter.canServeRequest(ipOne, request5), true);
assert.strictEqual(limiter.canServeRequest(ipOne, request1), false);
assert.strictEqual(limiter.canServeRequest(ipTwo, request2), true);

limiter.serveRequests();
limiter.serveRequests();

console.log(limiter);

limiter.serveRequests();

console.log(limiter);