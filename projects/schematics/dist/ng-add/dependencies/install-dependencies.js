"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = void 0;
const tasks_1 = require("@angular-devkit/schematics/tasks");
function installDependencies() {
    return (_tree, _context) => {
        _context.addTask(new tasks_1.NodePackageInstallTask());
        _context.logger.info(`Installing packages...`);
        return _tree;
    };
}
exports.installDependencies = installDependencies;
//# sourceMappingURL=install-dependencies.js.map