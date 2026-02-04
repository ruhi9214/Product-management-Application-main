import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth)
  const router = inject(Router)

  const expectedRole = route.data?.['role']

  const userRole = auth.getRole()

  if(userRole === expectedRole){
      return true;
  }

   return router.createUrlTree(['/product-list']);


};
