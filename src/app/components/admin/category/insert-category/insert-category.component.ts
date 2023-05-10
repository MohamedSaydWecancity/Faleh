import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateCategory, GetCategoryById } from 'src/app/shared/Models/Category/category';
import{CateogryApiService }from '../../../../shared/API-Service/Cateogry/cateogry-api.service'
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.css']
})
export class InsertCategoryComponent implements OnInit {



maxDate: Date;
  update: boolean;
  insertForm: FormGroup;
  requestSent: boolean;
  keywordId: number;

 
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private  cateogryApiService :CateogryApiService,
    private router: Router) {
    this.maxDate = new Date();
    
  }
  
  
  private init (keyword?:GetCategoryById){
    this.insertForm = this.fb.group({
      // id: [||''],
      title: [keyword?.title||'', Validators.required],
      titleAr: [keyword?.titleAr||'', Validators.required],
    });
  }


  ngOnInit(): void {

   
    let id = this.route.snapshot.params['id']
    if (id !=null) {
      this.getById(id); // call getById() before initForm()
      // this.initForm(this.keywordApiService.keyword);
      this.update = true;
      this.cateogryApiService.category = null;
    } else {
      this.update = false;
      this.init();
    }
    console.log(this.insertForm.controls);
  }

  get fc() {
    return this.insertForm.controls;
  }


  insertCategory() {
    this.requestSent = true;
    this.cateogryApiService.createCategory(this.insertForm.value).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إدخال التصنيف  بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListCategory");
      },
      () => { this.requestSent = false }
    )
  }
  //   getById(id:number)
  // {
  //      this.keywordApiService.getKeyWordById(id).subscribe((res)=>{
  //       this.keywordApiService.keyword = res.data;
  //     })
  // }
  getById(id: number) {
    this.cateogryApiService.getCategoryById(id).subscribe((res) => {
      this.cateogryApiService.category = res.data;
      if(res.success)
      {
        this.init(res.data);
        this.insertForm.addControl('id', new FormControl(res.data.id, Validators.required));

      }
      
    });
  }

  updateCategory() {
    this.requestSent = true;
    this.cateogryApiService.updateCategory(this.insertForm.value).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل  التصنيف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListCategory");
      },
      () => { this.requestSent = false }
    )
  }

  onSubmit() {

    if (this.insertForm.status === "VALID") {
      if (this.update) {
        this.updateCategory();
      } else {
        this.insertCategory();
      }
    } else {
      this.insertForm.markAllAsTouched();
    }
  }
  }


