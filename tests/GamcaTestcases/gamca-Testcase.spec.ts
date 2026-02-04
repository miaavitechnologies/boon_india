import { test, expect } from '../../fixtures/boon.fixtures';
import { Gamca } from '../../Pages/GamcaPages/gamca-page';
import testData from '../../test_data/TestData.json';


test.describe('verifying the gamca functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the gamca valid functionality', async ({ page, loginPage: _loginPage }) => {
    const gamcaObj = new Gamca(page);
    await gamcaObj.navigateToPage();

    await gamcaObj.firstname(testData.gamca.firstname);
    await gamcaObj.lastname(testData.gamca.lastname);
    await gamcaObj.SelectCity(testData.gamca.City);
    await gamcaObj.DateofBirth(testData.gamca.Dob);
    await gamcaObj.selectGender(testData.gamca.gender);
    await gamcaObj.Countrytravlingto(testData.gamca.country_travellingto);
    await gamcaObj.Postionappliedfor(testData.gamca.positionAppliedfor);
    await gamcaObj.PassPortNumber(testData.gamca.passportnumber);
    await gamcaObj.ConfirmPassPort(testData.gamca.confirmpassportnumber);
    await gamcaObj.pasporissueplace(testData.gamca.passportissuedate);
    await gamcaObj.PassportIssuedate(testData.gamca.passportissuedate);
    await gamcaObj.PassportExpirydate(testData.gamca.passportexpirydate);
    await gamcaObj.EmailId(testData.gamca.emailId);
    await gamcaObj.PhoneNmber(testData.gamca.phonenumber);
    await gamcaObj.Maritalstatus(testData.gamca.maritalstatus);
    await gamcaObj.Visatype(testData.gamca.visatype);
    await gamcaObj.Aadhar(testData.gamca.Aadhar);
    await gamcaObj.CheckUp();
    await gamcaObj.Next();
   // await expect(page.getByText('Summary')).toBeVisible();
  });
});
