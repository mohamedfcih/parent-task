import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DetailsComponent } from './components/details/details.component';


export const USERS_ROUTES: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    { path: 'details/:id', component: DetailsComponent }

];
