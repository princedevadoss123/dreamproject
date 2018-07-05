import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { routing } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginChooserComponent } from './login-chooser/login-chooser.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TokenService } from './services/tokens/token.service';
import { MainIndexComponent } from './main-index/main-index.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { AuthServiceService } from './services/auth-service.service';
import { ValidationService} from './services/validation/validation.service';
import { TokenInterceptorService } from './services/interceptor/token-interceptor.service';
import { FunctionalityService } from './services/functionality/functionality.service';

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
    ValidationService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    FunctionalityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
