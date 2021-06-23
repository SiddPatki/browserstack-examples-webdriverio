import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class OrdersPage extends Page {
  /**
   * define selectors using getter methods
   */
  get allOrders(): Promise<WebdriverIO.ElementArray> {
    return $$('.order')
  }

  get firstOrder(): Promise<WebdriverIO.Element> {
    return $('.order')
  }

  async waitforOrdersToDisplay(): Promise<void> {
    const firstOrderElement = await this.firstOrder;
    await firstOrderElement.waitForDisplayed();
  }
}
