import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app.routing.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoadingBarHttpModule} from '@ngx-loading-bar/http';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {UUID} from 'angular2-uuid';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListIdeasComponent} from './components/ideas/list/list-ideas.component';
import {AddIdeaComponent} from './components/ideas/add/add-idea.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {RegisteredUsersComponent} from './components/registered-users/registered-users.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ViewIdeaComponent} from './components/ideas/view/view-idea.component';
import {NgbCarouselConfig, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    UserRegisterComponent,
    ListIdeasComponent,
    AddIdeaComponent,
    UserRegisterComponent,
    RegisteredUsersComponent,
    ViewIdeaComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoadingBarHttpModule,
    Ng2SmartTableModule,
    LoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    AngularFireStorageModule,
    NgbCarouselModule,
    NgxDatatableModule,
    NgxSpinnerModule,
  ],
  exports: [ToastyModule],
  providers: [UUID, NgbCarouselConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
