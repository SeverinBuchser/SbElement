import { SchematicContext } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { BrowserBuilderOptions, WorkspaceProject } from 'schematics-utilities';
import { addPathToArray } from './helper';

interface StyleProcessorOptions {
  includePaths: Array<string>;
}

const newStylePath = "./node_modules/sb-theming/scss";

export function addToStyleProcessorOptions(project: WorkspaceProject, _tree: Tree, _context: SchematicContext) {
  if (project.architect && project.architect.build) {
    let options: BrowserBuilderOptions = project.architect.build.options;
    let stylePreprocessorOptions = createStylePreprocessorOptions(options);
    if (addPathToArray(stylePreprocessorOptions.includePaths, newStylePath)) {
      _context.logger.info("Added new stylesheet to style processor options.")
    } else {
      _context.logger.info("Not updated style processor options, import already existing.")
    }

  }
  _context.logger.info(`Added sb-theme to style processor options.`);
}

function createStylePreprocessorOptions(options: BrowserBuilderOptions): StyleProcessorOptions {
  if ((options as any).stylePreprocessorOptions) return (options as any).stylePreprocessorOptions;
  else return (options as any).stylePreprocessorOptions = {
    includePaths: new Array<string>()
  };
}
