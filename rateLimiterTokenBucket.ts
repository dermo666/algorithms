import { strict as assert } from 'node:assert';

const TOKEN_REFILL_RATE = 3;

class Bucket {
  constructor(private bucket: number) { }

  take() {
    if (this.bucket > 0) {
      this.bucket--;
      return true;
    }

    return false;
  }

  refill(numTokens: number) {
    // TODO: Here we should also guard some max of tokens eg. 10
    this.bucket += numTokens;
  }
}

class TokenBucketRateLimiter {
  private buckets: { [index: string]: Bucket} = {};

  canServeRequest(ipAddress) {
    if (!this.buckets[ipAddress]) {
      this.buckets[ipAddress] = new Bucket(TOKEN_REFILL_RATE);
    }

    return this.buckets[ipAddress].take();
  }

  refillBuckets() {
    Object.values(this.buckets).map(bucket => bucket.refill(TOKEN_REFILL_RATE));
  }
}

const limiter = new TokenBucketRateLimiter();

const ipOne = '1.1.1.1';
const ipTwo = '2.2.2.2';

assert.strictEqual(limiter.canServeRequest(ipOne), true);
assert.strictEqual(limiter.canServeRequest(ipOne), true);
assert.strictEqual(limiter.canServeRequest(ipOne), true);
assert.strictEqual(limiter.canServeRequest(ipOne), false);
assert.strictEqual(limiter.canServeRequest(ipTwo), true);

limiter.refillBuckets();

assert.strictEqual(limiter.canServeRequest(ipOne), true);
assert.strictEqual(limiter.canServeRequest(ipTwo), true);
