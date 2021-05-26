import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { BrowserBuilderOptions, WorkspaceProject } from 'schematics-utilities';
import { addPathToArray } from './helper';

const newStylePath = "./node_modules/sb-theming/scss/sb-theme.scss";


export function addToStyles(project: WorkspaceProject, _tree: Tree, _context: SchematicContext) {

  if (project.architect && project.architect.build) {
    let options: BrowserBuilderOptions = project.architect.build.options;
    let styles = createStyles(options);
    if (addPathToArray(styles, newStylePath)) {
      _context.logger.info("Added new stylesheet to styles option.")
    } else {
      _context.logger.info("Not updated styles, import already existing.")
    }

  }
  _context.logger.info(`Added sb-theme to styles.`);
}

function createStyles(options: BrowserBuilderOptions): Array<string | object> {
  if (options.styles) return options.styles;
  else return options.styles = new Array<string>();
}
