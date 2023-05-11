import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateCategory, GetCategories, GetCategoryById } from 'src/app/shared/Models/Category/category';
import{CateogryApiService }from '../../../../shared/API-Service/Cateogry/cateogry-api.service'
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.css']
})
export class InsertCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  update: boolean;
  imgURL: any = "";
  file: File = null;
  categories$: any[];
  category: GetCategories;
  categoryFormPic = new FormData();
  requestSent: boolean;

  constructor(private _formBuilder: FormBuilder,
    private categoryService: CateogryApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  get fc() {
    return this.categoryForm.controls;
  }

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.getCategoryById(id);
    else {
      this.update = false;
      this.imgURL = environment.defaultImage;
    }

  }

  initForm(category?: GetCategories) {
    this.categoryForm = this._formBuilder.group({
      title: [category?.title || '', Validators.required],
      titleAr: [category?.titleAr || '', Validators.required],
      categoryImage: [''],
      parentId: [category?.parentId || '', Validators.nullValidator],
      order: [category?.order || '', Validators.required],
    });
  }

  getCategoryById(id: any) {
    this.categoryService.getCategoryById(id).subscribe(async (res: any) => {
      this.category = await res.data;
      this.initForm(this.category);
      this.imgURL = environment.serverFirstHalfOfImageUrl + this.category?.categoryImage;
      this.categoryForm.addControl('id', new FormControl(this.category?.id));
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
     
    this.categoryFormPic = new FormData();
    Object.keys(this.categoryForm.value).forEach((key) => {
      if (typeof this.categoryForm.value[key] != "object")
        this.categoryFormPic.append(key, this.categoryForm.value[key]);
      else if (typeof this.categoryForm.value[key] == "object" && this.categoryForm.value[key] != null)
        Object.keys(this.categoryForm.value[key]).forEach((subkey) => {
          this.categoryFormPic.append(key, this.categoryForm.value[key][subkey].id);
        });
    });
    this.categoryFormPic.append('categoryImage', this.file);
  }

  insertCategory() {
    if (this.categoryForm.status == "VALID" && !this.file)
      return Swal.fire({ icon: "error", title: `برجاء اضافة صورة` });

    this.loopform()
    this.requestSent = true;
    this.categoryService.createCategory(this.categoryFormPic).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إضافة التصنيف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetCategories");
      },
      () => { this.requestSent = false; }
    )
  }


  updateCategory() {
    this.loopform();
    this.requestSent = true;
    this.categoryService.updateCategory(this.categoryFormPic).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات التصنيف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetCategories");
      },
      () => { this.requestSent = false; }
    )
  }

  onSubmit() {
    if (this.categoryForm.status == "VALID") {
      if (this.update == true)
        this.updateCategory();
      else
        this.insertCategory();
    } else
      this.categoryForm.markAllAsTouched();
  }


  }


