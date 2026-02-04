import { test } from '../fixtures/boon.fixtures';
import { HomePage } from '../Pages/homePage';
import { JobDetailsPage } from '../Pages/Jobdetails/jobdetailspage';
import { ProfilePage } from '../Pages/profile-page';
import testData from '../test_data/TestData.json';





test.describe('verifying the save job functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the search save job functionality', async ({ page, loginPage: _loginPage }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);
    const profilepageobj = new ProfilePage(page);
    //const testData = require('../../test_data/TestData.json');
 
    await homepageobj.searchInput(testData.savejobviaSearch.jobtitle);
    await homepageobj.searchJobBtn();
    await jobDetailsobj.jobCard();
    await jobDetailsobj.selectPosition(testData.savejobviaSearch.position);
    //await expect(page.getByRole('checkbox', { name: 'Heavy Bus Driver' })).toBeChecked();
    await jobDetailsobj.saveJobClick();
    await profilepageobj.clickProfileBtn(testData.profile.profileName);
    await profilepageobj.jobHeaderclick();
    await profilepageobj.savedJobs();
  });
});
