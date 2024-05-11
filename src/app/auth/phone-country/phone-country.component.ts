import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-country',
  templateUrl: './phone-country.component.html',
  styleUrls: ['./phone-country.component.css']
})
export class PhoneCountryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onCountry (event: any){
    alert(event.dialCode);
  }
  hasError (event: any){
    alert(event);

  }
  getNumber (event: any){
alert(event);
  }

  telInputObject (event: any){
    alert (event);
  }

}
