import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { UsersPage } from '../users/users';
import { GroupsPage } from '../groups/groups';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab4Root = UsersPage;
  tab5Root = GroupsPage;

  constructor() {

  }
}
