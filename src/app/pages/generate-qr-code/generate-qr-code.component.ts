import {
  Component,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { NgxQrcodeStylingService, Options } from 'ngx-qrcode-styling';
import { saveAs } from 'file-saver';
import { QrserviceService } from 'src/app/share/qrservice.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/share/models/User';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.css'],
})
export class GenerateQRCodeComponent implements OnInit {
  qrInputValues: string = '';
  targetedUrl: string = '';
  qrName: string = '';
  generatedQr: string = '';
  logoType: string = '';
  qrCodeId = '';
  selectedLogo: string = '';

  public config: Options = {
    width: 200,
    height: 200,
    data: '',
    image: '',
    margin: 5,
    dotsOptions: {
      color: '#1977f3',
      type: 'dots',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
    },
  };

  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  user: any;
  isEdit: boolean = false;
  urlRegex =
    /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)$/;

  constructor(
    private cdr: ChangeDetectorRef,
    private qrcodes: NgxQrcodeStylingService,
    private qrSer: QrserviceService,
    private toastr: ToastrService,
    private userSer: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private downloadFile: DownloadFileService
  ) {}
  form: FormGroup = new FormGroup({
    targetedUrl: new FormControl(''),
    qrName: new FormControl(''),
  });
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log('res res res');

      if (params.QrId) {
        this.qrCodeId = params.QrId;
        this.getById(params.QrId);
        this.isEdit = true;
      }
    });
    this.user = this.userSer.getUserFromLocalStorage();
    this.form = this.formBuilder.group({
      // targetedUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],

      targetedUrl: [
        '',
        [Validators.required],
      ],
      // targetedUrl: ['', [Validators.required, Validators.pattern('(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#()?&//=]*')]],
      // targetedUrl: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
      qrName: ['', [Validators.required, , Validators.maxLength(30)]],
    });
  }

  get f() {
    return this.form.controls;
  }
  
  ngAfterViewInit(): void {
    this.newQR();
  }

  getById(id: any) {
    this.qrSer.getQr(id).subscribe({
      next: (res) => {
        this.form.patchValue({
          targetedUrl: res.qr.targeted_Url,
          qrName: res.qr.qr_name,
        });
        this.generatedQr = res.qr.qrImage;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newQR() {
    if (this.logoType.length > 0) {
      this.selectedLogo =
        '../../../assets/socialMediaIcons/' + this.logoType + '.png';
    } else {
      this.selectedLogo = '';
    }

    this.config = {
      width: 200,
      height: 200,
      data: this.qrInputValues,
      image: this.selectedLogo,
      margin: 5,
      dotsOptions: {
        color: '#000',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 2,
      },
    };
    this.qrcodes
      .create(this.config, this.canvas?.nativeElement)
      .subscribe((res) => {});
  }

  get loggedIn(): boolean {
    if (this.userSer.getUserFromLocalStorage()?.token) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.qrSer
      .createNewQr({
        targeted_Url: this.form.controls['targetedUrl'].value,
        qr_name: this.form.controls['qrName'].value,
      })
      .subscribe(
        (res) => {
          this.toastr.success('Qr Code Added Successfully');
          this.generatedQr = res.data.qrImage;
          this.router.navigate(['/Qr-Codes']);
        },
        (err) => {
          this.toastr.error('An error occurred while generating!');
        }
      );
  }

  update() {
    this.qrSer
      .updateQr(
        {
          targeted_Url: this.form.controls['targetedUrl'].value,
          qr_name: this.form.controls['qrName'].value,
        },
        this.qrCodeId
      )
      .subscribe(
        (res) => {
          this.toastr.success('Qr Code Updated Successfully');
          this.router.navigate(['/Qr-Codes']);
        },
        (err) => {
          this.toastr.error('An error occurred while updating!');
        }
      );
  }

  saveAsImage(parent: any, nameQR: any) {
    const qrCodeName = nameQR.firstChild.data;
    let canvas = parent.childNodes[0];
    saveAs(canvas.toDataURL('image/png'), 'QRCode-' + qrCodeName + '.png');
  }
}
