import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxQrcodeStylingService } from 'ngx-qrcode-styling';
import { ToastrService } from 'ngx-toastr';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { UserService } from 'src/app/services/user.service';
import { QRCODE_URL } from 'src/app/share/constants/urls';
import { QrserviceService } from 'src/app/share/qrservice.service';

@Component({
  selector: 'app-qr-code-detail',
  templateUrl: './qr-code-detail.component.html',
  styleUrls: ['./qr-code-detail.component.css']
})
export class QrCodeDetailComponent implements OnInit {
  qrCodes: any[] = []
  CODE_URL = QRCODE_URL
  constructor(private cdr: ChangeDetectorRef, private qrcodes: NgxQrcodeStylingService,
    private qrSer: QrserviceService, private toastr: ToastrService, private userSer: UserService
    , private downloadFile: DownloadFileService,
    private http: HttpClient) { }
  get user() {
    return this.userSer.getUserFromLocalStorage();
  }
  ngOnInit(): void {
    this.getAll()
  }
  delete(id: any) {
    this.qrSer.deleteQr(id).subscribe(res => {
      this.toastr.success("Deleted Successfully")
      this.getAll()
    }, err => {

      this.toastr.error("Error occurred while deleting")
    })
  }
  getAll() {
    debugger
    var userId = this.userSer.getUserFromLocalStorage() as any
    this.qrSer.getAllQrCode(userId.user._id).subscribe((res) => {
      this.qrCodes = res.QrList
    })
  }

  downloadCodesAsImg(qrCodeImage: any, nameOfQR: any) {
    this.downloadFile.saveAsQrCodeImage(qrCodeImage, nameOfQR);
  }
}
