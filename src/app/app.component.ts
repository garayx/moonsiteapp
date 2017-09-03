import { Component } from '@angular/core';
import { User } from './_models/index';
import { Task } from './_models/index';
import { UserService, AuthenticationService, TaskService } from './_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';
    currentUser: User;
    returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    constructor(private userService: UserService,
        private authService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
//    logout(): void{
//        this.authenticationService.logout();
//        this.router.navigate([this.returnUrl]);
//    }
    
}
