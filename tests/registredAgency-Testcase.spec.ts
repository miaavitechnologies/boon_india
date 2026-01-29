import { test, expect } from '../fixtures/boon.fixtures';
import { RegisteredAgency } from '../Pages/registered-Agencies-page';

test.describe('verifying the registered agency functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the registered agency valid functionality', async ({
    page,
    loginPage: _loginPage,
  }) => {
    const registeredAgencyObj = new RegisteredAgency(page);

    await registeredAgencyObj.clickExploreAgencies();
    await registeredAgencyObj.navigateToPage();
    await expect(page.getByText('Showing results across all')).toBeVisible();
    await registeredAgencyObj.selectstateCity('Maharashtra', 'Mumbai');
    await registeredAgencyObj.selectAgency();
    await registeredAgencyObj.viewJobBtn();
  });
});
