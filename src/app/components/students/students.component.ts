import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  error: any;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.checkAuth()) console.log('User Verified');
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(success => {
        this.router.navigate(['/registration']);
      }).catch(error => this.error = error);
  }

}
