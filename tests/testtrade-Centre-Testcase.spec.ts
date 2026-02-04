import { test } from '../fixtures/boon.fixtures';
import { TestTradeCentre } from '../Pages/testtrade-Centre-page';
import testData from '../test_data/TestData.json'

test.describe('verifying the trade test centre functionality', () => {
  test.use({
    mobileNumber: testData.login.mobileNumber,
    otpCode: testData.login.otpCode,
  });

  test('verifying the trade test centre valid functionality', async ({
    page,
    loginPage: _loginPage,
  }) => {
    const tradeobj = new TestTradeCentre(page);
    await tradeobj.clickTradetestctn();
    await tradeobj.selectStateCity(testData.testTradecentre.state, testData.testTradecentre.city);
    await tradeobj.testCentrename();
    await tradeobj.viewDetails();
  });
});
