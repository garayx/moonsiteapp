import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {AlertService, AuthenticationService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private alertService: AlertService,
        private auth: AuthenticationService
    ) {}
    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.auth.authenticated) {
            this.router.navigate(['/']);
            this.alertService.error('Login please', true);
            return false;
        }
        return true;
    }
}