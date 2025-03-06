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

  public async clickButtonByLocator(locator: Locator) {
    await locator.click({ timeout: this.THIRTY_SECONDS });
  }

  public async clickButtonByLocator(locator: Locator) {
    await locator.click({ timeout: this.THIRTY_SECONDS });
  }

  public async doubleClickByLocator(locator: Locator) {
    await locator.dblclick({ timeout: this.THIRTY_SECONDS });
  }

  public async verifyComponentIsVisibleByText(locator: Locator, text: string) {
    await expect(locator
      .filter({ hasText: text }),`Verify '${ text }' is visible`).toBeVisible();
  }

  public async verifyListSizeIsBiggerThenAValue(list: Locator, expectedListSize: number) {
    const itemCount = await list.count();
    expect(itemCount,`Verify list size (${ itemCount }) is greater then a value (${ expectedListSize })`).toBeGreaterThan(expectedListSize);
  }

  public async setTicketDetailsDuration(size: number) {
    await this.setTextByLocator(this.durationInput, size.toString())
  }

  public async setEditTicketDetailsDuration(size: number) {
    await this.setTextByLocator(this.durationInputEdit, size.toString())
  }

  public async setTicketDetailsDurationFloat(size: string) {
    await this.setTextByLocator(this.durationInput, size.toString())
  }

  public async checkLocatorVisible(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: this.THIRTY_SECONDS });
  }

  public async setExtendedTimeout(duration: number) {
    await this.page.waitForTimeout(duration);
  }

  public async checkLocatorNotVisible(locator: Locator) {
    await expect.soft(locator).not.toBeVisible({ timeout: this.THIRTY_SECONDS });
  }

  public async setExtendedTimeout(duration: number) {
    await this.page.waitForTimeout(duration);
  }

  public async checkLocatorNotVisible(locator: Locator) {
    await expect.soft(locator).not.toBeVisible({ timeout: this.THIRTY_SECONDS });
  }
  public async setTextByLocator(locator: Locator, value: string) {
    await locator.fill(value, { timeout: this.THIRTY_SECONDS });
  }
  public async pressKeyboardKey(keyName: string) {
    await this.page.keyboard.press(keyName);
  }

  public async clickElementByAutomationId(automationId: string) {
    const elem = this.page?.locator('[automationid=' + automationId + ']');
    await this.clickButtonByLocator(elem);
  }

  public async clickElementByCSS(cssElem: string) {
    const elem = this.page?.locator('.' + cssElem);
    await this.clickButtonByLocator(elem);
  }

  public async selectNextMonthDate(daysOffset: string) {
    const elem = this.page?.locator('.mat-calendar-body-cell')
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = Number(daysOffset);
    const todayDateNum = (now.getDate() || 0) + Number(daysOffset);
    if (todayDateNum > await elem.count()) {
      const nextMonthButton = this.page?.getByLabel('Next month');
      await this.clickButtonByLocator(nextMonthButton);
      let pickDay = now.getDate() - days;
      pickDay <= 0 ? pickDay = 1 : pickDay;
      const nextMonthDate = this.page?.getByLabel(`${monthNames[now.getMonth()]} ${pickDay},`);
      await this.clickButtonByLocator(nextMonthDate);
    }
    else {
      for (let x = 0; x < await elem.count(); x++) {
        let pickDay = now.getDate() - days;
        pickDay <= 0 ? pickDay = 1 : pickDay;
        const nextMonthDate = this.page?.getByLabel(`${monthNames[now.getMonth()]} ${pickDay},`);
        await this.clickButtonByLocator(nextMonthDate);
      }
    }
  }

  public async setReportDateCurrentMonth(daysOfCurrentMonth: string) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const nextMonthDate = this.page?.getByLabel(`${monthNames[now.getMonth()]} ${Number(daysOfCurrentMonth)},`);
    await this.clickButtonByLocator(nextMonthDate);
  }

  // public async setFinishActualEndDate(){
  //   //Get selected day
  //   const elem = this.page?.locator('.mat-calendar-body-active .mat-calendar-body-cell-content');
  //   console.log(await elem.innerText());
  //   const elem2 = this.page?.locator(".mat-calendar-body-cell-container");
  // }


  public async selectMonthYear(day: string, month: string, year: string) {
    await this.clickElementByCSS('mat-calendar-period-button');
    const currYear = this.page?.locator('.mat-calendar-body-today', { hasText: year });
    await this.clickButtonByLocator(currYear);
    const currMonth = this.page?.locator('.mat-calendar-body-cell-content', { hasText: month });
    await this.clickButtonByLocator(currMonth);
    const currDay = this.page?.locator('.mat-calendar-body-cell-content', { hasText: day }).first();
    await this.clickButtonByLocator(currDay);
  }

  public async setReportStartDateEnd() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const nextMonthDate = this.page?.getByLabel(`${monthNames[now.getMonth()]} 30,`);
    await this.clickButtonByLocator(nextMonthDate);
  }
  
  public async tabMenuItem(linkName: string) {
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
