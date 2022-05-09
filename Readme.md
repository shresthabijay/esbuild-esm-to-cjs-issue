# Description of issue

I was using Vite for a personal react project, and I installed `pouchdb-quick-search`. However execution of one of it's particular dependency failed. It was complaining that default export of `pouchdb-promise` is not a function. But looking into the source code, it actually was a function. After few hours of looking into the issue, I found that if a cjs file imports an esm file with an default export, the resulting esbuild output is buggy.

## Steps to reproduce

- `yarn build`
- `node out.js` 

You will see that the code doesn't execute and complains that `esmPackageExport2` is not a function.

## Cause of the issue

```javascript
// esm-package.js

const esmPackageExport = () => 7
export default esmPackageExport
```

```javascript
// cjs-package.js

const esmPackageExport = require('./esm-package')

const cjsPacakgeExport = () => esmPackageExport() + 7
module.exports = cjsPacakgeExport
```

```javascript
// index.js

const test = require('./cjs-package')

console.log(test())
```

In this example if we build index.js, esbuild outputs following for the cjs package and esm package.

```javascript
// esm-package.js
var esm_package_exports = {};
__export(esm_package_exports, {
  default: () => esm_package_default
});

// cjs-package.js
var require_cjs_package = __commonJS({
  "cjs-package.js"(exports, module) {
    var esmPackageExport2 = (init_esm_package(), __toCommonJS(esm_package_exports));
    /**
     * Note: The code below won't execute because esmPackageExport2 is not function but an object.
     * 
     *  {
     *    default: actualExport
     *  }
     * 
     * This was causing the issue.
     */
    var cjsPacakgeExport = () => esmPackageExport2() + 7;
    module.exports = cjsPacakgeExport;
  }
});
```

## Possible solution

As you can see that instead of the above output it should be something like this.

```javascript

// cjs-package.js
var require_cjs_package = __commonJS({
  "cjs-package.js"(exports, module) {
    var  { default: esmPackageExport2 } = (init_esm_package(), __toCommonJS(esm_package_exports));
    var cjsPacakgeExport = () => esmPackageExport2() + 7;
    module.exports = cjsPacakgeExport;
  }
});
```
