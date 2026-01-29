import { test } from '../fixtures/boon.fixtures';
import { Walkin } from '../Pages/walk-In-page';

test.describe('verifying the walk-in functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the walk-in valid functionality', async ({ page, loginPage: _loginPage }) => {
    const walkin = new Walkin(page);

    await walkin.navigateToPage();
    await walkin.clickviewwalkin();
    await walkin.searchJobTitle('electrician');
    await walkin.selectCountry('Saudi Arabia');
    await walkin.findJobs();

    await walkin.clickjobcard();

    await walkin.clicksavewalkin();
  });
});
