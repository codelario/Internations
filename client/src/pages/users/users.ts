import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UsersService } from './users.service';
import { UserComponent } from './user';
import { UsersGroupsComponent } from './usersGroups.component';
import { UserPreviewComponent } from './user-preview.component'

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage implements OnInit {

  public users: Array<Object>;
  constructor(public navCtrl: NavController, private _modalCtrl: ModalController, private _usersService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }

  public userSelected = (user) => {
    let modal = this._modalCtrl.create(UserPreviewComponent, { user: user });
    modal.present();
  }

  public removeUser = (userId) => {
    this._usersService.remove(userId).subscribe(data => this.getUsers());
  }

  private getUsers = () => {
    this._usersService.list().subscribe(data => this.users = data.users);
  };

  public openGroupsModal = (user) => {
    let modal = this._modalCtrl.create(UsersGroupsComponent, { user: user });
    modal.onDidDismiss(data => this.getUsers());
    modal.present();
  }

  public add = () => {
    let modal = this._modalCtrl.create(UserComponent);
    modal.onDidDismiss(data => this.getUsers());
    modal.present();
  }
}