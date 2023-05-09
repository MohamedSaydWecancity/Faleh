import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// ChangePassword Component



import { ViewProductComponent } from './product/view-product/view-product.component';
import { ListArticleComponent } from "./article/list-article/list-article.component";
import { InsertArticleComponent } from "./article/insert-article/insert-article.component";
import { ListCategoryComponent } from "./category/list-category/list-category.component";
import { InsertCategoryComponent } from "./category/insert-category/insert-category.component";
import { ListKeywordComponent } from "./keyword/list-keyword/list-keyword.component";
import { InsertKeywordComponent } from "./keyword/insert-keyword/insert-keyword.component";
import { ListCustomerComponent } from "./Customer/list-customer/list-customer.component";





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
            path: 'content/admin/update-keyword/:id',
            component: InsertKeywordComponent
          },
          {
            path: 'content/admin/insert-keyword',
            component: InsertKeywordComponent
          },
          {
            path :"ListCusotmers",
            component:ListCustomerComponent
           },
           
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
