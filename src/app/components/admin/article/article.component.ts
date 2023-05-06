import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ArticleApiService} from '../../../shared/API-Service/Article/article-api.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private _ArtyicleService:ArticleApiService, private _Router:Router) { }

  ngOnInit(): void {
  }

}
