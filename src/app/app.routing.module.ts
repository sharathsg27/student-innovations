import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {RegisteredUsersComponent} from './components/registered-users/registered-users.component';
import {ListIdeasComponent} from './components/ideas/list/list-ideas.component';
import {AddIdeaComponent} from './components/ideas/add/add-idea.component';
import {ViewIdeaComponent} from './components/ideas/view/view-idea.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: RegisteredUsersComponent},
  {path: 'registration', component: UserRegisterComponent},
  {path: 'ideas', component: ListIdeasComponent},
  {path: 'add-idea', component: AddIdeaComponent},
  {path: 'view-idea/:id', component: ViewIdeaComponent}
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {

}
