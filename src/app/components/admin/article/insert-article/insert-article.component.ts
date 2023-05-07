import { Component, OnInit } from '@angular/core';
import { CateogryApiService } from 'src/app/shared/API-Service/Cateogry/cateogry-api.service';
import { KeywordApiService } from 'src/app/shared/API-Service/Keyword/keyword-api.service';

@Component({
  selector: 'app-insert-article',
  templateUrl: './insert-article.component.html',
  styleUrls: ['./insert-article.component.css']
})
export class InsertArticleComponent implements OnInit {

  
  KeywordList:any[];// GenericResponse<GetKeywordAllForList[]>;
  CateogryList :any[]; //: GenericResponse<GetCategoryAllForList[]>;

  constructor(private keywordApiService: KeywordApiService, private cateogryApiService :CateogryApiService, ) { }

  ngOnInit(): void {
    this.getCateories();
    this.getKeywords();
  }
  getKeywords() {

    this.keywordApiService.getKeyWordAllForList().subscribe(
      (response: any) => {

        this.KeywordList = response.data;
      }
    )
  }
  getCateories() {

    this.cateogryApiService.getCategoryAllForList().subscribe(
      (response: any) => {

        this.CateogryList = response.data;
      }
    )
  }


}
