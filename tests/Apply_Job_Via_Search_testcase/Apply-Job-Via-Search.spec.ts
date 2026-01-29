import { test } from '../../fixtures/boon.fixtures';
import { HomePage } from '../../Pages/homePage';
import { JobDetailsPage } from '../../Pages/Jobdetails/jobdetailspage';
import path from 'path';
import { ProfilePage } from '../../Pages/profile-page';

test.describe('verifying the apply job functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the apply job functionality', async ({ page, loginPage: _loginPage }) => {
    const homepageobj = new HomePage(page);
    const jobDetailsobj = new JobDetailsPage(page);
    const profilepageobj = new ProfilePage(page);

    const resumePath = path.join(process.cwd(), 'test_data', 'Resume.pdf');

    await homepageobj.searchInput('Plumber');
    await homepageobj.searchJobBtn();
    await jobDetailsobj.jobCard();
    await jobDetailsobj.selectPosition('Plumber');
    // await expect(page.getByRole('checkbox', { name: 'Brush Painters' })).toBeChecked();
    //await jobDetailsobj.saveJobClick();
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
