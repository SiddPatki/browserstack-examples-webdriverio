import { expect } from "chai";
import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class ConfirmationPage extends Page {
  /**
   * define selectors using getter methods
   */
  get confirmationMessage(): Promise<WebdriverIO.Element> {
    return $('#confirmation-message')
  }

  get continueShoppingButton(): Promise<WebdriverIO.Element> {
    return $('div.continueButtonContainer button')
  }
  get downloadPDFLink(): Promise<WebdriverIO.Element> {
    return $('#downloadpdf');
  }

  async clickContinueShoppingButton(): Promise<void> {
    const continueButton = await this.continueShoppingButton;
    await continueButton.click();
  }

  async waitForConfirmationToBeDisplayed(): Promise<void> {
    const confirmMessage =  await this.confirmationMessage;
    await confirmMessage.waitForDisplayed({ timeout: 10000 });
  }

  async clickDownloadPdf(): Promise<void> {
    (await this.downloadPDFLink).click();
  }

  async downloadedFileExists(): Promise<unknown> {
    await browser.pause(2000);
    const fileExists = await browser.execute('browserstack_executor: {"action": "fileExists"}');
    typeof fileExists === 'string'
      ? fileExists : ''      
    return await fileExists;
  }

}
