import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AddOns extends BasePage {
  private readonly takamol;
  private readonly qvc;
  private readonly tasheer;
  private readonly selectCountry;
  private readonly pagePath = '/';

  constructor(page: Page) {
    super(page);
    this.takamol = page.getByRole('link', { name: /Takamol/i });
    this.qvc = page.getByRole('link', { name: /QVC/i });
    this.tasheer = page.getByRole('link', { name: /Tasheer/i });
    this.selectCountry = page.getByRole('textbox');
  }

  public async navigateToPage(): Promise<void> {
    await this.navigate(this.pagePath);
  }

  public async openTakamolAndReturn(): Promise<void> {
    const homePage = this.page;

    const [takamolPage] = await Promise.all([
      homePage.waitForEvent('popup'),
      this.scrollToClick(this.takamol),
    ]);

    await takamolPage.waitForLoadState();

    // Perform required actions here (if any)

    await takamolPage.close();

    // Back to homepage
    await homePage.bringToFront();
    await homePage.waitForLoadState();
  }

  public async openqvcAndReturn(): Promise<void> {
    const homePage = this.page;

    const [qvcPage] = await Promise.all([
      homePage.waitForEvent('popup'),
      this.scrollToClick(this.qvc),
    ]);

    await qvcPage.waitForLoadState('domcontentloaded');

    const selectLanguagee = qvcPage.getByPlaceholder('-- Select Language --');

    await selectLanguagee.click();

    await qvcPage.close();
    await homePage.bringToFront();
    await homePage.waitForLoadState('domcontentloaded');
  }

  public async opentasheerAndReturn(): Promise<void> {
    const homePage = this.page;
    const [tasheerPage] = await Promise.all([
      homePage.waitForEvent('popup'),
      this.scrollToClick(this.tasheer),
    ]);

    await tasheerPage.waitForLoadState('domcontentloaded');
    const selectCountry = tasheerPage.getByRole('textbox');
    await selectCountry.click();

    await tasheerPage.waitForLoadState();
    await tasheerPage.close();
    // Back to homepage
    await homePage.bringToFront();
    await homePage.waitForLoadState();
  }
}
