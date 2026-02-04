import { test } from '../../fixtures/boon.fixtures';
import { HomePage } from '../../Pages/homePage';
import { JobDetailsPage } from '../../Pages/Jobdetails/jobdetailspage';
import { ProfilePage } from '../../Pages/profile-page';
import testData from '../../test_data/TestData.json';


test.describe('verifying the save job functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the save job via top hiring functionality', async ({
    page,
    loginPage: _loginPage,
  }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);
    const profilepageobj = new ProfilePage(page);

    await homepageobj.tophiringLocations(testData.savejobViaTophirng.tophiringcountry);
    await homepageobj.clickViewJobsForCountry(testData.savejobViaTophirng.viewjobcountrybutton);

    await jobDetailsobj.jobCard();
    await jobDetailsobj.selectPositiontophiring();
    //await expect(page.getByRole('checkbox', { name: 'Steel Fixers' })).toBeChecked();
    await jobDetailsobj.saveJobClick();
    await profilepageobj.clickProfileBtn('apple review team');
    await profilepageobj.jobHeaderclick();
    await profilepageobj.savedJobs();
  });
});
