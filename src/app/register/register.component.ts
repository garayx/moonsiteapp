import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../_services/index';
import {AlertService, AuthenticationService} from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    registerForm: FormGroup;

    constructor(
        private router: Router,
        private location: Location,
        private userService: UserService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private authenticationService: AuthenticationService
    ) {
        // init form
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.email]],
            password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
            confirmPassword: ['', [Validators.required]]
        });
    }
    // method to register user as server
    register() {
        this.loading = true;
        this.model.email = this.registerForm.get('email').value;
        this.model.password = this.registerForm.get('password').value;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    goBack(): void {
        this.location.back();
    }
}