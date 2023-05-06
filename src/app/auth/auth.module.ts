import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from "./signin/signin.component";
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
