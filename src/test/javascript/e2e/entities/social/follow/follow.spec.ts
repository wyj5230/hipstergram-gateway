/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { FollowComponentsPage, FollowDeleteDialog, FollowUpdatePage } from './follow.page-object';

const expect = chai.expect;

describe('Follow e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let followUpdatePage: FollowUpdatePage;
  let followComponentsPage: FollowComponentsPage;
  let followDeleteDialog: FollowDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Follows', async () => {
    await navBarPage.goToEntity('follow');
    followComponentsPage = new FollowComponentsPage();
    await browser.wait(ec.visibilityOf(followComponentsPage.title), 5000);
    expect(await followComponentsPage.getTitle()).to.eq('gatewayApp.socialFollow.home.title');
  });

  it('should load create Follow page', async () => {
    await followComponentsPage.clickOnCreateButton();
    followUpdatePage = new FollowUpdatePage();
    expect(await followUpdatePage.getPageTitle()).to.eq('gatewayApp.socialFollow.home.createOrEditLabel');
    await followUpdatePage.cancel();
  });

  it('should create and save Follows', async () => {
    const nbButtonsBeforeCreate = await followComponentsPage.countDeleteButtons();

    await followComponentsPage.clickOnCreateButton();
    await promise.all([followUpdatePage.setUserInput('user'), followUpdatePage.setFollowingInput('following')]);
    expect(await followUpdatePage.getUserInput()).to.eq('user', 'Expected User value to be equals to user');
    expect(await followUpdatePage.getFollowingInput()).to.eq('following', 'Expected Following value to be equals to following');
    await followUpdatePage.save();
    expect(await followUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await followComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Follow', async () => {
    const nbButtonsBeforeDelete = await followComponentsPage.countDeleteButtons();
    await followComponentsPage.clickOnLastDeleteButton();

    followDeleteDialog = new FollowDeleteDialog();
    expect(await followDeleteDialog.getDialogTitle()).to.eq('gatewayApp.socialFollow.delete.question');
    await followDeleteDialog.clickOnConfirmButton();

    expect(await followComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
