import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'homefooter',
    templateUrl: 'home-footer.component.html'
})

export class HomeFooterComponent implements OnInit {
    currentUser: User;

    constructor(private userService: UserService,
        private authenticationService: AuthenticationService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        
    }

//    deleteUser(id: number) {
//        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
//    }
}