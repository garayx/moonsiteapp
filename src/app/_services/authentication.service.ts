import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { AlertService } from '../_services/index';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';



@Injectable()
export class AuthenticationService {
    private baseUrl: string = 'http://todos.moonsite.co.il/api';
    constructor(
        private http: Http,
        private alertService: AlertService,
        private router: Router) {}



    login(email: string, password: string) {
        return this.http.post(`${this.baseUrl}/login`, JSON.stringify({ email: email, password: password }),
        {headers:new Headers({'Content-Type':'application/json'})})
            .map((response: Response) => {
                let user = response.json();
                if (user.token && user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: user.token }));
                    localStorage.setItem('token', JSON.stringify(user.token));
                    localStorage.setItem('id_token', JSON.stringify(user.id_token));
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        //this.token = null;
        localStorage.removeItem('id_token');
        this.router.navigate(['/']);
        this.alertService.success('Logged out successfuly');
    }
    
    get authenticated() {
        // Check if there's an unexpired access token
        return tokenNotExpired('token');
    }
}