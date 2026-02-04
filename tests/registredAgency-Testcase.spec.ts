import { test, expect } from '../fixtures/boon.fixtures';
import { RegisteredAgency } from '../Pages/registered-Agencies-page';
import testData from '../test_data/TestData.json'

test.describe('verifying the registered agency functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the registered agency valid functionality', async ({
    page,
    loginPage: _loginPage,
  }) => {
    const registeredAgencyObj = new RegisteredAgency(page);

    await registeredAgencyObj.clickExploreAgencies();
    await registeredAgencyObj.navigateToPage();
    await expect(page.getByText('Showing results across all')).toBeVisible();
    await registeredAgencyObj.selectstateCity(testData.registredAgencies.state, testData.registredAgencies.city);
    await registeredAgencyObj.selectAgency();
    await registeredAgencyObj.viewJobBtn();
  });
});
