import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    private baseUrl: string = 'http://todos.moonsite.co.il/api';
    constructor(private http: Http) { }
    // create user method
    create(user: User) {
        return this.http.post(`${this.baseUrl}/register`, user, this.jwt()).map((response: Response) => response.json());
    }
    // delete user method
//    delete(email: string) {
//        return this.http.delete(`${this.baseUrl}/register` + email, this.jwt()).map((response: Response) => response.json());
//    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}