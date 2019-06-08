import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Footer} from './footer/footer.model';
import {SuperCategory} from './category/category.model';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  serviceUrl: string = AppSetting.serviceUrl;
constructor( private httpClient: HttpClient) { }

    // get footer
    getFooterDetails(): Observable<any> {
      const categoryUrl = 'footerDetails';
      const url: string = this.serviceUrl + categoryUrl;
      return this.httpClient.get<Footer>(url);

    }

    getSuperCategory(): Observable<any> {
      const categoryUrl = 'categoryDetails';
      const url: string = this.serviceUrl + categoryUrl;
      return this.httpClient.get<SuperCategory>(url);
    }
    addToQty() {
      let sum = 0;
      if (JSON.parse(sessionStorage.getItem('login'))) {
        return JSON.parse(sessionStorage.getItem('cartLength'));
      } else {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        cart.map(item => {
          sum += item.length;
        });
        return cart.length;
      }
    }
    getLogin() {
      return JSON.parse(sessionStorage.getItem('login'));
    }
    sessionLogout() {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userEmailId');
      sessionStorage.setItem('login', 'false');
      sessionStorage.removeItem('cartLength');
    }
    findName() {
      return sessionStorage.getItem('userEmailId');
    }
  }
