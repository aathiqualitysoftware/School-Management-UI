// src/app/guards/role.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    
    let expectedRoles:any;
    expectedRoles = this.auth.getUserRole();
    
    if (expectedRoles.length > 0) {
      //  redirectUri: window.location.origin + '/#' + state.url
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}

// export const roleGuard: CanActivateFn = async (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   let expectedRoles:any;
//   let userRole : any;
//   if(route.queryParams['action']){
//     expectedRoles = route.data['expectedRoles'][route.queryParams['action']];
//   }else{
//     expectedRoles = route.data['expectedRoles'];
//   }
//   // do api call here or while login see role we are able to fetch
//   //  userRole = authService.getUserRole();
//   if ((expectedRoles.length > 0)) {
//        return await router.navigate([window.location.origin + '/#' + state.url]);
//     // return true;
//   } else {
//     return await router.navigate(['forbidden']);
//     // return false
//   }
// };
