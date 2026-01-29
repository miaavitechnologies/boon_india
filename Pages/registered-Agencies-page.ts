import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class RegisteredAgency extends BasePage {
  private readonly expallagencybtn;
  private readonly selectstatecity;
  //private readonly jobdetail;
  //private readonly findjobs;
  private readonly selectagency;
  private readonly viewjob;
  private readonly pagepath = '/agency';

  constructor(page: Page) {
    super(page);

    this.expallagencybtn = page.getByRole('link', { name: 'explore all Industries' });
    this.selectstatecity = page
      .locator('#select-container div')
      .filter({ hasText: /^Select State & City$/ });
    this.selectagency = page.locator(
      "//div[@class='Agencies_agencySection__cDK6U border-bottom card-body']"
    );
    //this.selectstatecity=page.locator('div').filter({ hasText: /^Select State & City$/ });
    //this.selectstatecity = page.locator('span').filter({ hasText: /^Select State & City$/ });
    //this.selectstatecity = page.locator("div:has(span)",).filter({ hasText: /Select State\s*&\s*City/i });
    this.viewjob = page.getByRole('button', { name: 'View Job' });
  }
  public async navigateToPage(): Promise<void> {
    await this.navigate(this.pagepath);
  }

  public async clickExploreAgencies() {
    await this.expallagencybtn.click();
    // await this.page.waitForURL('**/agency', { timeout: 10000 });
  }
  public async selectstateCity(stateValue: string, cityValue: string) {
    await this.nestedDropdown(this.selectstatecity, stateValue, cityValue);
  }

  public async selectAgency() {
    await this.selectagency.first().click();
  }
  public async viewJobBtn() {
    await this.viewjob.first().click();
  }
}
