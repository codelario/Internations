import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import { UserComponent } from '../pages/users/user';
import { UsersService } from '../pages/users/users.service';
import { UsersGroupsService } from '../pages/users/usersGroups.service';
import { UsersGroupsComponent } from '../pages/users/usersGroups.component';
import { GroupsPage } from '../pages/groups/groups';
import { GroupComponent } from '../pages/groups/group';
import { GroupsService } from '../pages/groups/groups.service';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    UserComponent,
    GroupsPage,
    GroupComponent,
    UsersGroupsComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsersPage,
    GroupsPage,
    UserComponent,
    GroupComponent,
    UsersGroupsComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsersService,
    GroupsService,
    UsersGroupsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
