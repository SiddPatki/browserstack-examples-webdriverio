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

  async clickContinueShoppingButton(): Promise<void> {
    const continueButton = await this.continueShoppingButton;
    await continueButton.click();
  }

  async waitForConfirmationToBeDisplayed(): Promise<void> {
    const confirmMessage =  await this.confirmationMessage;
    await confirmMessage.waitForDisplayed({ timeout: 10000 });
  }

}
