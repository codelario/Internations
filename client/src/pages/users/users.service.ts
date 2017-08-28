import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
    return this._http.get("http://127.0.0.1:3000/users")
      .map(response => response.json());
  }

  public save = (user) => {
    this._http.post("http://127.0.0.1:3000/users", JSON.stringify(user), { headers: this._headers })
      .subscribe(response => response.json());
  }

  public remove = (id) => {
    return this._http.delete("http://127.0.0.1:3000/users/" + id, this._options);
  }

}