import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {RegisteredUsersComponent} from './components/registered-users/registered-users.component';
import {ListIdeasComponent} from './components/ideas/list/list-ideas.component';
import {AddIdeaComponent} from './components/ideas/add/add-idea.component';
import {ViewIdeaComponent} from './components/ideas/view/view-idea.component';
import {AuthGuard} from './services/app.authguard.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: RegisteredUsersComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: UserRegisterComponent},
  {path: 'ideas', component: ListIdeasComponent, canActivate: [AuthGuard]},
  {path: 'add-idea', component: AddIdeaComponent, canActivate: [AuthGuard]},
  {path: 'view-idea/:id', component: ViewIdeaComponent, canActivate: [AuthGuard]}
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
