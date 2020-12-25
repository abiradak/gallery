import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openmodal = false;
  dataArray = [];
  fordate = false;
  query: any;
  reservData: any[];
  forcap = false;
  isEdit = false;
  editData: {};
  
  // dummyData = [{
  //     image:"http://localhost/_app_file_/data/user/0/io.ionic.starter/cache/1560420230mobbanner.jpg?1608849158562",
  //     caption:"gfsg",
  //     date:"2020-13-24T22:32:56.008Z"},
  //   {
  //     image:"http://localhost/_app_file_/storage/emulated/0/Pictures/IMG_20201225_040601.jpg",
  //     caption:"test 1",
  //     date:"2020-14-24T22:36:31.043Z"},
  //   {
  //     image:"http://localhost/_app_file_/data/user/0/io.ionic.starter/cache/1560419788mobbanner2.jpg?1608849399948",
  //     caption:"fset",
  //     date:"2020-15-24T22:37:13.410Z"},
  //   {
  //     image:"http://localhost/_app_file_/storage/emulated/0/Pictures/IMG_20201225_040748.jpg",
  //     caption:"hell",
  //     date:"2020-16-24T22:37:59.575Z"
  //   }]
  id: any;
  ecaption: any;
  index: any;
  deletedImage: any;
  

  constructor(public navCtrl: NavController) {

  }
  ionViewWillEnter() {
    this.getImageData();
  }

  open() {
    this.openmodal = true;
  }

  close() {
    this.openmodal = false;
  }

  getImageData() {
    this.dataArray = JSON.parse(localStorage.getItem('data'));
    this.reservData = this.dataArray;
  }

  search() {
    if (this.query && this.query.length > 0) {
      this.dataArray = this.dataArray.filter( (item) => {
        if(this.caption && item.caption.toLowerCase().indexOf(this.query &&  this.query.toLowerCase()) > -1) {
          return item;
        } 
      })
    } else {
     this.dataArray = this.reservData;
    }
  }

  date() {
    this.fordate = true;
    this.forcap = false;
  }
  sortAssdate() {
    this.dataArray.sort( (a,b) => {
      return a.date.localeCompare(b.date);
    })
  }
  sortDesdate() {
    this.dataArray.sort( (a,b) => {
      return b.date.localeCompare(a.date);
    })
  }

  caption() {
    this.forcap = true;
    this.fordate = false;
  }

  sortAssCap() {
    this.dataArray.sort((a, b) => a.caption.localeCompare(b.caption));
  }
  sortDesCap() {
    this.dataArray.sort((a, b) => b.caption.localeCompare(a.caption))
  }

  edit(item , i) {
    this.isEdit = true;
    this.editData = item;
    this.id = item.image;
    this.index = i;
    this.ecaption = item.caption
  }

  update() {
    const localData = JSON.parse(localStorage.getItem('data'));
    localData.forEach(element => {
      if (localData.indexOf(element) === this.index) {
        this.deletedImage = element.image;
        localData.splice(this.index, 1);
      }
    });
    const obj = {
      image: this.deletedImage,
      caption: this.ecaption,
      date: new Date()
    }
    localData.push(obj)
    localStorage.setItem('data', JSON.stringify(localData));
    this.isEdit = false;
    this.getImageData();
  }
  delete() {
    const localData = JSON.parse(localStorage.getItem('data'));
    localData.forEach(element => {
      if (localData.indexOf(element) === this.index) {
        localData.splice(this.index, 1);
      }
    });
    localStorage.setItem('data', JSON.stringify(localData));
    this.isEdit = false;
    this.getImageData();
  }
}
