import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  image: string;
  private win: any = window;
  arr = [];
  caption: any;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    // public toastController: ToastController
    
  ) {

  }


  async saveFormBrowse() {
    const options: CameraOptions = {
      quality: 30,
      allowEdit: true,
      targetHeight: 720,
      targetWidth: 720,
      destinationType: this.camera.DestinationType.FILE_URI,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.camera.getPicture(options).then((imageData) => {
        var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
        var correctPath = imageData.substring(0, imageData.lastIndexOf('/'));
        var url = `${correctPath}/${currentName}`;
        this.image = this.win.Ionic.WebView.convertFileSrc(url);
    }, (err) => {
      console.log('errors >>>>', err);
    });
  }

  

  async saveFormCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then(imageData => {
        var currentName = imageData.substring(imageData.lastIndexOf('/') + 1);
        var correctPath = imageData.substring(0, imageData.lastIndexOf('/'));
        var url = `${correctPath}/${currentName}`;
        this.image = this.win.Ionic.WebView.convertFileSrc(url);
        console.log('>>>>>', this.image);
    }, (err) => {
        console.log("Error", err)
    });
  }

  save() {
    if (this.caption && this.image) {
      const obj = {
        image: this.image,
        caption: this.caption,
        date: new Date()
      }
      const prevArray = JSON.parse(localStorage.getItem('data'));
      if (prevArray && prevArray.length > 0) {
        this.arr = prevArray;
        this.arr.push(obj);
        localStorage.setItem('data', JSON.stringify(this.arr));
        // this.presentToast('Image Caption Added' , 'success');
        this.clear();
        
      } else {
        this.arr.push(obj);
        localStorage.setItem('data', JSON.stringify(this.arr));
        // this.presentToast('Image Caption Added' , 'success');
        this.clear();
      }
    }
  }

  clear() {
    this.image = '';
    this.caption = '';
  }

  // New Method
  // async presentToast(message, color) {
  //   const toast = await this.toastController.create({
  //     message,
  //     color,
  //     position: 'top',
  //     duration: 2000,
  //     buttons: [
  //       {
  //         text: 'Close',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   toast.present();
  // }
}
