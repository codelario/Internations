import { config } from '../../config/dev.config';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupsService {

  private _headers;
  private _options;
  constructor(private _http: Http) { 
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
    this._options = new RequestOptions({ headers: this._headers })
  }

  public list = () => {
    return this._http.get(config.apiEndpoint.groups)
      .map(response => response.json());
  }

  public save = (group) => {
    this._http.post(config.apiEndpoint.groups, JSON.stringify(group), { headers: this._headers })
      .subscribe(response => response.json());
  }

  public remove = (id) => {
    return this._http.delete(config.apiEndpoint.groups + id, this._options);
  }
}