import { test } from '../fixtures/boon.fixtures';
import { AddOns } from '../Pages/add-Ons-page';
import testData from '../test_data/TestData.json'

test.describe('verifying the add-ons functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the add-ons valid functionality', async ({ page, loginPage: _loginPage }) => {
    const addOnobj = new AddOns(page);
    await addOnobj.navigateToPage();
    //await addOnobj.openTakamolAndReturn();
    await addOnobj.openqvcAndReturn();
    await addOnobj.opentasheerAndReturn();
  });
});
