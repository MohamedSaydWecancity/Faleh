import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {KeywordApiService} from '../../../../shared/API-Service/Keyword/keyword-api.service'
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
    private keywordApiService: KeywordApiService,
    private router: Router) { this.maxDate = new Date(); }

  ngOnInit(): void {

    console.log(this.insertForm.controls);
    if (this.keywordApiService.keyword) {
      this.initForm(this.keywordApiService.keyword)
      this.update = true;
      this.keywordApiService.keyword = null;
    } else {
      this.update = false;
      this.initForm();
    }
  }

  get fc() {
    return this.insertForm.controls;
  }

  initForm(keyword?: any) {
    this.insertForm = this.fb.group({
      id: [keyword?.id],
      title: [keyword?.title || '', Validators.required],
      titleAr: [keyword?.titleAr || '', Validators.required],
    });
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
      () => {this.requestSent = false}
    )
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
      () => {this.requestSent = false}
    )
  }

  onSubmit() {
    if (this.insertForm.status == "VALID") {
      if (this.update == true) {
        this.updateKeyword();
      } else {
        this.insertKeyword();
      }
    } else {
      this.insertForm.markAllAsTouched();
    }
  }

}
