const esmPackageExport = require('./esm-package')

const cjsPacakgeExport = () => esmPackageExport() + 7

module.exports = cjsPacakgeExport