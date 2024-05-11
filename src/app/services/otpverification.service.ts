import { Injectable } from '@angular/core';
import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class OtpverificationService {

  private readonly otpDigits = 6;

  generateOtp(): string {
    const secret = crypto.randomBytes(32).toString('hex');
    const otp = Math.floor(Math.pow(10, this.otpDigits - 1) + Math.random() * 9 * Math.pow(10, this.otpDigits - 1)).toString();

    return `${secret}${otp}`;
  }

  verifyOtp(otp: string, input: string): boolean {
    const secret = otp.slice(0, -this.otpDigits);
    const expectedOtp = otp.slice(-this.otpDigits);
    const hash = crypto.createHmac('sha256', secret).update(input).digest('hex');

    return expectedOtp === hash;
  }
}