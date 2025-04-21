//THIS IS SECOND FILE
import { Locator, Page, expect } from "@playwright/test";

import { BasePage } from "../pages/base";
import axios from "axios";

export class Utilities extends BasePage {
  page: Page;
  durationInput: Locator;
  durationInputEdit: Locator;
  readonly SIXTY_SECONDS = 60 * 1000;
  readonly THIRTY_SECONDS = 30 * 1000;
  readonly TEN_SECONDS = 10 * 1000;
  readonly UPLOADS_PATH = 'test-files/uploads/';


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.durationInput = this.page?.locator('ticket-duration input');
    this.durationInputEdit = this.page?.locator('ticket-duration input').nth(1);
  }

  public async tabMenuItem(linkName: string) {
    await this.page.getByRole('tab', { name: linkName }).click({ timeout: 30000 });
  }
  public async tabMenuItem(linkName: string) {
    console.log("TEST")
    await this.page.getByRole('tab', { name: linkName }).click({ timeout: 30000 });
  }
  formatDateToExpectedFormat(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

}
