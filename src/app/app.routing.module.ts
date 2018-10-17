import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {RegisteredUsersComponent} from './components/registered-users/registered-users.component';
import {ListIdeasComponent} from './components/ideas/list-ideas/list-ideas.component';
import {AddIdeaComponent} from './components/ideas/add-idea/add-idea.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: RegisteredUsersComponent},
  {path: 'registration', component: UserRegisterComponent},
  {path: 'ideas', component: ListIdeasComponent},
  {path: 'add-idea', component: AddIdeaComponent}
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {

}
