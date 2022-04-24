import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient) { }

  public get(module: string, doc: string): Observable<string> {
    return this.http.get(`/assets/example/${module}/${doc}.html`, {
      responseType: 'text'
    });
  }
}
