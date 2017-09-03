import {Routes, RouterModule} from '@angular/router';

//import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TasksComponent, TaskDetailComponent } from './tasks/index';
import { AuthGuard } from './_guards/index';
import { HomeComponent } from './home/index';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
    { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [LoginComponent, RegisterComponent, HomeComponent, TasksComponent, TaskDetailComponent];