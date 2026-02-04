import { test } from '../fixtures/boon.fixtures';
import { Walkin } from '../Pages/walk-In-page';
import testData from '../test_data/TestData.json'


test.describe('verifying the walk-in functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the walk-in valid functionality', async ({ page, loginPage: _loginPage }) => {
    const walkin = new Walkin(page);

    await walkin.navigateToPage();
    await walkin.clickviewwalkin();
    await walkin.searchJobTitle(testData['walk-In'].jobtitle);
    await walkin.selecttCountry(testData['walk-In'].country);
    await walkin.findJobs();

    await walkin.clickjobcard();

    await walkin.clicksavewalkin();
  });
});
