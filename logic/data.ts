import { Directory, Encoding, Filesystem, WriteFileOptions } from "@capacitor/filesystem";

let data: Array<Array<string>> = [];
let index: number;

export function addData(name: string, cost: string, place: string, image: string, checkHorizontal: boolean) {
    data.push(new Array());
    data[data.length - 1].push(name);
    data[data.length - 1].push(cost);
    data[data.length - 1].push(place);
    data[data.length - 1].push(image);
    data[data.length - 1].push(checkHorizontal.toString());
}

export function initData(): Array<Array<string>> {
    return data;
}

export function setIndexButton(indexPosition: number) {
    index = indexPosition;
}

export function getProductInformation() {
    return data[index];
}

export function rewriteData(name: string, cost: string, place: string, image: string, checkHorizontal: boolean) {
    data[index][0] = name;
    data[index][1] = cost;
    data[index][2] = place;
    data[index][3] = image;
    data[index][4] = checkHorizontal.toString();
}

export function deleteDataInformation() {
    if (index > 0) {
        data.splice(index, 1);
    } else {
        data.splice(0, 1);
    }
}

export function getAllData() {
    return data;
}

export function setAllData(newData: Array<Array<string>>) {
    data = newData;
}

export function saveData(){
    let contents = '';
    let data = getAllData();

    for (let index = 0; index < data.length; index++) {
      contents += data[index][0] + '\n';
      contents += data[index][1] + '\n';
      contents += data[index][2] + '\n';
      contents += data[index][3] + '\n';
      contents += data[index][4] + '\n';

      if (index + 1 < data.length) {
        contents += '=\n';
      }
    }

    let option: WriteFileOptions = {
      path: 'CheapProductList/cpl_DATA.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
      data: contents
    };

    Filesystem.writeFile(option);
}