import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateCategory } from 'src/app/shared/Models/Category/category';
import{CateogryApiService }from '../../../../shared/API-Service/Cateogry/cateogry-api.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.css']
})
export class InsertCategoryComponent implements OnInit {
  category: CreateOrUpdateCategory = { titleAr: '', title: '' };
  update:boolean;
  requestSent: boolean;

  constructor( private cateogryApiService :CateogryApiService,private router: Router) { }

  ngOnInit(): void {
    // this.category = { titleAr: '', title: '' };
    // if (this.cateogryApiService.category) {
    //   this.update = true;
    //   this.cateogryApiService.category = null;
    // } else {
    //   this.update = false;
    // }
    this.requestSent = false;
    if (this.cateogryApiService.category) {
      this.update = true;
      this.category = this.cateogryApiService.category;
      this.cateogryApiService.category = null;
    } else {
      this.update = false;
      this.category = { titleAr: '', title: '' };
    }
  }

insertCategory() {
  this.requestSent = true;
  this.cateogryApiService.createCategory(this.category).subscribe(
    response => {
      Swal.fire({
        icon: 'success',
        title: "تم إدخال التصنيف بنجاح",
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl("content/admin/");
    },
    () => {this.requestSent = false}
  )
}
updateCategory() {
  // this.requestSent = true;
  // this.cateogryApiService.updateCategory(this.category).subscribe(
  //   response => {
  //     Swal.fire({
  //       icon: 'success',
  //       title: "تم تعديل التصنيف بنجاح",
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     this.router.navigateByUrl("content/admin/ListCategory");
  //   },
  //   () => {this.requestSent = false}
  // )
  this.requestSent = true;
  this.cateogryApiService.updateCategory(this.category).subscribe(
    response => {
      Swal.fire({
        icon: 'success',
        title: "تم تعديل التصنيف بنجاح",
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl("content/admin/ListCategory");
    },
    () => {this.requestSent = false}
  )
}
onSubmit() {
  // if (this.category.title != null && this.category.titleAr !=null) {
  //   if (this.update == true) {
  //     this.updateCategory();
  //   } else {
  //     this.insertCategory();
  //   }
  // } 
  if (this.category.title != null && this.category.titleAr !=null) {
    if (this.update == true) {
      this.updateCategory();
    } else {
      this.insertCategory();
    }
  } 
}
  }


