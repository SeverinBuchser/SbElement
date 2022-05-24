import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Routes } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AlertExampleComponent } from "./alert/example";
import { DocConfig } from "./doc.module.config";

@Injectable({
  providedIn: 'root'
})
export class DocService extends Subject<any> {
  private _rootDoc: Observable<any>;
  private _routes: Subject<Routes> = new Subject();

  get routes(): Subject<Routes> {
    return this._routes;
  }

  constructor(
    private _docConfig: DocConfig,
    private _http: HttpClient
  ) {
    super();

    this.subscribe((rootDocContent: any) => {
      const moduleIds: Array<number> = this._getAllModuleIds(rootDocContent);
      const allModules: Array<any> = this._getModules(rootDocContent, moduleIds);
      const rootModule = this._getRootModule(allModules);
      this._buildModuleTree(rootModule);
      this._routes.next(this._buildRoutes(allModules));
    })

    this._rootDoc = this._get();


    this._rootDoc.subscribe((rootDocContent: any) => this.next(rootDocContent))
  }

  private _buildRoutes(allModules: Array<any>): Routes {
    return allModules.map((module: any) => {
      return {
        path: module.name,
        component: AlertExampleComponent
      }
    });
  }

  private _get(): Observable<any> {
    return this._http.get(`/assets/doc/${this._docConfig.docFile}`);
  }

  private _getAllModuleIds(rootDocContent: any): Array<number> {
    return rootDocContent.groups.find((group: any) => {
      return group.title == 'Classes'
    }).categories.find((category: any) => {
      return category.title == 'NgModule'
    }).children;
  }

  private _getModules(rootDocContent: any, moduleIds: Array<number>): Array<any> {
    return rootDocContent.children.filter((child: any) => {
      return moduleIds.includes(child.id);
    })
  }

  private _getRootModule(allModules: Array<any>): any {
    return allModules.find((module: any) => {
      return module.name == this._docConfig.rootModule;
    })
  }

  private _buildModuleTree(rootModule: any): void {
    console.log(rootModule)
  }
}