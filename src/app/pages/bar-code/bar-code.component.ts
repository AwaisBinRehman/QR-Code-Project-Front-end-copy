import { DownloadFileService } from 'src/app/services/download-file.service';
import { Component, OnInit } from '@angular/core';


interface barcodeInterface {
  name: string,
  value: "" | "CODE128" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN" | "UPC" | "EAN8" | "EAN5" | "EAN2" | "CODE39" | "ITF14" | "MSI" | "MSI10" | "MSI11" | "MSI1010" | "MSI1110" | "pharmacode" | "codabar",
  example: string
}

@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.css']
})
export class BarCodeComponent implements OnInit {
  value = '';
  get values(): string[] {
    return this.value.split('\n');
  }

  constructor(private downloadBarcode:DownloadFileService){ }
  ngOnInit(): void {}

  saveAsImage(parent:any) {
    this.downloadBarcode.saveAsBarCodeImage(parent);
  }
  // =========================
  // Bar Code setting objects and other code 
  // =========================


  barcodeObjs: barcodeInterface[] = [
    { name: 'Select Bar code', value: '', example: 'any' },
    { name: 'Code 128', value: 'CODE128', example: 'Taybi' },
    { name: 'Code 128A', value: 'CODE128A', example: 'EXAMPLE128A' },
    { name: 'Code 128B', value: 'CODE128B', example: 'Example_128B_1234567890' },
    { name: 'Code 128C', value: 'CODE128C', example: '1234567890' },
    { name: 'EAN-8', value: 'EAN8', example: '96385074' },
    { name: 'EAN-5', value: 'EAN5', example: '54495' },
    { name: 'EAN-2', value: 'EAN2', example: '53' },
    { name: 'UPC', value: 'UPC', example: '123456789999' },
    { name: 'Code39', value: 'CODE39', example: 'CODE39 Barcode' },
    { name: 'ITF-14', value: 'ITF14', example: '12345678901231' },
    { name: 'MSI', value: 'MSI', example: '1234567890' },
    { name: 'MSI10', value: 'MSI10', example: '1234' },
    { name: 'MSI11', value: 'MSI11', example: '1234' },
    { name: 'MSI1010', value: 'MSI1010', example: '1234' },
    { name: 'MSI1110', value: 'MSI1110', example: '1234' },
    { name: 'pharmacode', value: 'pharmacode', example: '123456' },
    { name: 'codabar', value: 'codabar', example: '1234567890' }
  ];


  widths = [1, 2, 3, 4];
  heights = [40, 50, 60, 70, 80, 90, 100];
  fontSizes = [10, 12, 14, 16, 18, 20, 22, 24];
  selectedBarcodeObj = this.barcodeObjs[0];
  selectedWidth = this.widths[1];
  selectedHeight = this.heights[3];
  selectedFontSize = this.fontSizes[3];
  title = 'Apna Code hahaha';
  optionValue: any;

}

