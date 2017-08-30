import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'user-preview',
  templateUrl: 'user-preview.html',
})
export class UserPreviewComponent implements OnInit {

  public user;
  constructor(
    private viewCtrl: ViewController,
    private _navParamas: NavParams
  ) { }

  ngOnInit() {
    this.user = this._navParamas.get('user');
  }

  public closeModal = () => {
    this.viewCtrl.dismiss();
  }

}