import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'envirements/envirement';
import { Observable, Observer } from 'rxjs';
import { Product } from './models/qrmodel';


@Injectable({
  providedIn: 'root'
})
export class QrserviceService {
  
  //THIS IS UPDATED CODE AND NEW LINK
  apiURL = 'http://localhost:3000/qr/';

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL+"product/all");
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiURL+"add/product", productData);
  }

  getProduct(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}product/vendor/${userId}`);
  }
  
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}product/single/${id}`);
  }

  getProductBySearchId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}product/searched/${id}`);
  }
  // getProductByUserId(userId: string): Observable<any> {
  //   return this.http.get<any>('http://test.steamminds.org/qr/product/vendor/' + userId);
  // }
  

  // updateProduct(productId: string, productData: any): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiURL}update/${productId}`, productData);
  // }
  // updateProduct(productId: string, productData: Partial<Product>): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiURL}update/${productId}`, productData);
  // }
  updateProduct(productId: string, formData: FormData): Observable<Product> {
    const url = `${this.apiURL}update/${productId}`;
    return this.http.put<Product>(url, formData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${productId}`);
  }

  getBase64ImageFromURL(url: string) {

    return new Observable((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.referrerPolicy = "no-refrrer"
      img.src = url+'?r=' + Math.floor(Math.random()*100000);
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    img.crossOrigin="*"
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  }

  getAllQrCode(userId: any): Observable<any> {
    return this.http.get<any>(this.apiURL+"getall/qrcode/"+userId);
  }

  createNewQr(qrCodeData: any): Observable<any> {
    return this.http.post<any>(this.apiURL+"add/qrcode", qrCodeData);
  }

  getQr(qrCodeId: string): Observable<any> {
    return this.http.get<any>(this.apiURL+'single/qrcode/'+qrCodeId);
  }

  updateQr(qrCodeData: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.apiURL}update/qrcode/${id}`, qrCodeData);
  }

  deleteQr(qrCodeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}delete/qrcode/${qrCodeId}`);
  }

}
