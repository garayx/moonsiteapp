import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AlertService, AuthenticationService, TaskService} from '../_services/index';
import {Task} from '../_models/index';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'task-detail',
    moduleId: module.id.toString(),
    templateUrl: 'task-detail.component.html'
})

export class TaskDetailComponent {
    @Input() task: Task;
    loading = false;
    taskLoaded = false;
    updTask: Task;
    taskUpdateForm: FormGroup;

    constructor(
        private taskService: TaskService,
        //private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService,
        private fb: FormBuilder,
        private router: Router
    ) {}


    ngOnInit() {
        // check if there is a task in localStorage
        if (localStorage.getItem('currentDetailedTask')) {
            this.taskLoaded = true;
            this.task = JSON.parse(localStorage.getItem('currentDetailedTask'));
            localStorage.removeItem('currentDetailedTask');
            this.taskUpdateForm = this.fb.group({
                order: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
                task: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
            });
            this.taskUpdateForm.setValue({
                order: this.task.order,
                task: this.task.task
            });
        }
    }
    // method to save the updated task
    save(): void {
        this.loading = true;
        this.task.order = this.taskUpdateForm.get('order').value;
        this.task.task = this.taskUpdateForm.get('task').value;
        this.taskService.update(this.task)
            .subscribe(
            data => {
                this.alertService.success('Changed successfuly');
                //this.tasks = this.tasks.filter(t => t !== task);
                //if (this.selectedTask === task) {this.selectedTask = null; }
                this.loading = false;
                //this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    goBack(): void {
        this.location.back();
    }
    goToTasks(): void {
        this.router.navigate(['/tasks']);
    }
}