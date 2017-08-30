import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular'

import { GroupComponent } from './group';
import { GroupsService } from './groups.service';
import { Group } from './group.interfase';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage implements OnInit {

  public groups: Array<Object>;
  private originalGroupsList: Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _groupsService: GroupsService, private _modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.getGroups();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Groups');
  }

  public groupSelected = (group) => {
    let modal = this._modalCtrl.create(GroupComponent);
    modal.present();
  }

  private getGroups = () => {
    this._groupsService.list().subscribe(data => {
      this.originalGroupsList = data.groups;
      this.groups = data.groups;
    });
  }

  public add = () => {
    let modal = this._modalCtrl.create(GroupComponent);
    modal.onDidDismiss(data => {
      this.getGroups();
    });
    modal.present();
  }

  public removeGroup = (groupId) => {
    this._groupsService.remove(groupId).subscribe(data => {
      this.getGroups();
    });
  }

  public filterGroups = (searchbar) => {

    let filter = searchbar.srcElement.value;
    if (!filter) {
      this.groups = this.originalGroupsList;
      return;
    }

    this.groups = this.originalGroupsList.filter((v: Group) => {
      if (v.name) {
        if (v.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
}
