import { Routes } from "@angular/router";
import { authGuard } from './_helpers';
import { ListComponent } from "./users/components/list/list.component";
import { LoginComponent } from "./account/components/login/login.component";
import { RegisterComponent } from "./account/components/register/register.component";

const usersRoutes = () => import('./users/users.routes').then(x => x.USERS_ROUTES);

export const APP_ROUTES: Routes = [
    { path: '', component: ListComponent, canActivate: [authGuard] },
    { path: 'users', loadChildren: usersRoutes, canActivate: [authGuard] },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
