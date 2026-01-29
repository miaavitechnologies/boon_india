import { test } from '../fixtures/boon.fixtures';
import { AddOns } from '../Pages/add-Ons-page';

test.describe('verifying the add-ons functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the add-ons valid functionality', async ({ page, loginPage: _loginPage }) => {
    const addOnobj = new AddOns(page);
    await addOnobj.navigateToPage();
    await addOnobj.openqvcAndReturn();
    await addOnobj.opentasheerAndReturn();
  });
});
