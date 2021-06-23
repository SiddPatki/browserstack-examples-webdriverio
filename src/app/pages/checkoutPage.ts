import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class CheckoutPage extends Page {
  /**
   * define selectors using getter methods
   */
  get firstNameInput(): Promise<WebdriverIO.Element> {
    return $('#firstNameInput')
  }

  get lastNameInput(): Promise<WebdriverIO.Element> {
    return $('#lastNameInput')
  }

  get addressLine1Input(): Promise<WebdriverIO.Element> {
    return $('#addressLine1Input')
  }

  get provinceInput(): Promise<WebdriverIO.Element> {
    return $('#provinceInput')
  }

  get postCodeInput(): Promise<WebdriverIO.Element> {
    return $('#postCodeInput')
  }

  get checkoutShippingContinue(): Promise<WebdriverIO.Element> {
    return $('#checkout-shipping-continue')
  }

  async enterFirstName(firstName: string): Promise<void> {
    const firstNameField = await this.firstNameInput;
    await firstNameField.setValue(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    const lastNameField = await this.lastNameInput;
    await lastNameField.setValue(lastName);
  }

  async enterAddressLine1(addressLine1: string): Promise<void> {
    const addressField = await this.addressLine1Input;
    await addressField.setValue(addressLine1);
  }

  async enterProvince(province: string): Promise<void> {
    const provinceField = await this.provinceInput;
    await provinceField.setValue(province);
  }

  async enterPostCode(postCode: string): Promise<void> {
    const postCodeField = await this.postCodeInput;
    await postCodeField.setValue(postCode);
  }

  async clickSubmit(): Promise<void> {
    const checkoutShippingContinueButton = await this.checkoutShippingContinue;
    await checkoutShippingContinueButton.click();
  }

  async open(): Promise<string> {
    return await super.open('');
  }
}
