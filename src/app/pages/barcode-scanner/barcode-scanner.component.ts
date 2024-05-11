import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent implements OnInit {
  
  ngOnInit(): void { }
  scannedData: string | undefined;

  startScanner(): void {
    this.scannedData = undefined;
    (window as any).BarcodeScanner.scan({
      resultArray: [],
      formats: 'QR_CODE,PDF_417', // Specify the barcode formats you want to scan
      continuousMode: true,
      success: (resultArray: any[]) => {
        if (resultArray.length > 0) {
          this.scannedData = resultArray[0].text;
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
