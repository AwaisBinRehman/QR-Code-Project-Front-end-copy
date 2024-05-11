import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Html5QrcodeScanner, QrcodeSuccessCallback, QrcodeErrorCallback } from 'html5-qrcode';

@Component({
  selector: 'app-uploadbarcode',
  templateUrl: './uploadbarcode.component.html',
  styleUrls: ['./uploadbarcode.component.css']
})
export class UploadbarcodeComponent implements OnInit {
  private scanner!: Html5QrcodeScanner;

  ngOnInit() {
    this.scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 20,
    }, false); // Set verbose parameter to false

    this.scanner.render(this.success, this.error);
  }

  success: QrcodeSuccessCallback = (result: string) => {
    console.log(result);
    const resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.innerHTML = `
        <h2>Success!</h2>
        <p><a href="${result}">${result}</a></p>
      `;
    }
    this.scanner.clear();
    const readerElement = document.getElementById('reader');
    if (readerElement) {
      readerElement.remove();
    }
  };

  error: QrcodeErrorCallback = (err: any) => {
    console.error(err);
  };
}