"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDependencies = void 0;
const schematics_utilities_1 = require("schematics-utilities");
const dependencies_1 = require("./dependencies");
function addDependencies() {
    return (_tree, _context) => {
        dependencies_1.dependencies.forEach(dependency => {
            schematics_utilities_1.addPackageJsonDependency(_tree, dependency);
            _context.logger.info(`Added "${dependency.name}" into ${dependency.type}`);
        });
        return _tree;
    };
}
exports.addDependencies = addDependencies;
//# sourceMappingURL=add-dependencies.js.map