import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AlertService, AuthenticationService, TaskService } from '../_services/index'; 
import { Task } from '../_models/index';

@Component({
    selector: 'task-search',
    templateUrl: './task-search.component.html',
    // imported to display search results correctly
    styleUrls: ['./task-search.component.css'],
})
export class TaskSearchComponent implements OnInit {
    tasks: Observable<Task[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private taskService: TaskService,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.tasks = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.taskService.search(term) : Observable.of<Task[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Task[]>([]);
            });
    }
    // navigate to task details page
    gotoDetail(task: Task): void {
        // store the task
        localStorage.setItem('currentDetailedTask', JSON.stringify(task));
        //this.searchTerms.next();
        this.router.navigate(['/tasks/', task._id]);
    }
}