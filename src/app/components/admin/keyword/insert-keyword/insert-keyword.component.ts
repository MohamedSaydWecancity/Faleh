import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { KeywordApiService } from '../../../../shared/API-Service/Keyword/keyword-api.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GetKeywordById } from 'src/app/shared/Models/Keyword/Keyword';

@Component({
  selector: 'app-insert-keyword',
  templateUrl: './insert-keyword.component.html',
  styleUrls: ['./insert-keyword.component.css']
})
export class InsertKeywordComponent implements OnInit {

  maxDate: Date;
  update: boolean;
  insertForm: FormGroup;
  requestSent: boolean;
  keywordId: number;

  // constructor(private fb: FormBuilder,
  //   private keywordApiService: KeywordApiService,
  //   private router: Router) { this.maxDate = new Date(); }
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private keywordApiService: KeywordApiService,
    private router: Router) {
    this.maxDate = new Date();
    
  }
  
  
  private init (keyword?:GetKeywordById){
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
      this.keywordApiService.keyword = null;
    } else {
      this.update = false;
      this.init();
    }
    console.log(this.insertForm.controls);
  }

  get fc() {
    return this.insertForm.controls;
  }


  insertKeyword() {
    this.requestSent = true;
    this.keywordApiService.createKeyWord(this.insertForm.value).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إدخال الكلمه الدلاليه بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListKeyword");
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
    this.keywordApiService.getKeyWordById(id).subscribe((res) => {
      this.keywordApiService.keyword = res.data;
      if(res.success)
      {
        this.init(res.data);
        this.insertForm.addControl('id', new FormControl(res.data.id, Validators.required));

      }
      
    });
  }

  updateKeyword() {
    this.requestSent = true;
    this.keywordApiService.updateKeyWord(this.insertForm.value).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل الكلمه الدلاليه بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListKeyword");
      },
      () => { this.requestSent = false }
    )
  }

  onSubmit() {
    // if (this.insertForm.status == "VALID") {
    //   if (this.update == true) {
    //     this.updateKeyword();
    //   } else {
    //     this.insertKeyword();
    //   }
    // } else {
    //   this.insertForm.markAllAsTouched();
    // }
    if (this.insertForm.status === "VALID") {
      if (this.update) {
        this.updateKeyword();
      } else {
        this.insertKeyword();
      }
    } else {
      this.insertForm.markAllAsTouched();
    }
  }

}
