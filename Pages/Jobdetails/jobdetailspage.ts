import { Page } from '@playwright/test';
import path from 'path';
import { BasePage } from '../base-page';

export class JobDetailsPage extends BasePage {
  private readonly jobcard;
  private readonly position;
  //private readonly positionintophiring;
  private readonly allJobs;
  private readonly saveJobbtn;
  private readonly intialapply;
  private readonly uploadnewCv;
  private readonly chooseCv;
  private readonly upload;

  private readonly finalApplyBtn;
  private selectedPositionText!: string;
  private readonly pagepath = '/jobs';

  constructor(page: Page) {
    super(page);

    // Static locators that don't change
    // this.jobcard = page.locator("(//div[@class='Card_cardCol__8j2SL col-xl-3 col-lg-4 col-md-6'])[2]");
    this.jobcard = page.locator("div[class*='Card_cardCol']");
    this.position = page.getByRole('cell', { name: 'positionName' }).getByRole('checkbox');
    this.allJobs = page.locator('//tbody/tr');

    //div[@class='Details_positionCheckbox__5xiyp']
    // this.positionintophiring = page.locator('tr').getByRole('checkbox');
    this.saveJobbtn = page.getByRole('button', { name: 'Save Job' });
    this.intialapply = page.getByRole('button', { name: 'Easy Apply' });
    this.uploadnewCv = page.locator('div').filter({ hasText: 'Upload New CVClick Here' });
    this.chooseCv = page.locator("input[type='file']");
    this.upload = page.getByRole('button', { name: 'Upload' });

    // this.finalapply = page.getByRole('button', { name: 'Easy Apply' });
    this.finalApplyBtn = page.getByRole('dialog').getByRole('button', { name: 'Easy Apply' });
  }

  public async navigateToPage(): Promise<void> {
    await this.navigate(this.pagepath);
  }

  public async jobCard() {
    await this.jobcard.first().click();
  }
  public async selectPosition(positionName: string) {
    const row = this.page.locator('tr', { hasText: positionName });
    const checkbox = row.getByRole('checkbox');
    await checkbox.check();
    console.log(` Selected position: ${positionName}`);
  }

  //  Dynamic Top Hiring position selection
  public async selectPositionFromTopHiring(positionName: string): Promise<string> {
    const row = this.page.locator('tr', { hasText: positionName });
    await row.getByRole('checkbox').check();

    // store selected position text
    this.selectedPositionText = (await row.textContent())?.trim() || '';

    return this.selectedPositionText;
  }

  public async saveJobClick() {
    await this.saveJobbtn.click();
  }
  public async clickintialApply() {
    await this.intialapply.first().click();
  }

  public async uploadNewCv() {
    await this.uploadnewCv.nth(5).click();
  }

  public async chooseCV(file: string) {
    //  Wait for input to appear
    await this.chooseCv.waitFor({ state: 'attached' });
    const filePath = path.resolve(file);
    await this.chooseCv.setInputFiles(filePath);
  }

  public async uploadBtn() {
    await this.upload.click();
  }
  public async clickFinalApply() {
    await this.finalApplyBtn.click();
  }

  public async selectPositiontophiring(): Promise<string> {
    const rowsCount = await this.allJobs.count();

    for (let i = 0; i < rowsCount; i++) {
      const row = this.allJobs.nth(i);
      const checkbox = row.getByRole('checkbox');

      // Skip if checkbox not present
      if (!(await checkbox.count())) continue;

      // Skip disabled positions
      if (await checkbox.isDisabled()) {
        console.log(` Position ${i} is disabled, skipping`);
        continue;
      }

      // Skip already checked
      if (await checkbox.isChecked()) {
        console.log(` Position ${i} already checked, skipping`);
        continue;
      }

      // Capture position name
      const positionName = (await row.innerText()).trim();
      // Select checkbox
      await checkbox.check();
      console.log(` Selected position: ${positionName}`);

      // Return selected position for later validation
      return positionName;
    }

    throw new Error(' No enabled positions found to apply');
  }
}
