import { Page } from "./basePage";
let phoneName = '';
/**
 * sub page containing specific selectors and methods for a specific page 
*/
export class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get signInLink(): Promise<WebdriverIO.Element> {
    return $('#signin')
  }

  get ordersLink(): Promise<WebdriverIO.Element> {
    return $('#orders')
  }

  get iPhoneXSElement(): Promise<WebdriverIO.Element> {
    return $("//p[text() = 'iPhone XS']/../div[@class = 'shelf-item__buy-btn']")
  }

  get phonesBuyButton(): Promise<WebdriverIO.Element> {
    return $("//p[text() = '" + phoneName + "']/../div[@class = 'shelf-item__buy-btn']")
  }

  get cartCloseButton(): Promise<WebdriverIO.Element> {
    return $('.float-cart__close-btn')
  }

  get buyButton(): Promise<WebdriverIO.Element> {
    return $('.buy-btn')
  }

  async navigateToSignIn(): Promise<void> {
    const signIn = await this.signInLink;
    await signIn.click();
  }

  async navigateToOrders(): Promise<void> {
    const orderLink = await this.ordersLink;
    await orderLink.click();
  }

  async selectPhone(phoneToSelect: string): Promise<void> {
    phoneName = phoneToSelect;
    const buyPhoneButton = await this.phonesBuyButton;
    await buyPhoneButton.click();
  }

  async closeCartModal(): Promise<void> {
    const closeCartButton = await this.cartCloseButton;
    await closeCartButton.click();
  }

  async clickBuyButton(): Promise<void> {
    const buyButtonElement = await this.buyButton;
    await buyButtonElement.waitForClickable();
    await buyButtonElement.click();
  }

  async open(): Promise<string> {
    return await super.open('');
  }
}
