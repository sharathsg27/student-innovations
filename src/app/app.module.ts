import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {StudentsComponent} from './components/students/students.component';
import {AppRoutingModule} from './app.routing.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './utils/modal/modal.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthComponent} from './components/auth/auth.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoadingBarHttpModule} from '@ngx-loading-bar/http';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {UserRegisterComponent} from './user-register/user-register.component';
import {UUID} from 'angular2-uuid';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListIdeasComponent} from './components/ideas/list-ideas/list-ideas.component';
import {AddIdeaComponent} from './components/ideas/add-idea/add-idea.component';
import {AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    StudentsComponent,
    LoginComponent,
    ModalComponent,
    RegistrationComponent,
    AuthComponent,
    SignUpComponent,
    UserRegisterComponent,
    ListIdeasComponent,
    AddIdeaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoadingBarHttpModule,
    LoadingBarModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireStorageModule
  ],
  providers: [NgbActiveModal, UUID],
  bootstrap: [AppComponent]
})
export class AppModule { }
