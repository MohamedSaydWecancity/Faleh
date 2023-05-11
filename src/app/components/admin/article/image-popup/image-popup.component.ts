



import { Component, OnInit, Input } from '@angular/core';

import { ArticleApiService } from '../../../../shared/API-Service/Article/article-api.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { url } from 'src/environments/environment';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse/GenericResponse';
import { ArticleImages } from 'src/app/shared/Models/Article/Article';



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
// public url: string = url;
// @Input() articleId: number;
// images: string[] = [];




//   constructor(
//     public activeModal: NgbActiveModal,
//     private articleApiService: ArticleApiService
//   ) {}




// ngOnInit(): void {
// this.fetchImages();
// }




//  fetchImages() {
// this.articleApiService.getImagesByArticleId(this.articleId).subscribe(
// (response: any) => {
// this.images = response.data;
// }
// );}
// saveImage(imageUrl: string) {
//   const image = this.images.find(img => img.image === imageUrl);
//   if (!image) {
//     console.error(`Image not found: ${imageUrl}`);
//     return;
//   }
//   if (image.dataUrl) {
//     this.downloadImage(image.dataUrl);
//     return;
//   }
//   const imageElement = new Image();
//   imageElement.onload = () => {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     if (!context) {
//       console.error('Failed to create canvas context');
//       return;
//     }
//     canvas.width = imageElement.width;
//     canvas.height = imageElement.height;
//     context.drawImage(imageElement, 0, 0);
//     image.dataUrl = canvas.toDataURL('image/png');
//     this.downloadImage(image.dataUrl);
//   };
//   imageElement.src = this.url + imageUrl;
// }

// downloadImage(dataUrl: string) {
//   const link = document.createElement('a');
//   link.download = 'image.png';
//   link.href = dataUrl;
//   link.click();
// }




// uploadImage(file: File) {
//   const formData = new FormData();
//   formData.append('articleId', this.articleId.toString());
//   formData.append('image', file, file.name);

//   this.articleApiService.createArticleImage(formData).subscribe(
//     (response: GenericResponse<ArticleImages>) => {
//       if (response.success) {
//         // Image uploaded successfully
//         // Fetch the updated list of images
//         this.fetchImages();
//       } 
//     },
//     (error) => {
//       // Handle HTTP error
//       console.error(error);
//     }
//   );
// }
public url: string = url;
  @Input() articleId: number;
  images: { image: string, dataUrl?: string }[] = [];
  newImages: { image: string }[] = [];

  constructor(public activeModal: NgbActiveModal, private articleApiService: ArticleApiService) { }

  ngOnInit(): void {
    this.fetchImages();
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


