import { FileHandle } from "./file-handle";

export class User{
  userData: any;
  message(message: any) {}
  _id!:string;
  btitle!:string;
  country!:string;
  office_Address!:string;
  applicant_Name!:string;
  applicant_fName!:string;
  contact_Number!:string;
  applicant_Designation!:string;
  applicant_MotherName!:string;
  applicant_Birthplace!:string;
  Individual_Business_Partnership!:string;
  upload_profile?:string;
  upload_certificate?:string;
  logo?: FileHandle[];
  email!:string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  usercertificate?: string;
  id?: string

  name!:string;
  token!:string;
  success: any;
  password! : string;
  cpassword! : string;

}