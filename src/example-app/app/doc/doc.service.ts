import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Routes } from "@angular/router";
import { Observable } from "rxjs";
import { ExampleComponentt } from "../example/example.component";
import { DocConfig } from "./doc.module.config";

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private _rootDoc: Observable<any>;

  constructor(
    private _docConfig: DocConfig,
    private _http: HttpClient
  ) {
    this._rootDoc = this.root();
    this._rootDoc.subscribe((rootDocContent: any) => {
      
    })
  }

  public buildRoutes(): Promise<Routes> {
    return new Promise<Routes>((resolve, reject) => {
      this._rootDoc.subscribe(rootDocConfig => {
        resolve([])
      })
    })
  }

  root(): Observable<any> {
    if (this._rootDoc) return this._rootDoc;
    return this._http.get(`/assets/doc/${this._docConfig.rootModule}.json`);
  }
}