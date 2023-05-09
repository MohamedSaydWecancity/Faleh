import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ArticleApiService } from "src/app/shared/API-Service/Article/article-api.service";
import { CateogryApiService } from "src/app/shared/API-Service/Cateogry/cateogry-api.service";
import { KeywordApiService } from "src/app/shared/API-Service/Keyword/keyword-api.service";
@Component({
  selector: 'app-insert-article',
  templateUrl: './insert-article.component.html',
  styleUrls: ['./insert-article.component.css']
})
export class InsertArticleComponent implements OnInit {
  KeywordList: any[];
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
  public videologo: string;
  public imageSrc: string;
  public dropdownSettings: IDropdownSettings = {};
  public dropdownList: any = [];
  public selectedCateroriesItems: any = [];
  public selectedKeywordsItems: any = [];
  selectedCateogries = [];
  selectedKeywords = [];

  constructor(
    private fb: FormBuilder,
    private _articleApiService: ArticleApiService,
    private _catergoryApiService: CateogryApiService,
    private _keywordApiService: KeywordApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.GetData();
    // this.checkEdit();
    //
    let id = this._activatedRoute.snapshot.params['id']
    if (id !=null) {
      this.getById(id); // call getById() before initForm()
      // this.initForm(this.keywordApiService.keyword);
      this.update = true;
      console.log(this.update)
    } else {
      this.update = false;
      this.checkEdit();
    }

  }

  private checkEdit() {
    if (typeof this._activatedRoute.snapshot.params["id"] !== "undefined") {
      let id = this._activatedRoute.snapshot.params["id"];
      if (id) {
        let Article = this.getById(id);
        this.update = true;
        this.initiate(Article);
      } else this.initiate();
    } else this.initiate();
  }

  private initiate(article?: any) {
    this.InsertForm = this.fb.group({
      titleAr: ["", Validators.required],
      title: ["", Validators.required],
      contentAr: ["", Validators.required],
      content: ["", Validators.required],
      articleVideo: [""],
      categoriesIds: [null],
      keywordsIds: [null],
      multCategories: [null],
      multKeywords: [null],
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
      debugger
      this.article = res.data;
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
      this._catergoryApiService.getCategoryAllForList().subscribe((res) => {
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
    this._catergoryApiService.getCategoryAllForList().subscribe((res) => {
      this.CateogryList = res.data;
    });

    this._keywordApiService.getKeyWordAllForList().subscribe((res) => {
      this.KeywordList = res.data;
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
  }

  private insertData() {
    this.submit = false;
    this.loopform();
    this._articleApiService.createArticle(this.logoForm).subscribe(
      (res) => {
        if (res.success) {
          this.submit = true;
          this._router.navigate(["/articles/all"]);
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
        }
      }
    });

    // Only include articleVideo if it is not null
    if (this.articleVideo != null) {
      this.logoForm.append("articleVideo", this.articleVideo);
    }

    this._articleApiService
      .updateArticle(this.logoForm)
      .subscribe(
        (res) => {
          if (res.success) {
            this.submit = true;
            this._router.navigate(["/articles/all"]);
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
    // this.validated = true;
    // if (this.InsertForm.invalid) {
    //   return;
    // }
    // if (!this.update) {
    //   this.insertData();
    // } else {
    //   this.editData();
    // }
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