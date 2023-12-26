import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { addData, saveData } from 'logic/data';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {

  imageSrc: string = '';
  name: string = '';
  cost: string = '';
  place: string = '';
  checkHorizontal: boolean = true;


  constructor(private location: Location, private actionSheetController: ActionSheetController,
    private toastController: ToastController) { }


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
      let iamge = document.getElementById('image');
      iamge?.setAttribute('src', image.webPath);
    }
  }

  changeImage() {
    let buttonImg = document.getElementById('imageViewButton');
    let img = document.getElementById('image');
    let declineButton = document.getElementById('decline');
    let add = document.getElementById('add');

    if (this.checkHorizontal) {

      if (window.innerWidth < 400) {
        buttonImg!.style.height = '230px';
        img!.style.height = '180px';
        declineButton!.style.top = '510px';
        add!.style.top = '510px';

      } else if (window.innerWidth < 490) {
        buttonImg!.style.height = '290px';
        img!.style.height = '240px';
        declineButton!.style.top = '560px';
        add!.style.top = '560px';

      } else if (window.innerWidth < 560) {
        buttonImg!.style.height = '370px';
        img!.style.height = '320px';
        declineButton!.style.top = '640px';
        add!.style.top = '640px';

      } else if (window.innerWidth < 680) {
        buttonImg!.style.height = '450px';
        img!.style.height = '400px';
        declineButton!.style.top = '720px';
        add!.style.top = '720px';

      } else {
        buttonImg!.style.height = '500px';
        img!.style.height = '480px';
        declineButton!.style.top = '780px';
        add!.style.top = '780px';

      }

    } else {
      if (window.innerWidth < 400) {
        buttonImg!.style.height = '410px';
        img!.style.height = '360px';
        declineButton!.style.top = '690px';
        add!.style.top = '690px';

      } else if (window.innerWidth < 490) {
        buttonImg!.style.height = '470px';
        img!.style.height = '420px';
        declineButton!.style.top = '750px';
        add!.style.top = '750px';

      } else if (window.innerWidth < 560) {
        buttonImg!.style.height = '630px';
        img!.style.height = '580px';
        declineButton!.style.top = '910px';
        add!.style.top = '910px';

      } else if (window.innerWidth < 680) {
        buttonImg!.style.height = '710px';
        img!.style.height = '660px';
        declineButton!.style.top = '980px';
        add!.style.top = '980px';

      } else {
        buttonImg!.style.height = '760px';
        img!.style.height = '740px';
        declineButton!.style.top = '1050px';
        add!.style.top = '1050px';

      }
    }

    if (this.imageSrc != '') {
      img!.setAttribute('src', this.imageSrc);
    }
  }


  decline() {
    this.location.back();
  }


  add() {
    this.cost = this.cost.replace(',', '.');
    let numberCost: number = parseFloat(this.cost);

    if (this.name == '') {
      this.presentToast('Please enter a name', 2000, 'middle');
      return;
    } else if (isNaN(numberCost) || numberCost < 0) {
      this.presentToast('Please enter a positive value', 2000, 'middle');
      return;
    } else if (this.place == '') {
      this.presentToast('Please enter a place', 2000, 'middle');
      return;
    }

    addData(this.name, numberCost.toFixed(2), this.place, this.imageSrc, this.checkHorizontal);
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