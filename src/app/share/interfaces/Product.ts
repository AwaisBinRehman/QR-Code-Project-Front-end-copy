export interface Product{
  _id:string;
  barcode: string;
  product_name:string;
  Model: string;
  Manufacturer:string;
  AvgPrice: Number;
  CurrencyUnit:string
  specfication:string;
  Feature:string;
  Description: string;
  size: string;                               
  brand: string;
  type: string;
  productpicture: string;
  logo: File[];
  
}
