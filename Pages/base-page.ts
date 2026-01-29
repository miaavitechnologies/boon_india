import { Page } from '@playwright/test';
import { CommonActions } from '../utils/common-actions';

export const DEFAULT_BASE_URL = 'https://www.boonindia.ai';

/**
 * Interface for pages that support navigation.
 * Useful for test doubles and type clarity.
 */
export interface INavigatable {
  navigate(path?: string): Promise<void>;
}

/**
 * Abstract base page providing shared navigation.
 * Uses explicit absolute URLs so navigation works reliably in all contexts.
 */
export abstract class BasePage extends CommonActions implements INavigatable {
  protected readonly baseURL: string;

  constructor(page: Page, baseURL = DEFAULT_BASE_URL) {
    super(page);
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  /**
   * Navigate to a path. Uses full URL (baseURL + path) so the browser always receives an absolute URL.
   * Use '/' for home.
   */
  public async navigate(path = '/'): Promise<void> {
    const url = path.startsWith('http')
      ? path
      : `${this.baseURL}${path.startsWith('/') ? path : '/' + path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}

/**
 * Page Factory helper to create page instances. Centralizes page creation for tests.
 */
export function createPage<T extends BasePage>(PageClass: new (page: Page) => T, page: Page): T {
  return new PageClass(page);
}
