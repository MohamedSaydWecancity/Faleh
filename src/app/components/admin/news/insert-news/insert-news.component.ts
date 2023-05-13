import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApiService } from 'src/app/shared/API-Service/News/news-api.service';
import {CateogryApiService} from 'src/app/shared/API-Service/Cateogry/cateogry-api.service'
import { GetNews } from 'src/app/shared/Models/News/News';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-news',
  templateUrl: './insert-news.component.html',
  styleUrls: ['./insert-news.component.css']
})
export class InsertNewsComponent implements OnInit {

  NewsForm: FormGroup;
  update: boolean;
  imgURL: any = "";
  file: File = null;
  categories$: any[];
  news: GetNews;
  NewsFormPic = new FormData();
  requestSent: boolean;

  constructor(private _formBuilder: FormBuilder,
    private newsApiService: NewsApiService,
    private categoryService: CateogryApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  get fc() {
    return this.NewsForm.controls;
  }

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.getNewsById(id);
    else {
      this.update = false;
      this.imgURL = environment.defaultImage;
    }

  }

  initForm(news?: GetNews) {
    this.NewsForm = this._formBuilder.group({
      title: [news?.title || '', Validators.required],
      titleAr: [news?.titleAr || '', Validators.required],
      content: [news?.content || '', Validators.required],
      contentAr: [news?.contentAr || '', Validators.required],

      categoryImage: [''],
      date: [news?.date || '', Validators.required],
    });
  }

  getNewsById(id: any) {
    this.newsApiService.getNewsById(id).subscribe(async (res: any) => {
      this.news = await res.data;
      this.initForm(this.news);
      this.imgURL = environment.serverFirstHalfOfImageUrl + this.news?.image;
      this.NewsForm.addControl('id', new FormControl(this.news?.id));
      this.update = true;
    });
  }

  preview(files: any) {
     
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    this.file = files[0];
    if (mimeType.match(/image\/*/) == null)
      return Swal.fire({ icon: "error", title: `نوع صورة غير مقبول` });
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  getCategories() {
    this.categoryService.getMainForList().subscribe(res => {
      this.categories$ = res.data;
    });
  }

  loopform() {
     
    this.NewsFormPic = new FormData();
    Object.keys(this.NewsForm.value).forEach((key) => {
      if (typeof this.NewsForm.value[key] != "object")
        this.NewsFormPic.append(key, this.NewsForm.value[key]);
      else if (typeof this.NewsForm.value[key] == "object" && this.NewsForm.value[key] != null)
        Object.keys(this.NewsForm.value[key]).forEach((subkey) => {
          this.NewsFormPic.append(key, this.NewsForm.value[key][subkey].id);
        });
    });
    this.NewsFormPic.append('NewsImage', this.file);
  }

  insertNews() {
    if (this.NewsForm.status == "VALID" && !this.file)
      return Swal.fire({ icon: "error", title: `برجاء اضافة صورة` });

    this.loopform()
    this.requestSent = true;
    this.newsApiService.createNews(this.NewsFormPic).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إضافة الخبر بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListNews");
      },
      () => { this.requestSent = false; }
    )
  }


  updateNews() {
    this.loopform();
    this.requestSent = true;
    this.newsApiService.updateNews(this.NewsFormPic).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات التصنيف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListNews");
      },
      () => { this.requestSent = false; }
    )
  }

  onSubmit() {
    if (this.NewsForm.status == "VALID") {
      if (this.update == true)
        this.updateNews();
      else
        this.insertNews();
    } else
      this.NewsForm.markAllAsTouched();
  }
}
