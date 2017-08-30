import { config } from '../../config/dev.config';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from './user.interfase';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private _headers;
  private _options;
  constructor(private _http: Http) {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
    this._options = new RequestOptions({ headers: this._headers })
  }

  public list = () => {
    return this._http.get(config.apiEndpoint.users)
      .map(response => response.json());
  }

  public save = (user:User) => {
    this._http.post(config.apiEndpoint.users, JSON.stringify(user), { headers: this._headers })
      .subscribe(response => response.json());
  }

  public remove = (id) => {
    return this._http.delete(config.apiEndpoint.users + id, this._options);
  }

}