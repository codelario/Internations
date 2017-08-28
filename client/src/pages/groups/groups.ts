import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular'

import { GroupComponent } from './group';
import { GroupsService } from './groups.service';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage implements OnInit {

  public groups: Array<Object>;
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
}
