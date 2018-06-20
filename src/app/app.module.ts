import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
//import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MainIndexComponent } from './main-index/main-index.component';
import { UserHeaderComponent } from './user-header/user-header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginChooserComponent,
    NavTabComponent,
    SignUpFormComponent,
    MainIndexComponent,
    UserHeaderComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
   // DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
