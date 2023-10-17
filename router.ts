import { strict as assert } from 'node:assert';

class Router {
  public routes = {};

  // path can be 'aaa/bbb/ccc' or 'aaa/*/ccc'
  addRoute(path: string, result: string): void {
    const parts = path.split('/');

    let currentRoute = this.routes;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!currentRoute[part]) {
        if (i === parts.length - 1) {
          currentRoute[part] = result;
        } else {
          currentRoute[part] = {};
        }
      }

      currentRoute = currentRoute[part];
    }

    currentRoute = result;
  }
  
  route(path: string): string | undefined {
    const parts = path.split('/');
    let currentRoute: Object | undefined = this.routes;
    let i = 0;

    do {
      const part = parts[i];

      if (currentRoute[part]) {
        currentRoute = currentRoute[part];
      } else if (currentRoute['*']) {
        currentRoute = currentRoute['*'];
      } else {
        currentRoute = undefined;
      }
      i++;
    } while (currentRoute && i < parts.length);

    if (typeof (currentRoute) === 'string') {
      return currentRoute;
    } else {
      return undefined;
    }
  }
}

const router = new Router();

router.addRoute('aaa/bbb/ccc', 'one');
router.addRoute('aaa/ddd', 'two');
router.addRoute('aaa/*/ccc', 'three');
router.addRoute('eee', 'four');

console.log(router)

assert.strictEqual(router.route('aaa/bbb/ccc'), 'one');
assert.strictEqual(router.route('aaa/ddd'), 'two');
assert.strictEqual(router.route('aaa/fff/ccc'), 'three');
assert.strictEqual(router.route('eee'), 'four');
assert.strictEqual(router.route('aaa/bbb'), undefined);
assert.strictEqual(router.route('eee/dummy'), undefined);
assert.strictEqual(router.route('aaa/bbb/ccc/dummy'), undefined);
assert.strictEqual(router.route('aaa/bbb/ccc/dummy'), undefined);


