import { Component, OnInit } from '@angular/core';
import{KeywordApiService} from '../../../../shared/API-Service/Keyword/keyword-api.service'
import{CateogryApiService} from '../../../../shared/API-Service/Cateogry/cateogry-api.service'
import{ArticleApiService} from '../../../../shared/API-Service/Article/article-api.service'

import { GenericResponse } from 'src/app/shared/Models/GenericResponse/GenericResponse';
import { GetKeywordAllForList } from 'src/app/shared/Models/Keyword/Keyword';
import { GetCategoryAllForList } from 'src/app/shared/Models/Category/category';
import Swal from 'sweetalert2';
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent extends PaginationComponent implements OnInit {
  //#region  Declare Variables
  response: any[];

  KeywordList:any[];// GenericResponse<GetKeywordAllForList[]>;
  CateogryList :any[]; //: GenericResponse<GetCategoryAllForList[]>;

  Article_List: any[];
  dropdownSettings: IDropdownSettings = {};

  //#endregion

  constructor(private articleApiService: ArticleApiService,private router: Router) {super(); }

  ngOnInit(): void {
    this.KeywordList = [];
    this.CateogryList=[];
   // this.getKeywords();
    //this.getCateories();
    this.getArticles();
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
  getArticles()
  {
    this.articleApiService.getArticleList(this.pager).subscribe(
      (response: any) => {
        this.response = response.data;
        this.Article_List = response.data.items;
        this.totalCount = response.totalCount
      }
    )
  }
 
  AddNew() {
    this.router.navigateByUrl("content/admin/insert-article");
  }

  update(id: number) {

    
   this.articleApiService.getArticleById(id).subscribe((res)=>{
    this.articleApiService.Data.next(res.data);
   })
   this.router.navigateByUrl("content/admin/insert-article");

  }
  pageChanged(event: any) {
    this.pageNumber = event.page;// -1 * pageSize;
    this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
    this.getArticles();
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
        this.articleApiService.deleteArticle(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getArticles();
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
