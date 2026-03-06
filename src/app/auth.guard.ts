// src/app/guards/auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {

    if (!this.auth.isLoggedIn() || window.location.href.includes('dashboard-login')) {
      this.router.navigate(['/login']);
      return false;
    }
    console.log('Current URL:', window.location.href);
    // this.router.navigate([window.location.origin + '/#' + state.url]);
    return true;
  }
}
// export const authGuard: CanActivateFn = async (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   if (!authService.isLoggedIn()) {
//     return await  router.navigate(['/login']);
//       // return false;
//     }
//     return await router.navigate([window.location.origin + '/#' + state.url]);
//     // return true;
// };