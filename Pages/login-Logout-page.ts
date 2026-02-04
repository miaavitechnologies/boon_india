import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  private readonly signInLink;
  private readonly mobileInput;
  private readonly sendotpinput;
  private readonly otpInput;
  private readonly verifyOtpBtn;
  private readonly profileBtn;
  private readonly logOutbtn;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByRole('link', { name: 'Sign In' });
    // BEST: role + accessible name
    this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number' });
    this.sendotpinput = page.getByRole('button', { name: 'Send OTP' });
    this.otpInput = page.getByPlaceholder('Enter OTP');
    this.verifyOtpBtn = page.getByRole('button', { name: 'Verify OTP' });
    this.profileBtn = page.getByRole('button', { name: 'apple review team' });
    this.logOutbtn = page.getByRole('link', { name: 'Logout' });
  }

  public override async navigate(path = '/'): Promise<void> {
    await super.navigate(path);
  }

  public async openLogin() {
    await this.signInLink.click();
  }

  public async enterMobile(mobile: string) {
    //await this.mobileInput.waitFor({ state: 'visible' });
    await this.mobileInput.fill(mobile);
    await this.sendotpinput.click();
  }

  // public async submitMobile() {
  //  await this.sendotpinput.click();
  // }

  public async enterOtp(otp: string) {
    // 1. Split the string into an array: ['1', '2', '3', '4', '5', '6']
    const digits = otp.split('');

    // 2. Fill the first box (which has a unique accessible name)
    await this.page
      .getByRole('textbox', { name: 'Please enter the OTP sent to +91' })
      .fill(digits[0]);

    // 3. Fill the remaining 5 boxes (which are named '0')
    // Loop starts at index 1 of our digit array
    for (let i = 1; i < digits.length; i++) {
      // .nth(i-1) matches because the first box named '0' is the 2nd box overall
      await this.page
        .getByRole('textbox', { name: '0' })
        .nth(i - 1)
        .fill(digits[i]);
      //await this.otpInput.fill(otp);
    }
    await this.verifyOtpBtn.click();
  }

  
  public async ProfileView(_value: string): Promise<void> {
    await this.profileBtn.click();
  }

  public async logOutBtn(): Promise<void> {
    await this.logOutbtn.click();
  }
}
