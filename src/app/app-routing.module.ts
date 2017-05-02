import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { WelcomeComponent }       from "./welcome.component";
import { RegisterComponent }      from "./register.component";
import { ReguserComponent }       from './reguser.component';

const appRoutes: Routes = [
  { path: '',           component: WelcomeComponent},
  { path: 'register',  component: RegisterComponent},
  { path: 'reguser',    component: ReguserComponent},
  // { path: 'users',      component: UsersComponent },
//{ path: '',           redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**',         component: WelcomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
