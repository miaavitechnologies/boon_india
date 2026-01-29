import { test } from '../fixtures/boon.fixtures';
import { TestTradeCentre } from '../Pages/testtrade-Centre-page';

test.describe('verifying the trade test centre functionality', () => {
  test.use({
    mobileNumber: '9999999999',
    otpCode: '123456',
  });

  test('verifying the trade test centre valid functionality', async ({
    page,
    loginPage: _loginPage,
  }) => {
    const tradeobj = new TestTradeCentre(page);
    await tradeobj.clickTradetestctn();
    await tradeobj.selectStateCity('Maharashtra', 'Mumbai');
    await tradeobj.testCentrename();
    await tradeobj.viewDetails();
  });
});
