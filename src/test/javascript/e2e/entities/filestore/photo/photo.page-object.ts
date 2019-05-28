import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PhotoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-photo div table .btn-danger'));
  title = element.all(by.css('jhi-photo div h2#page-heading span')).first();

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

export class PhotoUpdatePage {
  pageTitle = element(by.id('jhi-photo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contentInput = element(by.id('file_content'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
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

export class PhotoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-photo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-photo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
