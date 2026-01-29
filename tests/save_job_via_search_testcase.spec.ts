import { test } from '../fixtures/boon.fixtures';
import { HomePage } from '../Pages/homePage';
import { JobDetailsPage } from '../Pages/Jobdetails/jobdetailspage';

test.describe('verifying the save job functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the search save job functionality', async ({ page, loginPage: _loginPage }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);

    await homepageobj.searchInput('Electricians');
    await homepageobj.searchJobBtn();
    await jobDetailsobj.jobCard();
    await jobDetailsobj.selectPosition('Electricians');
    //await expect(page.getByRole('checkbox', { name: 'Heavy Bus Driver' })).toBeChecked();
    await jobDetailsobj.saveJobClick();
  });
});
