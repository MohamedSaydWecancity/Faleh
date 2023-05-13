import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs/internal/Observable';
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import {NewsApiService} from '../../../../shared/API-Service/News/news-api.service';
import {CateogryApiService} from '../../../../shared/API-Service/Cateogry/cateogry-api.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent extends PaginationComponent implements OnInit {

  //#region  Declare Variables
  response: any[];

 // categories$: any[];



  News_List: any[];
  dropdownSettings: IDropdownSettings = {};
  categoryId: number | null = null; // Define categoryId as an optional parameter
  //#endregion

 constructor(private newsApiService: NewsApiService,
  //private cateogryApiService: CateogryApiService,
  private router: Router) { super()}

 ngOnInit(): void {
   this.getNews();
   this.dropdownSettings = {
     singleSelection: true,
     idField: 'id',
     textField: 'name',
     selectAllText: 'اختر الكل',
     unSelectAllText: 'الغاء اختر الكل',
     itemsShowLimit: 3,
     allowSearchFilter: true
   };
   //this.getCategoris();
 }
//  getCategoris()
//  {
//   this.cateogryApiService.getMainForList().subscribe(res => {
//     this.categories$ = res.data;
//   });
//  }
 getNews()
 {
 
   this.newsApiService.getNewsList(this.pager).subscribe(
     (response: any) => {
       this.response = response?.data;
       this.News_List = response?.data?.items || [];
       this.totalCount = response?.totalCount
       
     }
   )
  // const params = {
  //   maxResultCount: this.pager.maxResultCount,
  //   skipCount: this.pager.skipCount,
  //   categoryId: this.categoryId // Pass categoryId as an optional parameter
  // };
  // this.newsApiService.getNewsList(params).subscribe(
  //   (response: any) => {
  //     this.response = response?.data;
  //     this.News_List = response?.data?.items || [];
  //     this.totalCount = response?.totalCount
  //   }
  // )
 }

 AddNew() {
   this.router.navigateByUrl("content/admin/insert-news");
 }

 
 update(id: any) {
 
   this.router.navigateByUrl(`content/admin/update-news/${id}`)

 }
//  onCategorySelect(item: any) {
//   this.categoryId = item.id; // Update categoryId based on user selection
//   this.getNews(); // Reload news list with the new categoryId
// }

// onCategoryDeselect() {
//   this.categoryId = null; // Reset categoryId to null if user deselects the category
//   this.getNews(); // Reload news list without categoryId
// }
 pageChanged(event: any) {
   this.pageNumber = event.page;// -1 * pageSize;
   this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
  // this.getNews();
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
       this.newsApiService.deleteNews(id).subscribe((res) => {
         Swal.fire({
           icon: "success",
           title: "تم المسح بنجاح",
           showConfirmButton: false,
           timer: 1500,
         });
      this.getNews();
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
