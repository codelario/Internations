import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { GroupsService } from '../groups/groups.service';
import { UsersGroupsService } from './usersGroups.service';

@Component({
  selector: 'page-user',
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-item>
        <ion-label>Groups</ion-label>
        <ion-select [(ngModel)]="group" #C (ionChange)="addGroup(C.value, C.name)">
          <ion-option *ngFor="let group of groups" value="{{group._id}}">{{group.name}}</ion-option>
        </ion-select>
      </ion-item>
    </ion-toolbar>
  </ion-header>
  <ion-content>
  <ion-list>
  <button ion-item *ngFor="let userGroup of userGroups">
    {{userGroup.name}}
    <ion-icon name="trash" (click)="removeGroup(userGroup.id)" item-start></ion-icon>
  </button>    
  <ion-item>
  <button ion-button (click)="closeModal()">Cancel</button>
  </ion-item>
</ion-list>
  </ion-content>`,
})
export class UsersGroupsComponent implements OnInit {

  public groups;
  public userGroups = [];
  private _userId;
  constructor(private _usersGroupsService: UsersGroupsService,
    private _groupsService: GroupsService,
    private _viewCtrl: ViewController,
    private _navParamas: NavParams) {
  }

  ngOnInit() {
    this._userId = this._navParamas.get('user');
    this.getGroupsList();
  }

  private getGroupsList = () => {

    this._groupsService.list()
      .subscribe(data => {
        if (data.groups) {
          this.groups = data.groups;
        }
      });

    this._usersGroupsService.list(this._userId)
      .subscribe(data => {
        if (data.user) {
          this.userGroups = data.user.groups;
        }
      });
  }

  private isInvalidGroup = (groupId) => this.userGroups.filter((group) => group.id == groupId).length > 0;

  public addGroup = (groupId) => {

    if (this.isInvalidGroup(groupId)) {
      return;
    }

    let newGroup = this.groups.filter((group) => group._id == groupId
    );
    this.userGroups.push({ "id": newGroup[0]._id, "name": newGroup[0].name })
    this.save();
  }

  public removeGroup = (groupId) => {
    this.userGroups = this.userGroups.filter((group) => {
      return group.id != groupId
    });
    this.save();
  }

  public closeModal = () => {
    this._viewCtrl.dismiss();
  }

  private save = () => {
    let userGroup = {
      user: this._userId,
      groups: this.userGroups
    }
    this._usersGroupsService.save(userGroup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }
}