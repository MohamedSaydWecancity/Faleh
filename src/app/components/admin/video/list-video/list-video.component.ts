import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { CateogryApiService } from 'src/app/shared/API-Service/Cateogry/cateogry-api.service';
import { VideoApiService } from 'src/app/shared/API-Service/Video/video-api.service';

import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css']
})
export class ListVideoComponent extends PaginationComponent implements OnInit {

  //#region  Declare Variables
  response: any[];



  video_List: any[];
  dropdownSettings: IDropdownSettings = {};

  //#endregion

 constructor(private cateogryApiService: CateogryApiService,private videoApiService: VideoApiService,private router: Router) { super()}

 ngOnInit(): void {
   this.getVideos();
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
 getVideos()
 {
 
   this.videoApiService.getVideoList(this.pager).subscribe(
     (response: any) => {
       this.response = response?.data;
       this.video_List = response?.data?.items || [];
       this.totalCount = response?.totalCount
       
     }
   )
 }

 AddNew() {
   this.router.navigateByUrl("content/admin/insert-video");
 }

 
 update(id: any) {
 
   this.router.navigateByUrl(`content/admin/update-video/${id}`)

 }
 pageChanged(event: any) {
   this.pageNumber = event.page;// -1 * pageSize;
   this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
   this.getVideos();
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
       this.videoApiService.deleteVideo(id).subscribe((res) => {
         Swal.fire({
           icon: "success",
           title: "تم المسح بنجاح",
           showConfirmButton: false,
           timer: 1500,
         });
      this.getVideos();
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
