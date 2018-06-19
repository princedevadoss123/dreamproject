import { Routes, RouterModule } from '@angular/router';

import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component'

const appRoutes: Routes = [
    { path: '', component: LoginChooserComponent },
    {path: 'register', component: SignUpFormComponent},
    {path: 'change/pwd', component: ChangePwdComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
