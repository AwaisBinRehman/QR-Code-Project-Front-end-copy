import { Component, OnInit, Input, OnChanges, AfterContentInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QrserviceService } from 'src/app/share/qrservice.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  @Input() barcode: string | undefined;

  addForm!: FormGroup;
  submitted = false;
  iconPreview!: string;
  logo: any[] = []; // Use an array to store multiple selected images

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: QrserviceService,
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      barcode: ['', Validators.required],
      product_name: ['', Validators.required],
      Model: ['', Validators.required],
      Manufacturer: ['', Validators.required],
      AvgPrice: [0, Validators.required],
      CurrencyUnit: ['USD', Validators.required],
      specfication: ['', Validators.required],
      Feature: ['', Validators.required],
      Description: ['', Validators.required],
      size: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
      productpicture: ['', Validators.required],
      logo: [[]]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  // onCategoryIconChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.productpictureFile = input.files[0]; 
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.iconPreview = e.target.result;
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    console.log('Form submitted:', this.addForm.value);

    const product = this.addForm.value;
    const formData = new FormData();
    formData.append('barcode', product.barcode);
    formData.append('selectedBarcodeType', this.selectedBarcodeObj?.value ?? 'CODE128');
    formData.append('product_name', product.product_name);
    formData.append('Model', product.Model);
    formData.append('Manufacturer', product.Manufacturer);
    formData.append('AvgPrice', product.AvgPrice);
    formData.append('CurrencyUnit', product.CurrencyUnit);
    formData.append('Specfication', product.specfication);
    formData.append('Feature', product.Feature);
    formData.append('Description', product.Description);
    formData.append('size', product.size);
    formData.append('qrCode', product.qrCode);
    formData.append('brand', product.brand);
    formData.append('type', product.type);
    formData.append('number', product?.number ?? 0);
    formData.append('productpicture', this.productpicture, this.productpicture.relativePath);
    for (let i = 0; i < this.logo.length; i++) {
      formData.append('logo', this.logo[i], this.logo[i].relativePath);
    }

    this.productService.createProduct(formData)
      .subscribe(
        (response) => {
          console.log('Product created:', response);
          this.router.navigate(['products/all']);
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
  }

  onLogoSelect(event: any) {
    const files: FileList = event.target.files;

    // Clear the existing logo array if needed
    // this.logo = [];

    // Iterate through the selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.logo.push(file); // Add each file to the array
    }
  }

  productpicture: any;
  
  onFileSelect(event: any) {
    this.productpicture = event.target.files[0];
  }

  value = '';

  barcodeObjs = [
    { name: 'Select Barcode', value: '', lengths: [], rule: 'None' },
    { name: 'Code 128', value: 'CODE128', lengths: [], rule: 'Alphanumeric' },
    { name: 'Code 128A', value: 'CODE128A', lengths: [], rule: 'Alphanumeric' },
    { name: 'Code 128B', value: 'CODE128B', lengths: [], rule: 'Alphanumeric' },
    { name: 'Code 128C', value: 'CODE128C', lengths: [], rule: 'Numeric' },
    { name: 'EAN-13', value: 'EAN13', lengths: [12], rule: 'Numeric' },
    { name: 'EAN-8', value: 'EAN8', lengths: [7], rule: 'Numeric' },
    { name: 'EAN-5', value: 'EAN5', lengths: [5], rule: 'Numeric' },
    { name: 'EAN-2', value: 'EAN2', lengths: [2], rule: 'Numeric' },
    { name: 'UPC', value: 'UPC', lengths: [11], rule: 'Numeric' },
    { name: 'Code39', value: 'CODE39', lengths: [], rule: 'Alphanumeric' },
    { name: 'ITF', value: 'ITF', lengths: [], rule: 'Numeric' },
    { name: 'ITF-14', value: 'ITF14', lengths: [13], rule: 'Numeric' },
    { name: 'MSI', value: 'MSI', lengths: [], rule: 'Numeric' },
    { name: 'MSI10', value: 'MSI10', lengths: [], rule: 'Numeric' },
    { name: 'MSI11', value: 'MSI11', lengths: [], rule: 'Numeric' },
    { name: 'MSI1010', value: 'MSI1010', lengths: [], rule: 'Numeric' },
    { name: 'MSI1110', value: 'MSI1110', lengths: [], rule: 'Numeric' },
    { name: 'Pharmacode', value: 'pharmacode', lengths: [6,2], rule: 'Numeric' },
    { name: 'Codabar', value: 'codabar', lengths: [], rule: 'Alphanumeric' }
  ];


  onBarcodeTypeChange(): void {
    let validators = [Validators.required];
    if (this.selectedBarcodeObj.lengths && this.selectedBarcodeObj.lengths.length > 0) {
      const maxLength = Math.max(...this.selectedBarcodeObj.lengths);
      const minLength = Math.min(...this.selectedBarcodeObj.lengths);
      validators.push(Validators.minLength(minLength));
      validators.push(Validators.maxLength(maxLength));
    }
    if (this.selectedBarcodeObj.rule === 'Numeric') {
      validators.push(Validators.pattern('^[0-9]*$'));
    } else if (this.selectedBarcodeObj.rule === 'Alphanumeric') {
      validators.push(Validators.pattern('^[a-zA-Z0-9]*$'));
    }
    this.addForm.controls['barcode'].setValidators(validators);
    this.addForm.controls['barcode'].updateValueAndValidity();
  }




  selectedBarcodeObj = this.barcodeObjs[0];
  optionValue: any;

}