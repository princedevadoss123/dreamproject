import { Routes, RouterModule } from '@angular/router';

import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { StartPageComponent } from './start-page/start-page.component';

const appRoutes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'login-chooser', component: LoginChooserComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
