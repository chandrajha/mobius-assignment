import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserListComponent } from './user-list/user-list.component';

const appRoutes: Routes = [
  { path: '',redirectTo:'user-list' ,pathMatch:'full' },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-profile/:userId', component: UserProfilePageComponent },
  { path: '**', redirectTo:'user-list' ,pathMatch:'full' },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ]
})
export class AppRoutingModule { }
