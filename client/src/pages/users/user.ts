import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { UsersService } from './users.service';
import { User } from './user.interfase';

@Component({
  selector: 'page-user',
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>
        Description
      </ion-title>
      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <span ion-text color="primary" showWhen="ios">Cancel</span>
          <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
        </button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
        <ion-item>
          <ion-label fixed>Name</ion-label>
          <ion-input type="text" [(ngModel)]="user.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label fixed>Last Name</ion-label>
          <ion-input type="text" [(ngModel)]="user.lastname"></ion-input>
        </ion-item>
        <ion-item>
        <button ion-button (click)="save()">Save</button>
      </ion-item>
    </ion-list>
  </ion-content>`,
})
export class UserComponent implements OnInit{

  public user:User;
  constructor(private _usersService: UsersService, private _viewController: ViewController) {
  }

  ngOnInit() {
    this.user = {
      name: "",
      lastname: ""
    }
  }

  public save = () => {
    this._usersService.save(this.user);
    this._viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }
}