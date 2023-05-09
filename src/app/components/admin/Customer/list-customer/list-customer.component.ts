import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import{CustomerApiService} from '../../../../shared/API-Service/Customer/customer-api.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent extends PaginationComponent  implements OnInit {

  
   //#region  Declare Variables
   response: any[];

 
 
   Customer_List: any[];
   dropdownSettings: IDropdownSettings = {};
 
   //#endregion
 
  constructor(private customerApiService: CustomerApiService,private router: Router) { super()}

  ngOnInit(): void {
   this.getCustomers();
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
  getCustomers()
  {
    this.customerApiService.getCustomerList(this.pager).subscribe(
      (response: any) => {
        this.response = response.data;
        this.Customer_List = response.data.items;
        this.totalCount = response.totalCount
      }
    )
  }
 
 
  pageChanged(event: any) {
    this.pageNumber = event.page;// -1 * pageSize;
    this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
    this.getCustomers();
  }
 

}
