



import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import{Location} from '@angular/common'
import { ArticleApiService } from '../../../../shared/API-Service/Article/article-api.service';
import { NgbActiveModal, NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment, url } from 'src/environments/environment';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse/GenericResponse';
import { ArticleImages } from 'src/app/shared/Models/Article/Article';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
interface ImageData {
  image: string;
  dataUrl?: string;
  isNewlyUploaded?: boolean;
}


@Component({
selector: 'app-image-popup',
templateUrl: './image-popup.component.html',
styleUrls: ['./image-popup.component.css']

})

export class ImagePopupComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadedImage: File | null = null;
public url: string = url;
  @Input() articleId: number;
  images: { image: string, dataUrl?: string }[] = [];
  newImages: { image: string }[] = [];
  public insertForm: FormGroup;
  CreatMediaArticlePicForm: any = new FormData();
  ArticleImages: any;
  ArticleId:any;
  ArticleName:any
  closeResult: string;
  imagesView: string | ArrayBuffer;
  Image: File;
  ShowPhoto: boolean;
  public disabled :boolean=true;
  Loader:boolean=true;
  serverimage:"https://falehapi.wecancity.com/"

  constructor(public activeModal: NgbActiveModal,
     public modalService: NgbModal,
     private _formBuilder: FormBuilder,
     private _Router:Router,
     private articleApiService: ArticleApiService,
     private _location :Location) { }

  ngOnInit(): void {
    console.log(this.articleId)
    this.ArticleId = this.articleId; 
    // Make sure this.articleId is correctly passed from parent component
    this.fetchImages();
    this.initForm();
    this.GetArticleImages(this.articleId)
  }
  initForm() {
    this.insertForm = this._formBuilder.group({
      title: ['', Validators.required],
    });
  }

  open(content,item) {
    this.ArticleId=item.id;
    this.ArticleName=item.title
    this.GetArticleImages(this.ArticleId)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true,size: 'xl'  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  GetArticleImages(articleId)
  {
    console.log(articleId)
    this.articleApiService.getImagesByArticleId(articleId).subscribe(res=>{
      this.ArticleImages=res.data;
      this.ArticleImages.forEach(element => {
        element.image=environment.serverFirstHalfOfImageUrl+element.image
      });
      console.log(this.ArticleImages)
    })
  }
  get fc() {
    return this.insertForm.controls;
  }
  private getDismissReason(reason: any): string {
  
    if (reason === ModalDismissReasons.ESC) {

      this.insertForm.reset();
      this.imagesView="";

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.insertForm.reset();
      this.imagesView="";

      return 'by clicking on a backdrop';
    } else {
      this.insertForm.reset();
      this.imagesView="";

      return `with: ${reason}`;
    }
  }
  modalclose(){
    this.insertForm.reset();
    this.imagesView="";
    this.modalService.dismissAll();
    //this._Router.navigate(['/content/admin/ListArticle'])
  }
  onFileSelected(event:any) {
    // this.element = element
  //   this.haveImage = true;
    let filesAmount = event.target.files.length;
    var files = event.target.files;
    this.Image = files[0];
    const reader = new FileReader();
    // this.imagePath = files;   
    const video = "video";
    if(files[0].type?.includes(video)){
      this.ShowPhoto=false;
    }
    else{
     this.ShowPhoto=true;
    }
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.images.push(files[0]);
      
      this.imagesView = reader.result;
    }
  }
  deleteimage(imgindex) {
    this.images.splice(imgindex, 1);
    this.imagesView=null

  }
  deleteArticleImage(id){
    Swal.fire({
      title: 'هل تريد مسح العنصر ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleApiService.deleteArticleImageByImageId(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
      // this.GetArticleImages(this.ArticleId);
      this.GetArticleImages(this.ArticleId); // Add this line here
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
        },() => {
          console.log("completed");
        }
        )
      }
    }) 
  
  }
  OpenImage(imagesView){
    Swal.fire({
      imageUrl: imagesView,
      imageHeight: 400,
      imageAlt: 'A tall image',
      confirmButtonText:"الغاء"
    })
  }
  Submit(){
    this.CreatMediaArticlePicForm.set("ArticleImage", this.Image);
    this.CreatMediaArticlePicForm.set('title',this.insertForm.get('title').value)
    this.CreatMediaArticlePicForm.set('ArticleId',this.ArticleId)
    this.articleApiService.createArticleImage(this.CreatMediaArticlePicForm).subscribe(
      (response) => {
      Swal.fire({
      icon: "success",
      title: "تم الحفظ بنجاح",
      showConfirmButton: false,
      timer: 1500,
      });
      this.GetArticleImages(this.ArticleId);
      this.insertForm.reset();
      this.imagesView=null;
      this.images=[];
      this.onFileSelected(null);
    },
      (err) => {
        Swal.fire({
          icon: "error",
          title:err.error.message
          });
      });
  }
  fetchImages() {
    this.articleApiService.getImagesByArticleId(this.articleId).subscribe(
      (response: any) => {
        this.images = response.data.map((image: ArticleImages) => {
          return { image: image.image };
        });
      }
    );
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('articleId', this.articleId.toString());
    formData.append('image', file, file.name);

    this.articleApiService.createArticleImage(formData).subscribe(
      (response: GenericResponse<ArticleImages>) => {
        if (response.success) {
          // Image uploaded successfully
          // Add the newly uploaded image to the newImages array
          this.newImages.push({ image: response.data.image });
          // Add the newly uploaded image to the images array
          this.images.push({ image: response.data.image });
        } 
      },
      (error) => {
        // Handle HTTP error
        console.error(error);
      }
    );
  }

  saveImage(imageUrl: string) {
    const image = this.images.find(img => img.image === imageUrl);
    if (!image) {
      console.error(`Image not found: ${imageUrl}`);
      return;
    }
    if (this.newImages.find(img => img.image === imageUrl)) {
      // Image is newly uploaded
      const imageElement = new Image();
      imageElement.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          console.error('Failed to create canvas context');
          return;
        }
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        context.drawImage(imageElement, 0, 0);
        image.dataUrl = canvas.toDataURL('image/png');
        this.downloadImage(image.dataUrl);
      };
      imageElement.src = this.url + imageUrl;
    } else {
      // Image is not newly uploaded
      if (image.dataUrl) {
        this.downloadImage(image.dataUrl);
      } else {
        const imageElement = new Image();
        imageElement.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) {
            console.error('Failed to create canvas context');
            return;
          }
          canvas.width = imageElement.width;
          canvas.height = imageElement.height;
          context.drawImage(imageElement, 0, 0);
          image.dataUrl = canvas.toDataURL('image/png');
          this.downloadImage(image.dataUrl);
        };
        imageElement.src = this.url + imageUrl;
      }
    }
  }

  downloadImage(dataUrl: string) {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = dataUrl;
    link.click();
  }
}


