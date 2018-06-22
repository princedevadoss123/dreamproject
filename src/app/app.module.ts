import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

import { MainIndexComponent } from './main-index/main-index.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { AuthServiceService } from './services/auth-service.service';
import { ValidationService} from './services/validation/validation.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginChooserComponent,
    NavTabComponent,
    SignUpFormComponent,
    MainIndexComponent,
    UserHeaderComponent,
    ChangePwdComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [
    AuthServiceService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
