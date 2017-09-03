import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
//import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import {routing} from './app.routing';
import {AppComponent} from './app.component';

import {AlertComponent} from './_directives/index';
import {AlertService, AuthenticationService, UserService, TaskService} from './_services/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {TasksComponent, TaskDetailComponent, TaskSearchComponent} from './tasks/index';
import {AuthGuard} from './_guards/index';
import {HomeComponent, HomeFooterComponent} from './home/index';
import {OrderBy} from './_pipes/index';

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        HomeFooterComponent,
        TasksComponent,
        TaskDetailComponent,
        TaskSearchComponent,
        OrderBy
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        //DragulaModule,
        routing
    ],
    providers: [
        AlertService,
        AuthenticationService,
        UserService,
        TaskService,
        AuthGuard
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule {}
