import { Page } from '@playwright/test';

export async function setupLocalStorage(page: Page): Promise<void> {
  // act like user has visited the first page
  await page.addInitScript(() => {
    const main = {
      state: {
        firstVisitPage: true,
      },
      version: 0
    };
    window.localStorage.setItem('main', JSON.stringify(main));
  });
}
