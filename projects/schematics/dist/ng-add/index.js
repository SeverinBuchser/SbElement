"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const dependencies_1 = require("./dependencies");
function ngAdd(_options) {
    return schematics_1.chain([
        _options && _options.skipPackageJson ? schematics_1.noop() : dependencies_1.addDependencies(),
        _options && _options.skipPackageJson ? schematics_1.noop() : dependencies_1.installDependencies()
    ]);
}
exports.ngAdd = ngAdd;
//# sourceMappingURL=index.js.map