import { Routes, RouterModule } from '@angular/router';

import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MainIndexComponent } from './main-index/main-index.component';

const appRoutes: Routes = [
    { path: '', component: LoginChooserComponent },
    {path: 'register', component: SignUpFormComponent},
    {path: 'mainIndex', component: MainIndexComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
