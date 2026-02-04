import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login-Logout-page';
import testData from '../test_data/TestData.json';


// 1. Define types for both your Page Objects AND your parameters
type BoonFixtures = {
  
  
  mobileNumber: string ;
  otpCode: string;
  loginPage: LoginPage;
};

// 2. Extend the base test
export const test = base.extend<BoonFixtures>({
  // Default values for parameters (can be overridden in config or test)
  mobileNumber: ['', { option: true }],
  otpCode: ['', { option: true }],

  loginPage: async ({ page, mobileNumber, otpCode }, use) => {
    // --- SETUP: Initialize and Login using parameters ---
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.openLogin();

    // Use the parameterized mobile number
    await loginPage.enterMobile(mobileNumber);
    await loginPage.enterOtp(otpCode);
    // await loginPage.verifyOtp();

    // The test runs here
    await use(loginPage);

    // --- TEARDOWN: Automatic Logout ---
    // Ensure the profile menu is clicked before logout
    await loginPage.ProfileView('Logout');
    await loginPage.logOutBtn();
  },
});

export { expect };
