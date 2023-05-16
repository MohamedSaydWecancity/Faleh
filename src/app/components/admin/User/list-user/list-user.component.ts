import { Component, OnInit } from '@angular/core';
import {UserApiService}from '../../../../shared/API-Service/User/user-api.service' 
import { PaginationComponent } from 'src/app/shared/Models/PaginationModel/PagintationModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent extends PaginationComponent  implements OnInit {
  response: any[];
  User_List: any[];
  constructor(private userApiService:UserApiService,private router: Router) { super()}

  ngOnInit(): void {
    this.getUsers()

  }
  getUsers()
  {
    this.userApiService.Getusers(this.pager).subscribe(
      (response: any) => {
        this.response = response.data;
        this.User_List = response.data.items;
        this.totalCount = response.totalCount
      }
    )
  }
  AddNew() {
    this.router.navigateByUrl("content/admin/insert-user");
  }

  
  update(id: any) {
  
    this.router.navigateByUrl(`content/admin/update-user/${id}`)

  }
  pageChanged(event: any) {
    this.pageNumber = event.page;// -1 * pageSize;
    this.pager.skipCount = (this.pageNumber - 1) * this.pager.maxResultCount;
    this.getUsers();
  }
 


}
