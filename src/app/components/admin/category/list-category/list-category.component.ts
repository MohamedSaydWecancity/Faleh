import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CateogryApiService } from 'src/app/shared/API-Service/Cateogry/cateogry-api.service';
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent extends PaginationComponent implements OnInit {

   //#region  Declare Variables
   response: any[];

 
 
   Cateogy_List: any[];
   dropdownSettings: IDropdownSettings = {};
 
   //#endregion
 
  constructor(private cateogryApiService: CateogryApiService,private router: Router) { super()}

  ngOnInit(): void {
    this.getCategories();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختر الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  getCategories()
  {
    this.cateogryApiService.getCategoryList(this.pager).subscribe(
      (response: any) => {
        this.response = response.data;
        this.Cateogy_List = response.data.items;
        this.totalCount = response.totalCount
      }
    )
  }
 
  AddNew() {
    this.router.navigateByUrl("content/admin/insert-category");
  }

  // update(id: number) {

    
  //  this.cateogryApiService.getCategoryById(id).subscribe((res)=>{
  //   this.cateogryApiService.Data.next(res.data);
  //  })
  //  this.router.navigateByUrl("content/admin/insert-category");

  // }
  // update(item: any) {
  //   this.cateogryApiService.category = item;
  //   this.router.navigate(['content/admin/update-category', item.id]);

  // }
  update(id: any) {
    // // this.cateogryApiService.getCategoryById(category.id).subscribe((res)=>{
    // //   this.cateogryApiService.category = res.data;
    // // })
    // alert(categoryId)
    // this.router.navigateByUrl("content/admin/update-category",categoryId);
    this.router.navigateByUrl(`content/admin/update-category/${id}`)

  }
  pageChanged(event: any) {
    this.pageNumber = event.page;// -1 * pageSize;
    this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
    this.getCategories();
  }
  delete(id : number){
    Swal.fire({
      title: 'هل تريد مسح العنصر ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cateogryApiService.deleteCategory(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getCategories();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
        },() => {
          console.log("completed");
        })
      }
    }) 
  }


}
