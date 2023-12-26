import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Encoding, Filesystem, ReadFileOptions } from '@capacitor/filesystem';
import { ToastController } from '@ionic/angular';
import { initData, saveData, setAllData, setIndexButton } from 'logic/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: Array<Array<string>> = [];


  constructor(private router: Router, private toastController: ToastController) { }


  ngOnInit(): void {
    this.loadConfData();
  }


  listProducts() {
    let arr = [];
    let button, img;
    let top = 150;
    let testProduct = document.getElementById('testProduct');

    if (testProduct != null) {


      for (let i = 0; i < this.data.length; i++) {
        button = document.createElement('button');
        button.style.width = 'calc(48vw * 0.95)';
        button.style.height = 'calc(35vw * 0.95)';
        button.style.position = 'absolute';
        button.style.top = top + 'px';
        button.style.overflow = 'hidden';
        button.style.border = 'solid';
        button.style.borderWidth = '2.5px';
        button.style.borderColor = '#aaa';
        button.id = i.toString();

        button.onclick = () => {
          setIndexButton(i);
          this.router.navigateByUrl('/view Product');
        }

        if (i % 2 == 0) {
          button.style.left = '5px';

        } else {
          button.style.right = '5px';

          top = addTopHigher(top);
        }

        img = document.createElement('img');
        img.style.fontSize = '16px';
        img.style.fontFamily = 'Arial';
        img.style.width = 'calc(48vw * 0.95)';
        img.style.height = 'calc(35vw * 0.95)';
        img.style.objectFit = 'cover';

        if (this.data[i][3] != '') {
          img.src = this.data[i][3];

        } else {
          img.alt = this.data[i][0];
        }

        button.appendChild(img);

        arr.push(button);
      }

      for (let i = 0; i < arr.length; i++) {
        testProduct.appendChild(arr[i]);

      }


      function addTopHigher(top: number) {

        if (window.innerWidth < 400) {
          top += 150;
        }
        else if (window.innerWidth < 500) {
          top += 200;
        }
        else if (window.innerWidth < 600) {
          top += 250;
        }
        else if (window.innerWidth < 700) {
          top += 300;
        }
        else if (window.innerWidth < 800) {
          top += 350;
        }
        else if (window.innerWidth < 900) {
          top += 400;
        }
        else {
          top += 550;
        }

        return top;
      }
    }
  }


  addProduct() {
    this.router.navigateByUrl('/add Product');
  }


  async loadConfData() {
    let option: ReadFileOptions = {
      directory: Directory.Documents,
      path: 'CheapProductList/cpl_DATA.txt',
      encoding: Encoding.UTF8,
    }

    Filesystem.readFile(option).then((result) => {

      if (result.data == ''){
        return;
      }

      let info = result.data.toString().split('\n');
      let newData: Array<Array<any>> = [];
      let allowAddArray = true;

      for (let i = 0, j = -1, index = 0; i < info.length; i++) {

        if (allowAddArray) {
          newData.push(new Array());
          j++;
          index = 0;
          allowAddArray = false;
        }

        if (info[i] == '=') {
          allowAddArray = true;

        } else {
          newData[j][index] = info[i];
          index++;
        }
      }

      setAllData(newData);
      this.data = initData();
      this.listProducts();
    });
  }


  async presentToast(message: string, duration: number, position: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }


  saveConfData() {
    saveData();
  }
}