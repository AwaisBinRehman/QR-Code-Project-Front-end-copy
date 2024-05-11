import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  siteKey = '6LcawWUmAAAAAH3Qo5-dtVb452uQMdekSKh8GXjC';

}
