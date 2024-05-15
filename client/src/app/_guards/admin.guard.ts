import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe( 
    map(user => {
      if (!user) return false;
      if (user.roles.includes('Admin') || user.roles.includes('Moderator')) return true;
      toastr.error('You cannot enter here');
      return false; 
    })
  );
};
