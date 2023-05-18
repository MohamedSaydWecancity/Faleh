  import { Component, OnInit } from "@angular/core";
  import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  import { IDropdownSettings } from "ng-multiselect-dropdown";
  import { Observable } from "rxjs/internal/Observable";
  import { ArticleApiService } from "src/app/shared/API-Service/Article/article-api.service";
  import { CateogryApiService } from "src/app/shared/API-Service/Cateogry/cateogry-api.service";
  import { KeywordApiService } from "src/app/shared/API-Service/Keyword/keyword-api.service";
  import { GetCategoryAllForList } from "src/app/shared/Models/Category/category";
  import { GenericResponse } from "src/app/shared/Models/GenericResponse/GenericResponse";
  import { of } from 'rxjs';
  import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
  @Component({
    selector: 'app-insert-article',
    templateUrl: './insert-article.component.html',
    styleUrls: ['./insert-article.component.css']
  })
  export class InsertArticleComponent implements OnInit {
    //KeywordList: any[];
    CateogryList: any[];
    dropdownList$: GetCategoryAllForList[];
    //dropdownList$: Observable<GetCategoryAllForList[]>;

    public article: any;
    public keywords: any[];
    public categories: any[];
    public truckManufacturers: any[];
    public submit: boolean = true;
    public canUpdateTruckType: boolean = true;
    private logoForm: FormData;
    public InsertForm: FormGroup;
    public update: boolean = false;
    public validated: boolean;
    private articleVideo: File;
    private articleImage: File;
    private articleLogoImage:string;

    public videologo: string;
    public imageSrc: string = null;
    public dropdownSettings: IDropdownSettings = {};
    public dropdownList: any = [];
    selectedCateogries = [];
    id: any;

    constructor(
      private fb: FormBuilder,
      private _articleApiService: ArticleApiService,
      private _catergoryApiService: CateogryApiService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute
    ) {
      this.initiate()
    }

    // ngOnInit(): void {
    //   this.GetCategoies();
      

    //   let id = this._activatedRoute.snapshot.params['id']
    //   console.log(id);
    //   debugger
    //   if (id) {
    //   this.id=id

    //     this._articleApiService.getArticleById(Number(id)).subscribe((res) => {
    //       this.article = res.data;
    //       this.imageSrc = `${environment.url}/${this.article.image}`;  // Construct full URL
    //       this.initiate(this.article); // Pass the article object to initiate() method
    //       this.update = true;
    //       console.log(this.update)
    //       this.InsertForm.addControl('id', new FormControl(this.article.id));

    //     });
      
    //   }
    //   else {
    //     this.update = false;
    //   this.initiate();
    //   }

    // }
    ngOnInit(): void {
      this.GetCategoies();
          
      let id = this._activatedRoute.snapshot.params['id']
      if (id) {
        this.id=id
    
        this._articleApiService.getArticleById(Number(id)).subscribe((res) => {
          this.article = res.data;
          this.imageSrc = `${environment.url}/${this.article.image}`;  
          this.initiate(this.article); 
          this.update = true;
          this.InsertForm.addControl('id', new FormControl(this.article.id));
    
          // Set dropdownList to articleCategories
          this.dropdownList = this.article.articleCategories; 
        });
      }
      else {
        this.update = false;
        this.initiate();
      }
    }

  

    private initiate(article?: any) {
      this.InsertForm = this.fb.group({
        titleAr: [article?.titleAr||"", Validators.required],
        title: [article?.title||"", Validators.required],
        contentAr: [article?.contentAr||"", Validators.required],
        content: [article?.content||"", Validators.required],
        articleVideo: [article?.video||""],
        image$: [article?.articleImage||""],

        categoriesIds: [article?.categoriesIds||null],
        
      });
     
    // Initialize articleVideo and articleImage properties
    this.articleVideo = article?.articleVideo || null;
    this.articleImage = article?.articleImage || null;



      this.dropdownSettings = {
        singleSelection: false,
        idField: "id",
        textField: "title",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
      this.InsertForm = this.fb.group({
        titleAr: [article?.titleAr || "", Validators.required],
        title: [article?.title || "", Validators.required],
        contentAr: [article?.contentAr || "", Validators.required],
        content: [article?.content || "", Validators.required],
        articleVideo: [article?.video || ""],
        image$: [article?.articleImage||""],
        categoriesIds: [this.selectedCateogries || []],
      });
       // Initialize selectedCateogries property
  this.selectedCateogries = article?.articleCategories?.map(category => category.id) || [];
    }
     
     
      public getLogoUrl(event: any) {
        const file = event.target.files[0];
        this.InsertForm.patchValue({
          image$: file
        });
        this.articleImage = file;
      
        // Show preview image
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(file);
      
        // Append image to logoForm
        if (!this.update) {
          this.logoForm.append("articleImage", this.articleImage);
        }
      }
      
    public getVideoUrl(event: any) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.articleVideo = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.videologo = reader.result as string;
          if (!this.update) {
            this.logoForm?.append("articleVideo", this.articleVideo);
          }
        };
      }
    }

  
  



    private GetCategoies() {
      this._catergoryApiService.getMainForList().subscribe((res) => {
        this.dropdownList$ = res.data;
          // Set dropdownList to articleCategories
  this.dropdownList = this.article.articleCategories;
      });
    }

    private insertData() {
      this.submit = false;
      this.loopform();
      this._articleApiService.createArticle(this.logoForm).subscribe(
        (res) => {
          if (res.success) {
            this.submit = true;
            this.InsertForm.reset();
            Swal.fire({
              icon: "success",
              title: "تم اضافه المقال بنجاح",
              showConfirmButton: false,
              timer: 1500,
            });
            this._router.navigate(["content/admin/ListArticle"]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

    private editData() {
      this.submit = false;
  
      this.loopform();

      this._articleApiService
        .updateArticle(this.logoForm)
        .subscribe(
          (res) => {
            if (res.success) {
              this.submit = true;
              this.InsertForm.reset();
              Swal.fire({
                icon: "success",
                title: "تم تعديل المقال بنجاح",
                showConfirmButton: false,
                timer: 1500,
              });
              this._router.navigate(["content/admin/ListArticle"]);
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }


    public get fc() {
      return this.InsertForm.controls;
    }

    onSubmit() {
    
      if (!this.InsertForm.invalid ) {
        if (this.update) {
          this.editData();
          
        } else {
          this.insertData();
        }
      } else {
        this.InsertForm.markAllAsTouched();
      }
    }


    private loopform() {
      this.logoForm = new FormData();
      Object.keys(this.InsertForm.value).forEach((key) => {
        if (this.InsertForm.value[key] == null) {
        } else {
          if (typeof this.InsertForm.value[key] !== "object")
            this.logoForm.append(key, this.InsertForm.value[key]);
          else
            Object.keys(this.InsertForm.value[key]).forEach((subkey) => {
              this.logoForm.append(key, this.InsertForm.value[key][subkey]);
            });
        }
      });

      if (this.articleVideo != null ) {
        this.logoForm.append("articleVideo", this.articleVideo);
      }
      // if (this.articleImage != null) {
      //   this.logoForm.append("articleImage", this.articleImage);
      // }
      if (this.InsertForm.value.image$ != null) {
        this.logoForm.append("articleImage", this.InsertForm.value.image$);
      }
    }
  }