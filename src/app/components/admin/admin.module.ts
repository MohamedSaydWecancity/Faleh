
 
 

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
 
import { RouterModule } from '@angular/router';
 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintElementModule } from 'ngx-print-element';
 
import { NgApexchartsModule } from 'ng-apexcharts';
 

 

// **  
import {NgxPaginationModule} from 'ngx-pagination';

// cookie 
import { CookieService } from 'ngx-cookie-service'


import { DxReportViewerModule } from 'devexpress-reporting-angular';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { InsertArticleComponent } from './article/insert-article/insert-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { InsertCategoryComponent } from './category/insert-category/insert-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListKeywordComponent } from './keyword/list-keyword/list-keyword.component';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { ListQuestionComponent } from './Question/list-question/list-question.component';




 @NgModule({
  declarations: [
    ViewProductComponent,
    InsertArticleComponent,
    ListArticleComponent,
    InsertCategoryComponent,
    ListCategoryComponent,
    ListKeywordComponent,
    ListCustomerComponent,
    ListQuestionComponent,
    
    
  ],
  imports: [
    DxReportViewerModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    NgxPaginationModule,
    RouterModule,
    NgApexchartsModule,
    NgxPrintElementModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
   CookieService
  ],
  
  exports:[ ]
})
export class AdminModule { }
