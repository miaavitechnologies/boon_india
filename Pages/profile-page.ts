import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProfilePage extends BasePage {
  private readonly profileBtn;
  private readonly jobstab;
  private readonly appliedjobs;
  private readonly savedjobs;
  private readonly logoutbtn;

  constructor(page: Page) {
    super(page);

    // Static locators that don't change

    this.jobstab = page.getByRole('link', { name: 'Jobs' });
    this.profileBtn = this.page.locator('.profile-card').first().getByRole('button');

    this.appliedjobs = page.getByText('Applied');
    this.savedjobs = page.getByText('Saved');
    this.logoutbtn = page.getByRole('link', { name: 'Logout' });
  }

  public async openProfile() {
    await this.profileBtn.click();
  }
  public async clickProfileBtn(teamName: string) {
    await this.page.getByRole('button', { name: teamName }).click();
  }

  public async jobHeaderclick() {
    await this.jobstab.nth(1).click();
  }
  public async openAppliedJobs() {
    await this.appliedjobs.click();
  }

  public async savedJobs() {
    await this.savedjobs.click();
  }

  public async logOutBtn(): Promise<void> {
    await this.logoutbtn.click();
  }
}
