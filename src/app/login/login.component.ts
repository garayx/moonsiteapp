import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loginForm: FormGroup;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder
        ) {
        // init form
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.email]],
            password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]]
        });
        }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.model.email = this.loginForm.get('email').value;
        this.model.password = this.loginForm.get('password').value;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.alertService.success('Login successful', true);
                    this.router.navigate([this.returnUrl]);
                    
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