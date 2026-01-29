import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class Gamca extends BasePage {
  private readonly generateGamcaslip;
  private readonly country;
  private readonly city;
  private readonly fname;
  private readonly lname;
  private readonly dOB;
  //private readonly yearEle;
  // private readonly monthEle;
  private readonly gender;
  private readonly nationality;
  private readonly countrytravellingto;
  private readonly positionapplied;
  private readonly other;
  private readonly passportnumber;
  private readonly confirmpassportnumber;
  private readonly passportissueplace;
  private readonly passportissuedate;
  private readonly passportexpirydate;
  private readonly emailid;
  private readonly phonenumber;
  private readonly maritalstatus;
  private readonly visatype;
  private readonly aadhar;
  private readonly checkbox;
  private readonly next;
  private readonly pagepath;

  constructor(page: Page) {
    super(page);
    this.pagepath = '/gamca-page';
    this.generateGamcaslip = page.getByRole('button', { name: 'Generate GAMCA Slip' });
    this.country = page.getByRole('combobox');
    this.city = page.locator('.css-19bb58m');
    this.fname = page.getByRole('textbox', { name: 'First Name' });
    this.lname = page.getByRole('textbox', { name: 'Last Name' });
    this.dOB = page.getByRole('textbox', { name: 'DD-MM-YYYY' });
    // this.yearEle=page.
    this.gender = page.locator('div').filter({ hasText: /^Select Gender$/ });
    this.nationality = page.getByRole('combobox');
    this.countrytravellingto = page.locator(
      'div:nth-child(6) > .css-b62m3t-container > .css-6wvn4v-control > .css-hlgwow > .css-19bb58m'
    );
    this.positionapplied = page.locator(
      'div:nth-child(7) > .css-b62m3t-container > .css-6wvn4v-control > .css-hlgwow > .css-19bb58m'
    );
    this.other = page.getByRole('textbox', { name: 'specify other position' });
    this.passportnumber = page.getByRole('textbox', { name: 'Enter passport number', exact: true });
    this.confirmpassportnumber = page.getByRole('textbox', { name: 'Re-enter passport number' });
    this.passportissueplace = page.getByRole('textbox', { name: 'Enter issue place' });
    this.passportissuedate = page.getByRole('textbox', { name: 'DD-MM-YYYY' });
    this.passportexpirydate = page.getByRole('textbox', { name: 'DD-MM-YYYY' });
    this.emailid = page.getByRole('textbox', { name: 'Enter email address' });
    this.phonenumber = page.getByRole('textbox', { name: 'Enter phone number' });
    this.maritalstatus = page.locator(
      'div:nth-child(11) > div > .css-b62m3t-container > .css-6wvn4v-control > .css-hlgwow > .css-19bb58m'
    );
    this.visatype = page.locator(
      'div:nth-child(11) > div:nth-child(2) > .css-b62m3t-container > .css-6wvn4v-control > .css-hlgwow > .css-19bb58m'
    );
    this.aadhar = page.getByRole('textbox', { name: 'Enter Aadhaar Number' });
    this.checkbox = page.getByRole('checkbox', { name: 'I hereby confirm that the' });
    this.next = page.getByRole('button', { name: 'Next' });
  }
  public async navigateToPage(): Promise<void> {
    await this.navigate(this.pagepath);
  }

  public async Country(): Promise<void> {
    await this.country.first().click();
  }
  /*public async SelectCity(cityValue: string): Promise<void> {
        await this.selectFromDivDropDown(this.city, cityValue)
    }*/
  public async SelectCity(cityValue: string): Promise<void> {
    // Click the container to open it
    await this.city.first().click();
    // Type the city name to filter options
    await this.page.keyboard.type(cityValue);
    // Press Enter to select the first/matched option
    await this.page.keyboard.press('Enter');
  }

  public async firstname(firstNameValue: string): Promise<void> {
    await this.fname.fill(firstNameValue);
  }
  public async lastname(lastNameValue: string): Promise<void> {
    await this.lname.fill(lastNameValue);
  }
  public async DateofBirth(dobvalue: string): Promise<void> {
    await this.dOB.nth(0).fill(dobvalue);
  }

  public async selectGender(genderValue: string): Promise<void> {
    await this.selectFromDivDropDown(this.gender.nth(0), genderValue);
  }
  public async Nationality(): Promise<void> {
    await this.nationality.nth(3).click();
  }
  public async Countrytravlingto(countryValue: string): Promise<void> {
    await this.countrytravellingto.click();
    // Type the city name to filter options
    await this.page.keyboard.type(countryValue);
    // Press Enter to select the first/matched option
    await this.page.keyboard.press('Enter');

    // await this.selectFromDivDropDown(this.countrytravellingto, countryValue)
  }
  public async Postionappliedfor(positionvalue: string): Promise<void> {
    await this.selectFromDivDropDown(this.positionapplied, positionvalue);
  }
  public async Other(): Promise<void> {
    await this.other.click();
  }
  public async PassPortNumber(number: string): Promise<void> {
    //await this.passportnumber
    await this.passportnumber.fill(number);
  }
  public async ConfirmPassPort(numbervalue: string): Promise<void> {
    await this.confirmpassportnumber.fill(numbervalue);
  }
  public async pasporissueplace(issueplace: string): Promise<void> {
    await this.passportissueplace.fill(issueplace);
  }
  public async PassportIssuedate(issudate: string): Promise<void> {
    await this.passportissuedate.nth(1).fill(issudate);
  }
  public async PassportExpirydate(expdate: string): Promise<void> {
    await this.passportexpirydate.nth(2).fill(expdate);
  }
  public async EmailId(id: string): Promise<void> {
    await this.emailid.fill(id);
  }
  public async PhoneNmber(number: string): Promise<void> {
    await this.phonenumber.fill(number);
  }
  public async Maritalstatus(maritalValue: string): Promise<void> {
    await this.selectFromDivDropDown(this.maritalstatus.first(), maritalValue);
  }
  public async Visatype(visaValue: string): Promise<void> {
    await this.selectFromDivDropDown(this.visatype, visaValue);
  }
  public async Aadhar(adnumber: string): Promise<void> {
    await this.aadhar.fill(adnumber);
  }
  public async CheckUp(): Promise<void> {
    await this.checkbox.check();
  }
  public async Next(): Promise<void> {
    await this.next.click();
  }
}
