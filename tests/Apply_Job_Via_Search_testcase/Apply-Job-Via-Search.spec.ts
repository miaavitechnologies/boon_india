import { test } from '../../fixtures/boon.fixtures';
import { HomePage } from '../../Pages/homePage';
import { JobDetailsPage } from '../../Pages/Jobdetails/jobdetailspage';
import path from 'path';
import { ProfilePage } from '../../Pages/profile-page';
import testData from '../../test_data/TestData.json';




test.describe('verifying the apply job functionality', () => {
  test.use({
  mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the apply job functionality', async ({ page, loginPage: _loginPage }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);
    const profilepageobj = new ProfilePage(page);
    const resumePath = path.join(process.cwd(), 'test_data', 'Resume.pdf');
   //const testData = require('../../test_data/TestData.json');


    await homepageobj.searchInput(testData.job.jobtitle);//(testData.job.jobtitle);
    await homepageobj.searchJobBtn();
    await jobDetailsobj.jobCard();
    console.log(testData.job.jobtitle);
    await jobDetailsobj.selectPosition(testData.job.position);//(testData.job.position);
    // await expect(page.getByRole('checkbox', { name: 'Brush Painters' })).toBeChecked();
    
    await jobDetailsobj.clickintialApply();
    await jobDetailsobj.uploadNewCv();
    await jobDetailsobj.chooseCV(resumePath);

    await jobDetailsobj.uploadBtn();
    // await expect(
    //page.getByText('Files have been uploaded securely')
    //).toBeVisible(({ timeout: 15000 }));
    await jobDetailsobj.clickFinalApply();
    await page.waitForLoadState('domcontentloaded');
    await profilepageobj.clickProfileBtn('apple review team');
    await page.waitForLoadState('domcontentloaded');
    await profilepageobj.jobHeaderclick();
    await profilepageobj.openAppliedJobs();
  });
});
