import { Routes, RouterModule } from '@angular/router';

import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MainIndexComponent } from './main-index/main-index.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component'

const appRoutes: Routes = [
    { path: '', component: LoginChooserComponent },
    {path: 'register', component: SignUpFormComponent},
    {path: 'home', component: MainIndexComponent},
    {path: 'change/pwd', component: ChangePwdComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
