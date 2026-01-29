import { Page, Locator } from '@playwright/test';

export class CommonActions {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ---------------- UPLOAD CV ---------------- */
  public async uploadCV(cvPath: string): Promise<void> {
    await this.page.getByText('click here').click();
    await this.page.locator('input[type="file"]').setInputFiles(cvPath);
    await this.page.getByRole('button', { name: 'Upload' }).click();
  }

  /* ---------------- LOGOUT ---------------- */
  public async logout(userName: string): Promise<void> {
    await this.page.getByRole('button', { name: userName }).click();
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  /* ---------------- SCROLL TO CLICK ---------------- */
  public async scrollToClick(eleLocator: Locator): Promise<void> {
    await eleLocator.scrollIntoViewIfNeeded();
    await eleLocator.click();
  }

  public async selectTopHiringLocation(_eleLocator: Locator, value: string): Promise<void> {
    const option = this.page.locator(`//*[text()='${value}']`);
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
  }

  public async selectViewJobBtn(_eleLocator: Locator, value: string): Promise<void> {
    const option = this.page.locator(`//*[text()='${value}']`);
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
  }

  public async selectFromDivDropDown(eleLocator: Locator, value: string): Promise<void> {
    await eleLocator.click();
    const option = this.page.locator(`//*[text()='${value}']`);
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
  }

  public async nestedDropdown(dropdownEle: Locator, value1: string, value2: string): Promise<void> {
    await dropdownEle.waitFor({ state: 'visible', timeout: 5000 });
    await dropdownEle.click();
    const clickItem = async (text: string) => {
      const item = this.page.locator(`//*[text()="${text}"]`).first();
      await item.waitFor({ state: 'visible', timeout: 5000 });
      await item.scrollIntoViewIfNeeded();
      await item.click();
    };
    await clickItem(value1);
    const secondItem = this.page.locator(`//*[text()="${value2}"]`).first();
    await secondItem.waitFor({ state: 'visible', timeout: 5000 });
    await clickItem(value2);
  }

  public async getElementCount(locatorValue: Locator): Promise<number> {
    return await locatorValue.count();
  }
}
