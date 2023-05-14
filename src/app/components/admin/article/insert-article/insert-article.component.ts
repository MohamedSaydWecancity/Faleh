import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ArticleApiService } from "src/app/shared/API-Service/Article/article-api.service";
import { CateogryApiService } from "src/app/shared/API-Service/Cateogry/cateogry-api.service";
import { KeywordApiService } from "src/app/shared/API-Service/Keyword/keyword-api.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-insert-article',
  templateUrl: './insert-article.component.html',
  styleUrls: ['./insert-article.component.css']
})
export class InsertArticleComponent implements OnInit {
  //KeywordList: any[];
  CateogryList: any[];
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
  public imageSrc: string;
  public dropdownSettings: IDropdownSettings = {};
  public dropdownList: any = [];
  public selectedCateroriesItems: any = [];
  public selectedKeywordsItems: any = [];
  selectedCateogries = [];
  selectedKeywords = [];
  id: any;

  constructor(
    private fb: FormBuilder,
    private _articleApiService: ArticleApiService,
    private _catergoryApiService: CateogryApiService,
    private _keywordApiService: KeywordApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.initiate()
  }

  ngOnInit(): void {
    this.GetData();
    

    let id = this._activatedRoute.snapshot.params['id']
    console.log(id);
    debugger
    if (id) {
    this.id=id

      this._articleApiService.getArticleById(Number(id)).subscribe((res) => {
        this.article = res.data;
        this.initiate(this.article); // Pass the article object to initiate() method
        this.update = true;
        console.log(this.update)
      });
     
    }
     else {
      this.update = false;
     // this.checkEdit();
     this.initiate();
    }

  }

 

  private initiate(article?: any) {
    console.log(article)
    this.InsertForm = this.fb.group({
      titleAr: [article?.titleAr||"", Validators.required],
      title: [article?.title||"", Validators.required],
      contentAr: [article?.contentAr||"", Validators.required],
      content: [article?.content||"", Validators.required],
      articleVideo: [article?.video||""],
      // articleImage: [article.titleAr||""],
      // categoriesIds: [article.articleCategories||null],
      multCategories: [article?.articleCategories||null],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "title",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
    // imgFile
    public  getLogoUrl(event: any) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.articleImage = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.articleLogoImage = reader.result as string;
          this.logoForm?.append("articleImage", this.articleImage);
        };
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

  // private getById(id): any {
  //   this._articleApiService.getArticleById(id).subscribe((res) => {
  //     this.article = res.data;
  //     this.initiate(res.data);
  //   });
  // }
  private getById(id): any {
    this._articleApiService.getArticleById(id).subscribe((res) => {
      
      this.article = res.data;
console.log(this.article)
      this.initiate(this.article); // Pass the article object to initiate() method
    });
  }
  getSelectedCateogries() {
    return this.selectedCateogries;
  }

  getSelectedKeywords() {
    return this.selectedKeywords;
  }

  ChangeCaterogy() {
    this.SelectedCategoris();
  }

  SelectedCategoris() {
    this.selectedCateroriesItems = [];
    if (this.fc.categoriesIds.value !== null) {
      this._catergoryApiService.getMainForList().subscribe((res) => {
        if (res.data) this.selectedCateroriesItems = res.data;
      });
    } else this.selectedCateroriesItems = [];
  }

  changeKeyword() {
    this.SelectedKeywords();
  }

  SelectedKeywords() {
    this.selectedCateroriesItems = [];
    if (this.fc.keywordsIds.value !== null) {
      this._keywordApiService.getKeyWordAllForList().subscribe((res) => {
        if (res.data) this.selectedKeywordsItems = res.data;
      });
    } else this.selectedKeywordsItems = [];
  }

  private GetData() {
    this._catergoryApiService.getMainForList().subscribe((res) => {
      this.CateogryList = res.data;
    });

   
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

    if (this.articleVideo != null && !this.update) {
      this.logoForm.append("articleVideo", this.articleVideo);
    }
    if (this.articleImage != null && !this.update) {
      this.logoForm.append("articleImage", this.articleImage);
    }
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
    this.logoForm = new FormData();
    Object.keys(this.InsertForm.value).forEach((key) => {
      if (this.InsertForm.value[key] == null) {
      } else {
        if (typeof this.InsertForm.value[key] !== "object")
          this.logoForm.append(key, this.InsertForm.value[key]);
        else {
          if (key === "multCategories") {
            for (let i = 0; i < this.selectedCateogries.length; i++) {
              this.logoForm.append(
                "categoriesIds",
                this.selectedCateogries[i].id
              );
            }
          } else if (key === "multKeywords") {
            for (let i = 0; i < this.selectedKeywords.length; i++) {
              this.logoForm.append(
                "keywordsIds",
                this.selectedKeywords[i].id
              );
            }
          }
          this.logoForm.append("id",this.id)
        }
      }
    });

    // Only include article Video if it is not null
    if (this.articleVideo != null) {
      this.logoForm.append("articleVideo", this.articleVideo);
    }
    
    if (this.articleImage != null) {
      this.logoForm.append("articleImage", this.articleImage);
    }
    
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
   debugger
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
}