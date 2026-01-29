import { test } from '../../fixtures/boon.fixtures';
import { HomePage } from '../../Pages/homePage';
import { JobDetailsPage } from '../../Pages/Jobdetails/jobdetailspage';
import { ProfilePage } from '../../Pages/profile-page';
import path from 'path';

test.describe('verifying the top hiring functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying top apply hiring functionality', async ({ page, loginPage: _loginPage }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);
    const profilepageobj = new ProfilePage(page);

    const resumePath = path.join(process.cwd(), 'test_data', 'Resume.pdf');

    //const country = 'Kuwait';
    //const positionName = 'Continental Cook';

    await homepageobj.tophiringLocations('UAE');
    await homepageobj.clickViewJobsForCountry('UAE');
    await jobDetailsobj.jobCard();
    await jobDetailsobj.selectPositiontophiring();
    //await expect(page.getByRole('checkbox', { name: 'Mechanical Engineer' })).toBeChecked();
    //await jobDetailsobj.saveJobClick();
    //await expect(page.getByText('Job saved successfully!')).toBeVisible();
    await jobDetailsobj.clickintialApply();
    // await expect(page.getByRole('dialog').getByRole('button', { name: 'Easy Apply' })).toBeEnabled();
    await jobDetailsobj.uploadNewCv();
    await jobDetailsobj.chooseCV(resumePath);

    await jobDetailsobj.uploadBtn();
    //await expect(page.getByText('Files have been uploaded securely') ).toBeVisible();
    await jobDetailsobj.clickFinalApply();
    //await expect( page.getByText('Congratulations! Your application has been submitted')).toBeVisible();

    await profilepageobj.clickProfileBtn('apple review team');
    await profilepageobj.jobHeaderclick();
    await profilepageobj.openAppliedJobs();
    // await profilepageobj.clickFirstAppliedJob();

    //const appliedTitle = await profilepageobj.clickFirstAppliedJobAndGetTitle();
    // console.log('Applied Job Position:', appliedTitle);

    //await profilepageobj.appliedJobs();
    //await profilepageobj.appliedJobs();
    //await profilepageobj.profileButton(); // reopen profile menu
    //await profilepageobj.logOutBtn();
  });
});
