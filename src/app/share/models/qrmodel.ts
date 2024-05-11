import { FileHandle } from "./file-handle";
export interface Product {
  _id: string;
  barcode: string;
  product_name: string;
  Model: string;
  Manufacturer: string;
  AvgPrice: string;
  CurrencyUnit: string;
  specfication: string;
  Feature: string;
  Description: string;
  size: string;
  brand: string;
  qrCode?: string;
  type: string;
  productpicture: string;
  logo?: FileHandle[];
  userId: string;
  createdAt: string;
  selectedBarcodeType: "" | "CODE128" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN" | "UPC" | "EAN8" | "EAN5" | "EAN2" | "CODE39" | "ITF14" | "MSI" | "MSI10" | "MSI11" | "MSI1010" | "MSI1110" | "pharmacode" | "codabar";
  number: string;
  updatedAt: string;
  __v: number;
  id: string;
}
