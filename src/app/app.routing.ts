import { Routes, RouterModule } from '@angular/router';

import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

const appRoutes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'login-chooser', component: LoginChooserComponent },
    {path: 'signUp', component: SignUpComponent},
    {path: 'signUpForm', component: SignUpFormComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
