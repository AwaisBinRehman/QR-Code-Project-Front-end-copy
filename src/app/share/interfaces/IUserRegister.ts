export interface IUserRegister {
  _id: string;
  email: string;
  password: string;
  cpassword: string;
  btitle: string;
  country: string;
  office_Address: string;
  applicant_Name: string;
  applicant_fName: string;
  contact_Number: string;
  applicant_Designation: string;
  applicant_MotherName: string;
  applicant_Birthplace: string;
  Individual_Business_Partnership: string;
  upload_profile?: string;
  upload_certificate: File[];
  logo: File[];
  terms: string;
}
