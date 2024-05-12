import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordsMatchValidator } from 'src/app/share/validators/password_match_validator';
import { City } from 'src/app/share/models/city';
import { Country } from 'src/app/share/models/country';
import { State } from 'src/app/share/models/state';
import { CountrystatecityService } from 'src/app/share/services/countrystatecity.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  listcountry!: Country[];
  countrySelected!: string;
  listState!: State[];
  selectedState!: string;
  listCity!: City[];
  iconPreview: string | undefined;

  registerForm: any = FormGroup;
  submitted = false;
  returnUrl = '';
  fileInputLabel: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countrystatecityService: CountrystatecityService
  ) {}

  get fc() {
    return this.registerForm.controls;
  }

  changeCountry(e: any) {
    this.fc.country.setValue(e.target.value);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    var formdata = new FormData();

    if (this.upload_profile) {
      formdata.append(
        'upload_profile',
        this.upload_profile
      );
    }

    if (this.upload_certificate) {
      this.upload_certificate.forEach(element => {
        formdata.append('upload_certificate', element);
      })
    }

    if (this.logo) {
      this.logo.forEach(element => {
        formdata.append('logo', element);
      })
    }

    const user: any = {
      email: fv.email,
      password: fv.password,
      cpassword: fv.cpassword,
      btitle: fv.btitle,
      country: fv.country,
      office_Address: fv.office_Address,
      applicant_Name: fv.applicant_Name,
      applicant_fName: fv.applicant_fName,
      contact_Number: fv.contact_Number,
      applicant_Designation: fv.applicant_Designation,
      applicant_MotherName: fv.applicant_MotherName,
      applicant_Birthplace: fv.applicant_Birthplace,
      Individual_Business_Partnership: fv.Individual_Business_Partnership,
    };

    for (const key in user) {
      formdata.append(key, user[key]);
    }

    this.userService.register(formdata).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  } // onSubmit End

  upload_profile: any;
  // onFileSelect(event: any) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.iconPreview = e.target.result;
  //   };
  //   this.upload_profile = event.target.files[0];
  // }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.upload_profile = file;
        this.iconPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  upload_certificate: any[]=[];
  onCertifSelect(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      fileList.forEach(element => {
        const reader = new FileReader();
        reader.onload = () => {
          this.upload_certificate.push(element)
        };
        reader.readAsDataURL(element);
      });
    }
  }

  logo: any [] = [];
  onLogoSelect(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      fileList.forEach(element => {
        const reader = new FileReader();
        reader.onload = () => {
          this.logo.push(element)
        };
        reader.readAsDataURL(element);
      });
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        cpassword: ['', [Validators.required]],
        btitle: ['', [Validators.required]],
        country: ['', [Validators.required]],
        office_Address: ['', [Validators.required]],
        applicant_Name: ['', [Validators.required]],
        applicant_fName: ['', [Validators.required]],
        contact_Number: ['', [Validators.required]],
        applicant_Designation: ['', [Validators.required]],
        applicant_MotherName: ['', [Validators.required]],
        applicant_Birthplace: ['', [Validators.required]],
        Individual_Business_Partnership: ['', [Validators.required]],
        upload_profile: [null, [Validators.required]],
        upload_certificate: [null],
        logo: [null],
        terms: ['', [Validators.required]],
      },
      {
        validators: PasswordsMatchValidator('password', 'cpassword'),
      }
    );

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    this.fetchCountry();
  } // ngOnInit

  private fetchCountry() {
    this.countrystatecityService.getCountry().subscribe((data) => {
      this.listcountry = data;
      console.log('Countries fetched', this.listcountry);
    });
  }
  onCountrySelected(countryIso: any) {
    this.countrystatecityService
      .getStateOfSelectedCountry(countryIso)
      .subscribe((data) => {
        this.listState = data;
        console.log('States Retrieved', this.listState);
      });
  }
  onStateSelected(
    countryparam = this.countrySelected,
    stateparam = this.selectedState
  ) {
    this.countrystatecityService
      .getCitiesOfSelectedState(countryparam, stateparam)
      .subscribe((data) => {
        this.listCity = data;
        console.log('Cities retrieved', this.listCity);
      });
  }
}
