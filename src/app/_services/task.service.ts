import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/index';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Task } from '../_models/index';

@Injectable()
export class TaskService {
    // api address
    private baseUrl: string = 'http://todos.moonsite.co.il/api';
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
        ) { }
    // method to get all tasks
    getAll(){
        return this.http.get(`${this.baseUrl}/tasks`, this.jwt())
            //.map(this.extractData)
            .map((res:Response) => res.json().tasks);
            //.catch(this.handleError);
    }
    // method to create a new task
    create(task: Task) {
        return this.http.post(`${this.baseUrl}/tasks`, task, this.jwt()).map((response: Response) => response.json());
    }

//    getById(_id: string) {
//        return this.http.delete(`${this.baseUrl}/tasks/${_id}`, this.jwt()).map((response: Response) => response.json());
//    }
//    getById(_id: string): Promise<Task> {
//        //const url = `${this.heroesUrl}/${id}`;
//
//        return this.http.get(`${this.baseUrl}/tasks/${_id}`, this.jwt())
//            .toPromise()
//            .then(response => response.json().data as Task)
//            .catch(this.handleError);
//    }
    // method to update task
    update(task: Task) {
        return this.http.put(`${this.baseUrl}/tasks/${task._id}`, task, this.jwt()).map((response: Response) => response.json());
    }
    // method to delete task
    delete(_id: string) {
        return this.http.delete(`${this.baseUrl}/tasks/${_id}`, this.jwt()).map((response: Response) => response.json());
    }
    // method to search tasks
    search(term: string): Observable<Task[]> {
        return this.http
            .get(`${this.baseUrl}/tasks/search/?q=${term}`, this.jwt())
            .map((res:Response) => res.json().tasks as Task[]);
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': currentUser.token});
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({headers: headers});
            
        }
    }
}