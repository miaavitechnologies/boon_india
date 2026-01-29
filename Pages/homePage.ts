import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  private readonly searchInpu;
  private readonly searchjobbtn;

  private readonly viewJobsTopHiring;
  private readonly hiringLocation;
  //scrollIntoViewIfNeeded: any;

  constructor(page: Page) {
    super(page);

    // Static locators that don't change
    this.searchInpu = page.getByPlaceholder('Enter Job Title');

    // this.searchjobbtn= page.locator('//span[text()=\'Search jobs\']');
    this.searchjobbtn = page.getByRole('button', { name: /search jobs/i });
    this.hiringLocation = page.locator("//div[@class='location-card__title']");
    this.viewJobsTopHiring = page.locator("//div[@class='location-card__button-text']");
  }

  public async searchInput(value: string) {
    await this.searchInpu.fill(value);
  }
  public async searchJobBtn() {
    await this.searchjobbtn.click();
  }

  public async tophiringLocations(title: string) {
    await this.selectTopHiringLocation(this.hiringLocation, title);
  }

  /*public async viewJonButon(value: string){
    await this.selectViewJobBtn(this.viewJobsTopHiring , value)
  }*/
  public async clickViewJobsForCountry(country: string) {
    const count = await this.hiringLocation.count();

    for (let i = 0; i < count; i++) {
      const titleText = await this.hiringLocation.nth(i).innerText();

      if (titleText.trim().toLowerCase().includes(country.toLowerCase())) {
        //✅ Click View Jobs at SAME index
        await this.viewJobsTopHiring.nth(i).click();
        return;
      }
    }
  }
}
