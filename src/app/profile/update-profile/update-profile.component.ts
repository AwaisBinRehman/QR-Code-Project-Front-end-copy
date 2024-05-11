import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { API_URL, IMAGE_URL } from 'src/app/share/constants/urls';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: any;
  image_url = IMAGE_URL
  profileForm: FormGroup;
  profilePicture: any;
  submitted: boolean;
  isFileSelected: boolean;
  profilePictureUpdated: any;
  existing_certificates: any[] = [];
  existing_logos: any[] = [];
  newlyAddedCert: any[] = [];
  newlyAddedLogo: any[] = [];
  constructor(private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit(): void {
    this.initForm()
    this.getUserProfile()
  }

  initForm() {
    this.profileForm = this.fb.group({
      btitle: ['', Validators.required],
      country: ['', Validators.required],
      office_Address: ['', Validators.required],
      applicant_Name: ['', Validators.required],
      applicant_fName: ['', Validators.required],
      contact_Number: ['', Validators.required],
      applicant_Designation: ['', Validators.required],
      applicant_MotherName: ['', Validators.required],
      applicant_Birthplace: ['', Validators.required],
      Individual_Business_Partnership: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add form controls for other fields as needed
    });
  }

  getUserProfile() {
    this._userService.getUser().subscribe(
      (response) => {
        this.user = response.user;
        this.profilePicture = IMAGE_URL + '/user/' + this.user.upload_profile
        this.profilePictureUpdated = IMAGE_URL + this.user.upload_profile
        this.existing_certificates = this.user.upload_certificate
        this.existing_logos = this.user.logo
        this.patchFormValues()
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateUserProfile() {
    this.submitted = true
    if (this.profileForm.valid) {
      const formData = new FormData();
      Object.entries(this.profileForm.value).forEach(([key, value]) => {
        if (typeof value === 'string') {
          formData.append(key, value);
        } else if (value instanceof Blob) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (this.profilePictureUpdated) {
        formData.append("upload_profile", this.profilePictureUpdated)
      }

      if (this.newlyAddedCert) {
        this.newlyAddedCert.forEach(element => {
          formData.append("upload_certificate", element.file)
        });
      }

      if (this.newlyAddedLogo) {
        this.newlyAddedCert.forEach(element => {
          formData.append("logo", element.file)
        });
      }

      this.existing_logos.forEach(element => {
        formData.append("existing_logos", element)
      });

      this.existing_certificates.forEach(element => {
        formData.append("existing_certificates", element)
      });

      this._userService.updateProfile(formData).subscribe(
        (response) => {
          this.newlyAddedCert = [];
          this.newlyAddedLogo = []

          console.log('User profile updated successfully:', response);
          // Optionally, handle success message or navigation
        },
        (error) => {
          console.error('Error updating user profile:', error);
          // Optionally, display error message to the user
        }
      );
    } else {
      // Optionally, handle form validation errors
    }
  }

  onProfileSelect(event: any) {
    this.isFileSelected = true
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.profilePictureUpdated = file;
  }

  onCertSelect(event: any) {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      fileList.forEach(element => {
        const reader = new FileReader();
        reader.onload = () => {
          this.newlyAddedCert.push({
            file: element,
            base64: reader.result as string
          });
        };
        reader.readAsDataURL(element);
      });
    }
  }


  onLogoSelect(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      fileList.forEach(element => {
        const reader = new FileReader();
        reader.onload = () => {
          this.newlyAddedLogo.push({
            file: element,
            base64: reader.result as string
          })
        };
        reader.readAsDataURL(element);
      });
    }
  }


  get f() { return this.profileForm.controls; }


  patchFormValues() {
    this.profileForm.patchValue({
      btitle: this.user.btitle,
      country: this.user.country,
      office_Address: this.user.office_Address,
      applicant_Name: this.user.applicant_Name,
      applicant_fName: this.user.applicant_fName,
      contact_Number: this.user.contact_Number,
      applicant_Designation: this.user.applicant_Designation,
      applicant_MotherName: this.user.applicant_MotherName,
      applicant_Birthplace: this.user.applicant_Birthplace,
      Individual_Business_Partnership: this.user.Individual_Business_Partnership,
      email: this.user.email,
      // Patch other form controls with user profile data
    });
  }

  deleteCertificate(certificate: string, isNew: boolean) {
    if (isNew) {
      const index = this.newlyAddedCert.indexOf(certificate);
      if (index !== -1) {
        this.newlyAddedCert.splice(index, 1);
      }
      return
    }
    const index = this.existing_certificates.indexOf(certificate);
    if (index !== -1) {
      this.existing_certificates.splice(index, 1);
    }
  }

  deleteLogo(logo: string, isNew: boolean) {
    if (isNew) {
      const index = this.newlyAddedLogo.indexOf(logo);
      if (index !== -1) {
        this.newlyAddedLogo.splice(index, 1);
      }
      return
    }
    const index = this.existing_logos.indexOf(logo);
    if (index !== -1) {
      this.existing_logos.splice(index, 1);
    }
  }


}
