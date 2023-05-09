import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { KeywordApiService } from 'src/app/shared/API-Service/Keyword/keyword-api.service';
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-keyword',
  templateUrl: './list-keyword.component.html',
  styleUrls: ['./list-keyword.component.css']
})
export class ListKeywordComponent  extends PaginationComponent  implements OnInit {
 //#region  Declare Variables
 response: any[];

 KeywordList:any[];// GenericResponse<GetKeywordAllForList[]>;

 dropdownSettings: IDropdownSettings = {};

 //#endregion
  constructor(private keywordApiService: KeywordApiService,private router: Router) {super(); }

  ngOnInit(): void {
    this.getKeyword();
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
  getKeyword()
  {
    this.keywordApiService.getKeyWordList(this.pager).subscribe(
      (response: any) => {
        this.response = response.data;
        this.KeywordList = response.data.items;
        this.totalCount = response.totalCount
      }
    )
  }
 
  AddNew() {
    this.router.navigateByUrl("content/admin/insert-keyword");
  }

  update(id: any) {

    
  //  this.keywordApiService.getArticleById(id).subscribe((res)=>{
  //   this.articleApiService.Data.next(res.data);
  //  })
  // this.keywordApiService.keyword=item.id;
   this.router.navigateByUrl(`content/admin/update-keyword/${id}`)//("content/admin/update-keyword",item.id);

  }
  pageChanged(event: any) {
    this.pageNumber = event.page;// -1 * pageSize;
    this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
    this.getKeyword();
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
        this.keywordApiService.deleteKeyword(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getKeyword();
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
