(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // esm-package.js
  var esm_package_exports = {};
  __export(esm_package_exports, {
    default: () => esm_package_default
  });
  var esmPackageExport, esm_package_default;
  var init_esm_package = __esm({
    "esm-package.js"() {
      esmPackageExport = () => 7;
      esm_package_default = esmPackageExport;
    }
  });

  // cjs-package.js
  var require_cjs_package = __commonJS({
    "cjs-package.js"(exports, module) {
      var esmPackageExport2 = (init_esm_package(), __toCommonJS(esm_package_exports));
      var cjsPacakgeExport = () => esmPackageExport2() + 7;
      module.exports = cjsPacakgeExport;
    }
  });

  // index.js
  var test = require_cjs_package();
  console.log(test());
})();
