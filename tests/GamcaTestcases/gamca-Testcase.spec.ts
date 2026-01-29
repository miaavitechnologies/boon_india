import { test, expect } from '../../fixtures/boon.fixtures';
import { Gamca } from '../../Pages/GamcaPages/gamca-page';

test.describe('verifying the gamca functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the gamca valid functionality', async ({ page, loginPage: _loginPage }) => {
    const gamcaObj = new Gamca(page);
    await gamcaObj.navigateToPage();

    await gamcaObj.firstname('saraswathi');
    await gamcaObj.lastname('saru');
    await gamcaObj.SelectCity('Bengaluru');
    await gamcaObj.DateofBirth('23-02-2002');
    await gamcaObj.selectGender('Female');
    await gamcaObj.Countrytravlingto('Kuwait');
    await gamcaObj.Postionappliedfor('Barber');
    await gamcaObj.PassPortNumber('A356898');
    await gamcaObj.ConfirmPassPort('A356898');
    await gamcaObj.pasporissueplace('Hyderabad');
    await gamcaObj.PassportIssuedate('23-02-2025');
    await gamcaObj.PassportExpirydate('23-02-2027');
    await gamcaObj.EmailId('Saru.madh@gmail.com');
    await gamcaObj.PhoneNmber('9658245689');
    await gamcaObj.Maritalstatus('Single');
    await gamcaObj.Visatype('Family Visa');
    await gamcaObj.Aadhar('786423455678');
    await gamcaObj.CheckUp();
    await gamcaObj.Next();
    await expect(page.getByText('Summary')).toBeVisible();
  });
});
