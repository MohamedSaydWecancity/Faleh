import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// ChangePassword Component



import { ViewProductComponent } from './product/view-product/view-product.component';
import { ListArticleComponent } from "./article/list-article/list-article.component";
import { InsertArticleComponent } from "./article/insert-article/insert-article.component";
import { ListCategoryComponent } from "./category/list-category/list-category.component";
import { InsertCategoryComponent } from "./category/insert-category/insert-category.component";





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
            path: "insert-article",
            component: InsertArticleComponent,
        },
        {
            path :"ListCategory",
            component:ListCategoryComponent
           },
           {
            path: "insert-category",
            component: InsertCategoryComponent,
        },
        {
            path: "update-category",
            component: InsertCategoryComponent,
        },
            
           
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
