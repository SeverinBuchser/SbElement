import { SchematicContext, Tree } from '@angular-devkit/schematics';

interface ArchitectStyles {
  architect: string,
  object: any,
  path: string,
  content: Buffer | null
}

export function addDependenciesToAngularJson(options: any) {
  return (_tree: Tree, _context: SchematicContext) => {
    try {
      const angularJsonFile = _tree.read('angular.json');

      if (angularJsonFile) {
        const angularJsonFileObject = JSON.parse(angularJsonFile.toString('utf-8'));
        const project = options.project ? options.project : Object.keys(angularJsonFileObject['projects'])[0];
        const architectObject = angularJsonFileObject.projects[project].architect;
        // let styles = {
        //   "stylePreprocessorOptions": {
        //     "includePaths": [
        //       "../SbTheme/scss"
        //     ]
        //   }
        // }

        let buildStyles = getArchitectStyles(_tree, architectObject, "build");
        let testStyles = getArchitectStyles(_tree, architectObject, "test");

        addScssImportToStyleFile(_tree, _context, buildStyles);
        addScssImportToStyleFile(_tree, _context, testStyles);

        _tree.overwrite('angular.json', JSON.stringify(angularJsonFileObject, null, 2));
      }
    } catch (e) {
      _context.logger.error(`Failed to add the styles import sb-theme to styles!`);
    }

    _context.logger.info(`Added sb-theme to styles`);

    return _tree;
  };
}

function getArchitectStyles(_tree: Tree, architects: any, architectName: string): ArchitectStyles {
  let object = architects[architectName].options.styles;
  let path = object[0];
  let content = _tree.read(path);
  return {
    architect: architectName,
    object,
    path,
    content
  }
}


function addScssImportToStyleFile(_tree: Tree, _context: SchematicContext, architectStyles: ArchitectStyles): void {
  let importLine = "@import 'sb-theme'";
  if (architectStyles.content) {
    if (architectStyles.content.indexOf(importLine) < 0) {
      _tree.overwrite(architectStyles.path, importLine + ";\n" + architectStyles.content.toString('utf-8'));
    }
  } else {
    _context.logger.warn(`Skipping import to styles of architect with name ${architectStyles.architect}`);
  }
}
