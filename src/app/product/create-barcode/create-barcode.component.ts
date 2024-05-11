import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-create-barcode',
  templateUrl: './create-barcode.component.html',
  styleUrls: ['./create-barcode.component.css']
})
export class CreateBarcodeComponent implements OnInit, OnChanges {

  @Input() barcode: string | undefined;
  @Input() barcodeType: "" | "CODE128" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN" | "UPC" | "EAN8" | "EAN5" | "EAN2" | "CODE39" | "ITF14" | "MSI" | "MSI10" | "MSI11" | "MSI1010" | "MSI1110" | "pharmacode" | "codabar";
  value: any;
  get values(): string[] {
    return this.value.split('');
  }

  constructor() { }
  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.value = this.barcode;
  }

}
