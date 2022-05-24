import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import {
  Application,
  Context,
  Converter, DeclarationReflection,
  ProjectReflection,
  Reflection,
  Serializer,
  TSConfigReader,
  TypeDocReader
} from 'typedoc';
import { parseArguments } from './agrument-parser';
import { convertAngularDecorator } from './converters';
import { generateModuleTrees } from './generator';
import { resolveAngularDecorator } from './resolvers';
import { addToSerializer } from './serializers';

const sbElementTypedocFile = 'src/sb-element/typedoc.json';

export function parseDocs(typedocFile?: string) {
  if (!typedocFile) {
    typedocFile = sbElementTypedocFile;
  }
  const app = new Application();

  app.options.addReader(new TypeDocReader());
  app.options.addReader(new TSConfigReader());

  app.bootstrap({
    options: resolve(typedocFile)
  })

  addToSerializer(app.serializer);

  app.converter.on(Converter.EVENT_CREATE_DECLARATION, 
    <T extends DeclarationReflection>(context: Context, reflection: T) => {
    if (reflection.decorators) {
      reflection.decorators = reflection.decorators.map(decorator => {
        decorator.arguments = parseArguments(decorator.arguments);
        return convertAngularDecorator(decorator);  
      })
    }
  })

  app.converter.on(Converter.EVENT_END, (context: Context) => {
    context.project.children?.forEach((reflection: Reflection) => {
      if (reflection.decorators) {
        reflection.decorators = reflection.decorators.map(decorator => {
          return resolveAngularDecorator(decorator, reflection as DeclarationReflection);
        })
      }
    })
  })



  const project = app.convert()!;
  const moduleTrees = generateModuleTrees(project);
  return new ParsedDoc(project, app.serializer);
}

export class ParsedDoc {

  get project(): ProjectReflection {
    return this._project;
  }

  constructor(
    private _project: ProjectReflection,
    private _serializer: Serializer
  ) {

  }

  public projectToObject(): any {
    return this._serializer.toObject(this._project);
  }

  public toObject(reflection: Reflection): any | undefined {
    return this._serializer.toObject(reflection);
  }

  public get(id: number): any;
  public get(name: string): any;
  public get(idOrName: number | string): any | undefined {
    const reflection = this._getReflection(idOrName);
    if (reflection) {
      return this._serializer.toObject(reflection);
    }
    return;
  }

  private _getReflection(idOrName: number | string): Reflection | undefined {
    if (typeof idOrName == 'number') {
      return this._project.getReflectionById(idOrName);
    } else {
      return this._project.findReflectionByName(idOrName);
    }
  }
}