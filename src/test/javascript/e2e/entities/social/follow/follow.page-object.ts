import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class FollowComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-follow div table .btn-danger'));
  title = element.all(by.css('jhi-follow div h2#page-heading span')).first();

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

export class FollowUpdatePage {
  pageTitle = element(by.id('jhi-follow-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  userInput = element(by.id('field_user'));
  followingInput = element(by.id('field_following'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUserInput(user) {
    await this.userInput.sendKeys(user);
  }

  async getUserInput() {
    return await this.userInput.getAttribute('value');
  }

  async setFollowingInput(following) {
    await this.followingInput.sendKeys(following);
  }

  async getFollowingInput() {
    return await this.followingInput.getAttribute('value');
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

export class FollowDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-follow-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-follow'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
