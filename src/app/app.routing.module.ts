import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {StudentsComponent} from './components/students/students.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthComponent} from './components/auth/auth.component';
import {ListIdeasComponent} from './components/ideas/list-ideas/list-ideas.component';
import {AddIdeaComponent} from './components/ideas/add-idea/add-idea.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'ideas', component: ListIdeasComponent},
  {path: 'add-idea', component: AddIdeaComponent},
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
  get apiPath() {
    return {
      registration: '/registration',
      ideas: '/ideas'
    };
  }
}
