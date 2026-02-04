import { test } from '../../fixtures/boon.fixtures';
import { HomePage } from '../../Pages/homePage';
import { JobDetailsPage } from '../../Pages/Jobdetails/jobdetailspage';
import { ProfilePage } from '../../Pages/profile-page';
import path from 'path';
import testData from '../../test_data/TestData.json';

test.describe('verifying the top hiring functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying top apply hiring functionality', async ({ page, loginPage: _loginPage }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);
    const profilepageobj = new ProfilePage(page);

    const resumePath = path.join(process.cwd(), 'test_data', 'Resume.pdf');
    //const testData = require('../../test_data/TestData.json');
    
    await homepageobj.tophiringLocations(testData.job.tophiringcountry);
    await homepageobj.clickViewJobsForCountry(testData.job.viewjobcountry);
    await jobDetailsobj.jobCard();
    await jobDetailsobj.selectPositiontophiring();
    //await expect(page.getByRole('checkbox', { name: 'Mechanical Engineer' })).toBeChecked();
    //await expect(page.getByText('Job saved successfully!')).toBeVisible();
    await jobDetailsobj.clickintialApply();
    // await expect(page.getByRole('dialog').getByRole('button', { name: 'Easy Apply' })).toBeEnabled();
    await jobDetailsobj.uploadNewCv();
    await jobDetailsobj.chooseCV(resumePath);

    await jobDetailsobj.uploadBtn();
    //await expect(page.getByText('Files have been uploaded securely') ).toBeVisible();
    await jobDetailsobj.clickFinalApply();
    //await expect( page.getByText('Congratulations! Your application has been submitted')).toBeVisible();

    await profilepageobj.clickProfileBtn(testData.profile.profileName);
    await profilepageobj.jobHeaderclick();
    await profilepageobj.openAppliedJobs();
    
  });
});
