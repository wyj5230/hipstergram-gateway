import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LikeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-like div table .btn-danger'));
  title = element.all(by.css('jhi-like div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class LikeUpdatePage {
  pageTitle = element(by.id('jhi-like-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  userInput = element(by.id('field_user'));
  postSelect = element(by.id('field_post'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUserInput(user) {
    await this.userInput.sendKeys(user);
  }

  async getUserInput() {
    return await this.userInput.getAttribute('value');
  }

  async postSelectLastOption(timeout?: number) {
    await this.postSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async postSelectOption(option) {
    await this.postSelect.sendKeys(option);
  }

  getPostSelect(): ElementFinder {
    return this.postSelect;
  }

  async getPostSelectedOption() {
    return await this.postSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class LikeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-like-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-like'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
