import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private environment: EnvironmentService) { }

  public async saveData(key: string, value: string) {
    sessionStorage.setItem(key,  this.encrypt(value));
  }

  public getData(key: string) {
    let data = sessionStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }

  private encrypt(txt: string) {
    return CryptoJS.AES.encrypt(txt, this.environment.getConfig('cryptoKey')).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.environment.getConfig('cryptoKey')).toString(CryptoJS.enc.Utf8);
  }

}
