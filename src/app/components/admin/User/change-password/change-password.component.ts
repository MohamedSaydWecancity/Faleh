import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Location} from '@angular/common'
import{FalehAuthService} from '../../../../shared/API-Service/Authentication/faleh-auth.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public InsertForm: FormGroup;
  public changetype: boolean = false
  public typeNewPassword: boolean = false
  public TypeConfirm: boolean = false
  public validated: boolean;

  constructor(private fb: FormBuilder, private FalehAuthService: FalehAuthService, private _location: Location
  ) { }
  ngOnInit(): void {
    this.InsertForm = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required]],

    })
    const id = JSON.parse(localStorage.getItem('FalehUserId'))
  }

  public get fc() {
    return this.InsertForm.controls
  }
  public onSubmit() {
    if (this.InsertForm.status == "VALID") {
      this.validated = true;
      
        if (this.InsertForm.get('currentPassword').value === this.InsertForm.get('newPassword').value) {
          Swal.fire({
            icon: "error",
            title: 'The new password is the current password',
            showConfirmButton: false,
            timer: 1500,
          });

        } else {
          this.insertData()
        }

       
      
    } else {
      this.validated = false;
    }
  }

  private insertData() {
    this.FalehAuthService.ChangePassword(this.InsertForm.value).subscribe((res) => {
      if (res.success) {
        this.InsertForm.reset()
        Swal.fire({
          icon: "success",
          title: 'Change Password',
          showConfirmButton: false,
          timer: 1500,
        });
       this._location.back();

      } else {
        Swal.fire({
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }
   

}
