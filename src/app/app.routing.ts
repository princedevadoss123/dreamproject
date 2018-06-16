import { Routes, RouterModule } from '@angular/router';

import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

const appRoutes: Routes = [
    { path: '', component: LoginChooserComponent },
    {path: 'register', component: SignUpFormComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
