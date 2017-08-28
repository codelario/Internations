import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersGroupsService {

  private _headers;
  private _options;
  constructor(private _http: Http) { 
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
    this._options = new RequestOptions({ headers: this._headers })
  }

  public list = (userId) => {
    return this._http.get("http://127.0.0.1:3000/usersgroups/" + userId)
      .map(response => response.json());
  }

  public save = (groups) => {
    this._http.post("http://127.0.0.1:3000/usersgroups", JSON.stringify(groups), { headers: this._headers })
      .subscribe(response => response.json());
  }

}