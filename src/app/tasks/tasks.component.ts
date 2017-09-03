import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/catch'
import { AlertService, AuthenticationService, TaskService } from '../_services/index';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
 
import { User } from '../_models/index';
import { Task } from '../_models/index';


@Component({
    selector: 'tasks',
    moduleId: module.id.toString(),
    templateUrl: 'tasks.component.html',
})

export class TasksComponent implements OnInit {
    model: any = {};            // model used for forms
    loading = false;            // load boolean to disbale button and display animation
    loadingTimer = false;
    //tableLoadingTimer = false;
    //longLoading = true;         // longload boolean to display notasks warning
    currentUser: User;          // current user variable
    selectedTask: Task;         // selected task variable
    tasks: Task[] = [];         // tasks array
    //data: Object;
    
    addTaskForm : FormGroup;    // addTaskForm variable
     constructor(
        private taskService: TaskService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private fb: FormBuilder,
        //private dragula: DragulaService
         ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
//        this.dragula.setOptions('bag-tasks', {
//        });
//        this.dragula.drop.subscribe((value:any) => {
//            this.onDrop(value.slice(1));
//        });
        
    }
    
     ngOnInit() {
         // Loads all tasks from API when tasks page is opened
         this.loadTimer();
         //this.loadLongTimer()
         this.loadAllTasks();
         // init form and validations
         this.addTaskForm = this.fb.group({
             order: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
             task: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
         });
     }
     // loadAllTask method to load all tasks via taskService and assign them to tasks array
     loadAllTasks() {
         this.taskService.getAll()
            .subscribe(
            tasks => {
                this.tasks = tasks;
                //this.tableLoadingTimer == false;
                //this.alertService.success('Loaded', true);
            },
            error => {
                //this.alertService.error(error);
            });
     }
     // addTask method creates new task
     add(): void {
         this.loading = true;
         this.model.order = this.addTaskForm.get('order').value;
         this.model.task = this.addTaskForm.get('task').value;
         this.taskService.create(this.model)
             .subscribe(
             data => {
                 this.alertService.success('Added successfuly');
                 //this.tableLoadingTimer == true;
                 this.loadAllTasks();
                 //this.selectedTask = null;
                 this.loading = false;
                 this.addTaskForm.reset();
             },
             error => {
                 this.alertService.error(error);
                 this.loading = false;
             });
     }
     // method to remove task
     remove(task: Task) {
         this.loading = true;
         this.taskService.delete(task._id)
             .subscribe(
             data => {
                 this.alertService.success('Removed successfuly');
                 this.tasks = this.tasks.filter(t => t !== task);
                 if (this.selectedTask === task) {this.selectedTask = null; }
                 this.loading = false;
                 //this.router.navigate(['/login']);
             },
             error => {
                 this.alertService.error(error);
                 this.loading = false;
             });
     }
     // method to navigate to task details page
     gotoDetail(): void {
         localStorage.setItem('currentDetailedTask', JSON.stringify(this.selectedTask));
         this.router.navigate(['/tasks/', this.selectedTask._id]);
     }
     // method to select current task
     onSelect(task: Task): void {
         this.selectedTask = task;
     }
     loadTimer(): void {
         //show box msg
         //this.loadingTimer = true;
         //wait 3 Seconds and hide
         setTimeout(function () {
             this.loadingTimer = false;
             console.log(this.edited);
         }.bind(this), 5000);
     }
//     private onDrop(args:any) {
//         let [target, source] = args;
//         console.log('onDropModel:');
//         //console.log(el);
//         console.log(target);
//         console.log(source);
//     }
//     loadLongTimer(): void {
//         //show box msg
//         //wait 3 Seconds and hide
//         setTimeout(function () {
//             this.longLoading = false;
//             console.log(this.edited);
//         }.bind(this), 10000);
//     }
}