import { ComponentList } from "./component-list";
import { Importer, ImportNames } from "./import-generator";
import { Route, Router } from "./route-generator";

export class GeneratorHelper {
  constructor(
    private _componentList: ComponentList,
    private _importer: Importer,
    private _router: Router
  ) {

  }

  public add(componentName: string, componentPath: string, routePath: string): void {
    this._importer.add(new ImportNames(
      componentPath,
      [componentName]
    ))

    this._componentList.add(componentName);

    this._router.add(new Route(
      0,
      routePath,
      componentName
    ))
  }

  public get(): { components: string, imports: string, routes: string} {
    return {
      components: this._componentList.generateAppend(','),
      imports: this._importer.generate(),
      routes: this._router.generate()
    }
  }
}