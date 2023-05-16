import { Component, OnInit } from '@angular/core';
import{UserApiService} from '../../../../shared/API-Service/User/user-api.service';
import{CateogryApiService} from '../../../../shared/API-Service/Cateogry/cateogry-api.service';

import { GetRoles } from 'src/app/shared/Models/User/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetCategoryAllForList } from 'src/app/shared/Models/Category/category';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {
  // roles$: GetRoles[];
  // categories$: any[];
  roles$: Observable<any[]>;
  categories$: Observable<any[]>;
  public update: boolean = false;
  public insertForm: FormGroup;
  requestSent: boolean;
  dropdownList$: GetCategoryAllForList[];
  selectedCateogries = [];

  constructor(private userApiService:UserApiService,private categoryService: CateogryApiService,
    private fb: FormBuilder,
    private router: Router) { 
      this.initForm()

    }

  ngOnInit(): void {
    this.getRole();
    this.getCategories();
    this.initForm();

    
  }
  initForm(user?: any) {
    this.insertForm = this.fb.group({
      //id: [user?.id ||null],
      name: [user?.name || '', Validators.required],
      nameAr: [user?.nameAr || '', Validators.required],
      username: [user?.username || '', Validators.required],
      password: [user?.password || '', Validators.required],
      roleId: [user?.roleId || '', Validators.required],
      categoriesIds: [this.selectedCateogries || []],


    });
  }
  getRole()
  {
    this.userApiService.getRoles().subscribe(res => {
      this.roles$ = of(res.data);    });
  }
  getCategories() {
    this.categoryService.getMainForList().subscribe((res) => {
      this.dropdownList$ = res.data;
    });
  }
  get fc() {
    return this.insertForm.controls;
  }
  // insertUser() {
  //   this.requestSent = true;
    
  //   this.userApiService.Createuser(this.insertForm.value).subscribe(
  //     response => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: "تم إدخال المستخدم بنجاح",
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       this.router.navigateByUrl("content/admin/ListUsers");
  //     },
  //     () => {this.requestSent = false}
  //   )
  // }
  insertUser() {
    this.requestSent = true;
    this.userApiService.Createuser(this.insertForm.value).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إدخال المستخدم بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListUsers");
      },
      () => {this.requestSent = false}
    )
  }

  updateUser() {
    this.requestSent = true;
    this.userApiService.Updateuser(this.insertForm.value).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل المستخدم بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("/content/admin/ListUsers");
      },
      () => {this.requestSent = false}
    )
  }

  onSubmit() {
   // console.log(this.insertForm.controls)
    if (this.insertForm.status == "VALID") {
      if (this.update == true) {
        this.updateUser();
      } else {
        this.insertUser();
      }
    } else {
      this.insertForm.markAllAsTouched();
    }
  }
  onRoleChange(id) {
    console.log(id)
    if (id === 1) {
      this.insertForm.get('categoriesIds').setValue(null);
    }
  }
}
