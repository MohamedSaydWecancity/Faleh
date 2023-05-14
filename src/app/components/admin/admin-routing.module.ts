import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// ChangePassword Component



import { ViewProductComponent } from './product/view-product/view-product.component';
import { ListArticleComponent } from "./article/list-article/list-article.component";
import { InsertArticleComponent } from "./article/insert-article/insert-article.component";
import { ListCategoryComponent } from "./category/list-category/list-category.component";
import { InsertCategoryComponent } from "./category/insert-category/insert-category.component";
import { ListKeywordComponent } from "./keyword/list-keyword/list-keyword.component";
import { ListCustomerComponent } from "./Customer/list-customer/list-customer.component";
import { ListQuestionComponent } from "./Question/list-question/list-question.component";
import { ListNewsComponent } from "./news/list-news/list-news.component";
import { InsertNewsComponent } from "./news/insert-news/insert-news.component";
import { ListVideoComponent } from "./video/list-video/list-video.component";
import { InsertVideoComponent } from "./video/insert-video/insert-video.component";





const routes: Routes = [
    {
        path: "",
        children: [
            

            {
                path: "ViewProduct",
                component: ViewProductComponent,
            },
           {
            path :"ListArticle",
            component:ListArticleComponent
           },
           {
            path: 'content/admin/update-article/:id',
            component: InsertArticleComponent
          },
           {
            path: "insert-article",
            component: InsertArticleComponent,
        },
        {
            path :"ListCategory",
            component:ListCategoryComponent
           },
           {
            path: 'content/admin/update-category/:id',
            component: InsertCategoryComponent
          },
          {
            path: 'content/admin/insert-category',
            component: InsertCategoryComponent
          }  
          ,
        {
            path :"ListKeyword",
            component:ListKeywordComponent
           },
        
         
          {
            path :"ListCusotmers",
            component:ListCustomerComponent
           },
           {
            path :"ListQuestion",
            component:ListQuestionComponent
           }
           ,
        {
            path :"ListNews",
            component:ListNewsComponent
           },
           {
            path: 'content/admin/update-news/:id',
            component: InsertNewsComponent
          },
          {
            path: 'content/admin/insert-news',
            component: InsertNewsComponent
          } ,
           //ListNewsComponent
           {
            path :"ListVideos",
            component:ListVideoComponent
           },
           {
            path: 'content/admin/update-video/:id',
            component: InsertVideoComponent
          },
          {
            path: 'content/admin/insert-video',
            component: InsertVideoComponent
          }  
          ,
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
