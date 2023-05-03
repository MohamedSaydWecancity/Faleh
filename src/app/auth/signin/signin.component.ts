import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApiService} from './../../shared/API-Service/Login/login-api.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public validationform :FormGroup
  fieldTextType!: boolean;
  //  Validation form
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private formBuilder: FormBuilder, private _LoginService:LoginApiService, private _Router:Router, private _TranslateService:TranslateService) { }
  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;
    this._LoginService.user_login(this.validationform.value).subscribe((res) => {
      
      console.log(res);
      // Swal.fire({
      //   icon: "success",
      //   title: "Signed in successfully",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      localStorage.setItem('Authorization',res.data["token"]);
      localStorage.setItem('UserName',res.data["name"]);
      this._Router.navigate(["home"]);
},(err) =>{
console.log("their is an error");
Swal.fire({
  icon: 'error',
  title: 'failed to sign in',
  text:err.error.message    
})
}, () =>{
  console.log("completed");
  
});
}


get form() {
  return this.validationform.controls;
}


}
