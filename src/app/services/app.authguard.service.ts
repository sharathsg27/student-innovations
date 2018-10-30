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
      if (this.router.url === '/home') {
        return true;
      } else {
        if (user) {
          // @ts-ignore
          this.appService.loggedInStatus.next(true);
          // @ts-ignore
          // Check if the user is registered, else query the registration table
          if (user.displayName === 'registered' && state.url === '/registration') {
            this.appService.registrationCompleteStatus.next(true);
            // @ts-ignore
            this.appService.reDirectTo('ideas');
            return false;
            // @ts-ignore
          } else if (user.displayName === 'registered' && state.url !== '/registration') {
            this.appService.registrationCompleteStatus.next(true);
            return true;
          } else {
            // @ts-ignore
            this.appService.checkUserHasRegistration(user.uid);
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    })
      .catch(error => {
        if (state.url !== '/home') {
        this.router.navigate(['/login']);
        return false;
        } else return true;
      });
  }

}
