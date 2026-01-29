import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class TestTradeCentre extends BasePage {
  private readonly tradeTest;
  private readonly stateCityDropdowmEle;
  private readonly centreName;
  private readonly viewDetail;
  private readonly pagepath = '/trade';

  constructor(page: Page) {
    super(page);
    this.tradeTest = page.getByRole('link', { name: 'Trade Test Centers' });

    // Ensure your constructor uses a more robust locator for the dropdown if possible
    this.stateCityDropdowmEle = page.locator('div').filter({ hasText: /^Select State & City$/ });

    this.centreName = page.locator('.TradeTestCenters_tradeSection__fgvAV');
    this.viewDetail = page.getByRole('button', { name: 'View Details' });
  }
  public async navigateToPage(): Promise<void> {
    await this.navigate(this.pagepath);
  }
  public async clickTradetestctn() {
    await this.tradeTest.click();
  }
  public async testCentrename() {
    await this.centreName.first().click();
  }
  public async viewDetails() {
    await this.viewDetail.first().click();
  }

  public async selectStateCity(stateValue: string, cityValue: string) {
    await this.nestedDropdown(this.stateCityDropdowmEle.last(), stateValue, cityValue);
  }
}
