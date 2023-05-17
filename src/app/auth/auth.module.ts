import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { SingUpComponent } from './components/sing-up/sing-up.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    SingUpComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule
  ],

  exports: [
    // AuthComponent,
    LoginComponent,
    RegisterComponent,
    SingUpComponent
  ],

})
export class AuthModule { }