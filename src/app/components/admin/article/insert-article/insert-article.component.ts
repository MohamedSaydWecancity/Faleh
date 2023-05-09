import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleApiService } from 'src/app/shared/API-Service/Article/article-api.service';
import { CateogryApiService } from 'src/app/shared/API-Service/Cateogry/cateogry-api.service';
import { KeywordApiService } from 'src/app/shared/API-Service/Keyword/keyword-api.service';
import { GetCategoryAllForList } from 'src/app/shared/Models/Category/category';
import { GetKeywordAllForList } from 'src/app/shared/Models/Keyword/Keyword';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-insert-article',
  templateUrl: './insert-article.component.html',
  styleUrls: ['./insert-article.component.css']
})
export class InsertArticleComponent implements OnInit,OnDestroy {

  
  KeywordList:any[];// GenericResponse<GetKeywordAllForList[]>;
  CateogryList :any[]; //: GenericResponse<GetCategoryAllForList[]>;

  // constructor(private keywordApiService: KeywordApiService, private cateogryApiService :CateogryApiService, ) { }
  // class  modal
  // list array 
  cateories: GetCategoryAllForList[];
  keywords: GetKeywordAllForList[];
  logoForm: FormData;
  insertForm: FormGroup;
  update: boolean = false;
  validated: boolean;
  changetype: boolean = true;
  submit: boolean = true;
  // imge from type file 
  logo: File;
  licenseDocument: File;
  downloadDocument: any
  // src 
  imageLogo: string;
  imageDocument: string;
  // check  type company 
  Role: number;
  routes: any;
  companyId: number;
  nameLicenseDocument: string;
  statusId: any
  statusName: string
  constructor(
    private fb: FormBuilder,
    private _articleApiService: ArticleApiService,
    private _catergoryApiService: CateogryApiService,
    private _keywordApiService: KeywordApiService,

    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _NavService: NavService

  ) {
   
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getCateories();
    this.getKeywords();
  }
  getKeywords() {

    this._keywordApiService.getKeyWordAllForList().subscribe(
      (response: any) => {

        this.KeywordList = response.data;
      }
    )
  }
  getCateories() {

    this._catergoryApiService.getCategoryAllForList().subscribe(
      (response: any) => {

        this.CateogryList = response.data;
      }
    )
  }


}
