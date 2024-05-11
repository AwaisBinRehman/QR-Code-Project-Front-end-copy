import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../share/constants/urls';

@Injectable({
  providedIn: 'root'
})

export class DownloadFileService {

  constructor(private http: HttpClient) { }

  saveAsBarCodeImage(parent: any) {
    const svgElement = parent.bcElement.nativeElement.querySelector('svg');
    const nameOfBarcode = parent.value;

    //  ================CONVERT SVG TO BASE64================
    let { width, height } = svgElement.getBBox();
    let clonedSvgElement = svgElement.cloneNode(true);

    let outerHTML = clonedSvgElement.outerHTML, blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });

    let URL = (window.URL || window.webkitURL || window) as (typeof window.URL & { createObjectURL: (obj: Blob) => string });
    let blobURL = URL.createObjectURL(blob);

    let image = new Image();
    image.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext('2d');

      // draw image in canvas starting left-0 , top - 0
      context?.drawImage(image, 0, 0, width, height);
      let png = canvas.toDataURL();

      // ===========CONVERTS BASE 64 ENCODED IMAGE TO BLOBDATA
      let blobData = this.convertBase64ToBlob(png);

      // ============SAVE AS IMAGE=======================
      const nav = (window.navigator as any);
      if (window.navigator && nav.msSaveOrOpenBlob) { //IE
        (window.navigator as any).msSaveOrOpenBlob(blobData, nameOfBarcode + 'Barcode');
      }
      else { // chrome
        const blob = new Blob([blobData], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        // window.open(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = nameOfBarcode + 'Barcode';
        link.click();
      }

    };

    image.src = blobURL;

  }

  // ================END OF BAR-CODE=================================
  saveAsQrCodeImage(parent: any, nameQR: any) {
    // Extract QR code name from the provided parameter
    const qrCodeName = nameQR?.firstChild?.data ?? '';
  
    // Ensure parent is an image element
    if (!(parent instanceof HTMLImageElement)) {
      console.error('Parent element is not an image element');
      return;
    }
  
    // Check if src is a URL or base64 data
    let imageData: string;
    if (parent.src.startsWith('data:image')) {
      // If src starts with "data:image", it's a base64-encoded image
      imageData = parent.src.split(',')[1]; // Extract base64 data after comma
      // Convert base64-encoded image to blob
      const blobData = this.convertBase64ToBlob(imageData);
      // Save as image
      this.saveBlobAsImage(blobData, qrCodeName);
    } else {
      // Otherwise, assume src is a URL
      this.downloadQrCodeImageByUrl(parent.src, qrCodeName);
    }
  }
  
  private saveBlobAsImage(blob: Blob, qrCodeName: string) {
    const nav = (window.navigator as any);
    if (window.navigator && nav.msSaveOrOpenBlob) { // IE
      (window.navigator as any).msSaveOrOpenBlob(blob, qrCodeName + 'Qr-Code');
    } else { // Chrome and other browsers
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = qrCodeName + 'Qr-Code';
      link.click();
    }
  }
  
  private downloadQrCodeImageByUrl(url: string, fileName: string) {
    const urll = API_URL+'download-qrcode/'+url.split('qrcode/')[1]
    this.http.get(urll, { responseType: 'blob' }).subscribe(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, error => {
      console.error('Error downloading the image: ', error);
    });
  }
  
  // ======================END OF QR-CODE=====================

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }


}
