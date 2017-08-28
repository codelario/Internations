import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { GroupsService } from './groups.service';
import { Group } from './group.interfase';

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
          <ion-input type="text" [(ngModel)]="group.name"></ion-input>
        </ion-item>
        <ion-item>
        <button ion-button (click)="save()">Save</button>
      </ion-item>
    </ion-list>
  </ion-content>`,
})
export class GroupComponent implements OnInit{

  public group:Group;
  constructor(private _groupsService: GroupsService, private _viewController: ViewController) {
  }

  ngOnInit() {
    this.group = {
      name: ""
    }
  }

  public save = () => {
    this._groupsService.save(this.group);
    this._viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }
}