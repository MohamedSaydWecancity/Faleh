import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CateogryApiService } from 'src/app/shared/API-Service/Cateogry/cateogry-api.service';
import{VideoApiService} from '../../../../shared/API-Service/Video/video-api.service'
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GetVideo } from 'src/app/shared/Models/Video/Video';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GetCategoryAllForList } from 'src/app/shared/Models/Category/category';

@Component({
  selector: 'app-insert-video',
  templateUrl: './insert-video.component.html',
  styleUrls: ['./insert-video.component.css']
})
export class InsertVideoComponent implements OnInit {

  public VideoObject:any;
  
  private VideoForm= new FormData();
  public InsertForm: FormGroup;
 
  private video: File;
  public Video :any;
  requestSent: boolean;
  selectedCateogries = [];
  imgURL: any = "";
  dropdownList$: GetCategoryAllForList[];

  video$: GetVideo;
  public videologo: string;
  public submit: boolean = true;
  public dropdownSettings: IDropdownSettings = {};
  public dropdownList: any = [];

  
  public selectedCateroriesItems: any = [];
  

  id: any;
  public update: boolean = false;
  public validated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private videoApiService :VideoApiService,
    private categoryApiService: CateogryApiService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.initForm()

    }

  get fc() {
    return this.InsertForm.controls;
  }

  ngOnInit(): void {
    this.getCategories();

    
    let id = this.route.snapshot.params['id']
   
    if (id) {
    this.id=id
      this.getVideoById(id)
    
    }
     else {
      this.update = false;
     this.initForm();
    }


  }

  initForm(video?: any) {
    this.selectedCateogries = video?.videoCategories?.map(category => category.id) || [];
    this.InsertForm = this._formBuilder.group({
      Title: [video?.title || '', Validators.required],
      TitleAr: [video?.titleAr || '', Validators.required],
      Video$: [video?.video||""],
      categoriesIds: [this.selectedCateogries || []],
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
      this.video = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.videologo = reader.result as string;
        if (!this.update) {
          this.VideoForm?.append("video", this.video);
        }
      };
    }
  }
  getVideoById(id: any) {
    this.videoApiService.getVideoById(id).subscribe(async (res: any) => {
      this.video$ = await res.data;
      this.videologo="https://falehapi.wecancity.com/"+ this.video$.videoPath;
      console.log(id);
      console.log (this.videologo)
      this.initForm(this.video$);
      this.imgURL = environment.serverFirstHalfOfImageUrl + this.video$?.videoPath;
      this.InsertForm.addControl('id', new FormControl(this.video$.id));
      

      console.log( this.InsertForm);
      
      this.update = true;
    });
  }




  getCategories() {
    this.categoryApiService.getMainForList().subscribe((res) => {
      this.dropdownList$ = res.data;
    });
  }

  loopform() {
     
    this.VideoForm = new FormData();
   
      Object.keys(this.InsertForm.value).forEach((key) => {
        if (this.InsertForm.value[key] == null) {
        } else {
          if (typeof this.InsertForm.value[key] !== "object")
            this.VideoForm.append(key, this.InsertForm.value[key]);
          else
            Object.keys(this.InsertForm.value[key]).forEach((subkey) => {
              this.VideoForm.append(key, this.InsertForm.value[key][subkey]);
            });
        }
      });
      
    
    this.VideoForm.append('video', this.video);
    console.log(this.VideoForm)
  }

  insertVideo() {
    if (this.InsertForm.status == "VALID" && !this.video)

      return Swal.fire({ icon: "error", title: `برجاء اضافة فيديو` });

    this.loopform()
    console.log(this.VideoForm)
    this.requestSent = true;
    debugger
    this.videoApiService.createVideo(this.VideoForm).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إضافة الفيديو بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/ListVideos");
      },
      () => { this.requestSent = false; }
    )
  }


  updateVideo() {
    this.loopform();
    this.requestSent = true;
    this.videoApiService.updateVideo(this.VideoForm).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات الفيديو بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("/content/admin/ListVideos");
      },
      () => { this.requestSent = false; }
    )
    // this.submit = false;
  

  }


 
  onSubmit() {
    debugger
    if (this.InsertForm.status == "VALID") {
      if (this.update == true)
        this.updateVideo();
        
      else
        this.insertVideo();
    } else
      this.InsertForm.markAllAsTouched();
  }



}
