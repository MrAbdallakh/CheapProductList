import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { deleteDataInformation, getProductInformation, rewriteData, saveData } from 'logic/data';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {

  productName: string = '';
  productCost: string = '';
  productPlace: string = '';
  imageSrc: string = '';
  checkHorizontal: boolean = true;


  constructor(private location: Location, private actionSheetController: ActionSheetController, private toastController: ToastController) { }


  ngOnInit() {
    let arr = getProductInformation();
    this.productName = arr[0];
    this.productCost = arr[1];
    this.productPlace = arr[2];
    this.imageSrc = arr[3];

    if (arr[4] == 'false'){
      this.checkHorizontal = false;
    }

    this.changeImage();
    if (this.imageSrc != '') {
      document.getElementById('imageViewButton')?.setAttribute('src', this.imageSrc);
    } else {
      document.getElementById('imageViewButton')?.setAttribute('alt', this.productName);
    }
  }


  async getImage() {
    const source = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.getPhoto(CameraSource.Camera);
          }
        },
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.getPhoto(CameraSource.Photos);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.imageSrc = '';
            document.getElementById('imageViewButton')?.setAttribute('src', this.imageSrc);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await source.present();
  }


  async getPhoto(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: source
    });

    if (image.webPath != undefined) {
      this.imageSrc = image.webPath;
      document.getElementById('imageViewButton')?.setAttribute('src', image.webPath);
    }
  }

  changeImage() {
    let buttonImg = document.getElementById('imageViewButton');
    let img = document.getElementById('image');
    let back = document.getElementById('back');
    let save = document.getElementById('save');
    let deleteButton = document.getElementById('delete');

    if (this.checkHorizontal) {

      if (window.innerWidth < 400) {
        buttonImg!.style.height = '230px';
        img!.style.height = '180px';
        back!.style.top = '510px';
        save!.style.top = '510px';
        deleteButton!.style.top = '510px';

      } else if (window.innerWidth < 490) {
        buttonImg!.style.height = '290px';
        img!.style.height = '240px';
        back!.style.top = '560px';
        save!.style.top = '560px';
        deleteButton!.style.top = '560px';

      } else if (window.innerWidth < 560) {
        buttonImg!.style.height = '370px';
        img!.style.height = '320px';
        back!.style.top = '640px';
        save!.style.top = '640px';
        deleteButton!.style.top = '640px';

      } else if (window.innerWidth < 680) {
        buttonImg!.style.height = '450px';
        img!.style.height = '400px';
        back!.style.top = '720px';
        save!.style.top = '720px';
        deleteButton!.style.top = '720px';

      } else {
        buttonImg!.style.height = '500px';
        img!.style.height = '480px';
        back!.style.top = '780px';
        save!.style.top = '780px';
        deleteButton!.style.top = '780px';

      }

    } else {
      if (window.innerWidth < 400) {
        buttonImg!.style.height = '410px';
        img!.style.height = '360px';
        back!.style.top = '690px';
        save!.style.top = '690px';
        deleteButton!.style.top = '690px';

      } else if (window.innerWidth < 490) {
        buttonImg!.style.height = '470px';
        img!.style.height = '420px';
        back!.style.top = '750px';
        save!.style.top = '750px';
        deleteButton!.style.top = '750px';

      } else if (window.innerWidth < 560) {
        buttonImg!.style.height = '630px';
        img!.style.height = '580px';
        back!.style.top = '910px';
        save!.style.top = '910px';
        deleteButton!.style.top = '910px';

      } else if (window.innerWidth < 680) {
        buttonImg!.style.height = '710px';
        img!.style.height = '660px';
        back!.style.top = '980px';
        save!.style.top = '980px';
        deleteButton!.style.top = '980px';

      } else {
        buttonImg!.style.height = '760px';
        img!.style.height = '740px';
        back!.style.top = '1050px';
        save!.style.top = '1050px';
        deleteButton!.style.top = '1050px';

      }
    }

    if (this.imageSrc != '') {
      img!.setAttribute('src', this.imageSrc);
    }
  }

  back() {
    this.location.back();
  }


  delete() {
    deleteDataInformation();
    saveData();
    this.location.back();
  }


  save() {
    this.productCost = this.productCost.replace(',', '.');
    let numberCost: number = parseFloat(this.productCost);

    if (this.productName == '') {
      this.presentToast('Please enter a name', 2000, 'middle');
      return;
    } else if (isNaN(numberCost) || numberCost < 0) {
      this.presentToast('Please enter a positive value', 2000, 'middle');
      return;
    } else if (this.productPlace == '') {
      this.presentToast('Please enter a place', 2000, 'middle');
      return;
    }

    rewriteData(this.productName, numberCost.toFixed(2), this.productPlace, this.imageSrc, this.checkHorizontal);
    saveData();
    this.location.back();
  }


  async presentToast(message: string, duration: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }
}