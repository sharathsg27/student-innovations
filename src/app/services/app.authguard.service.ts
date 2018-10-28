import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private appService: AppService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.appService.checkAuth().then(user => {
      if (user) {
        // @ts-ignore
        this.appService.loggedInStatus.next(true);
        // @ts-ignore
        // Check if the user is registered, else query the registration table
        if (user.displayName === 'registered') {
          this.appService.registrationCompleteStatus.next(true);
          return true;
        } else {
          // @ts-ignore
          this.appService.checkUserHasRegistration(user.uid);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    })
      .catch(error => {
        this.router.navigate(['/login']);
        return false;
      });
  }

}
