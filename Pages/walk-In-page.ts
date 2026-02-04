import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class Walkin extends BasePage {
  private readonly viewWalkIn;
  private readonly searchjobtitlee;
  private readonly selectCountry;

  private readonly findJob;
  private readonly jobCard;
  private readonly saveWalkinn;
  private readonly pagepath = '/';

  constructor(page: Page) {
    super(page);
    this.viewWalkIn = page.locator("//span[text()='View Walk-Ins']");
    //this.viewWalkInBtn = page.getByRole('button', { name: 'View Walk-Ins' });
    // this.viewWalkIn = page.getByText('View Walk-Ins').first();

    this.searchjobtitlee = page.getByRole('textbox', { name: 'Search job title' });

    this.selectCountry = page.locator('div').filter({ hasText: /^All$/ });

    this.findJob = page.getByRole('button', { name: 'Find Jobs' });

    this.jobCard = page.locator("div[class*='Card_cardCol']"); //("(//div[@class='Card_cardCol__8j2SL col-xl-3 col-lg-4 col-md-6'])[1]")

    // this.jobcard = page.locator('div[class*="Card_cardCol"]').first();
    this.saveWalkinn = page.getByRole('button', { name: 'Save walkin' });
  }
  public async navigateToPage(): Promise<void> {
    await this.navigate(this.pagepath);
  }

  public async clickviewwalkin(): Promise<void> {
    // await this.scrollToClick(this.ViewWalkIn)
    await this.viewWalkIn.click();
  }
  public async searchJobTitle(title: string): Promise<void> {
    await this.searchjobtitlee.fill(title);
  }

  public async selecttCountry(value: string): Promise<void> {
    await this.selectFromDivDropDown(this.selectCountry.nth(3), value);//nth(3)
  }

  public async findJobs(): Promise<void> {
    await this.findJob.click();
  }
  public async clickjobcard(): Promise<void> {
    await this.jobCard.nth(1).click();
  }

  public async clicksavewalkin(): Promise<void> {
    await this.saveWalkinn.click();
  }
}
