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
import { ListUserComponent } from "./User/list-user/list-user.component";
import { InsertUserComponent } from "./User/insert-user/insert-user.component";
import { ChangePasswordComponent } from "./User/change-password/change-password.component";





const routes: Routes = [
    {
        path: "",
        children: [
            

            {
                path: "ViewProduct",
                component: ViewProductComponent,
            },
           {
            path :"content/admin/ListArticle",
            component:ListArticleComponent
           },
           {
            path: 'content/admin/update-article/:id',
            component: InsertArticleComponent
          },
           {
            path: "content/admin/insert-article",
            component: InsertArticleComponent,
        },
        {
            path :"content/admin/ListCategory",
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
            path :"content/admin/ListKeyword",
            component:ListKeywordComponent
           },
        
         
          {
            path :"content/admin/ListCusotmers",
            component:ListCustomerComponent
           },
           {
            path :"content/admin/ListQuestion",
            component:ListQuestionComponent
           }
           ,
        {
            path :"content/admin/ListNews",
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
           
           {
            path :"content/admin/ListVideos",
            component:ListVideoComponent
           },
           {
            path: 'content/admin/update-video/:id',
            component: InsertVideoComponent
          },
          {
            path: 'content/admin/insert-video',
            component: InsertVideoComponent
          },
          {
            path:'content/admin/ListUsers',
            component:ListUserComponent
          }
          ,
          {
            path: 'content/admin/update-user/:id',
            component: InsertUserComponent
          },
          {
            path: 'content/admin/insert-user',
            component: InsertUserComponent
          },
          {
            path:'content/admin/ChangePassword',
            component:ChangePasswordComponent

          }
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
