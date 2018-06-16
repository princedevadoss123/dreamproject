import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { StartPageComponent } from './start-page/start-page.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginChooserComponent,
    StartPageComponent,
    NavTabComponent,
    SignUpComponent,
    SignUpFormComponent
  ],
  imports: [
    routing,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
