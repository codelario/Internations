import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular'
import { UsersService } from './users.service';
import { User } from './user.interfase';

@Component({
  selector: 'page-user',
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>
        User
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
          <ion-label fixed>Name *</ion-label>
          <ion-input type="text" [(ngModel)]="user.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label fixed>Last Name *</ion-label>
          <ion-input type="text" [(ngModel)]="user.lastname"></ion-input>
        </ion-item>
        <ion-item>
        <button ion-button (click)="save()">Save</button>
        <button ion-button (click)="closeModal()">Cancel</button>
      </ion-item>
    </ion-list>
  </ion-content>`,
})
export class UserComponent implements OnInit {

  public user: User;
  constructor(
    private _usersService: UsersService,
    private _viewController: ViewController,
    private _alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.user = {
      name: "",
      lastname: ""
    }
  }

  private validateFields = () => (this.user.name && this.user.lastname);

  public save = () => {
    if (!this.validateFields()) {
      let alert = this._alertCtrl.create({
        title: 'Required fields',
        subTitle: 'Required fields cannot be blank.',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }
    this._usersService.save(this.user);
    this.closeModal();
  }

  public closeModal = () => {
    this._viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }
}