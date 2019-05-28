/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PostComponentsPage, PostDeleteDialog, PostUpdatePage } from './post.page-object';

const expect = chai.expect;

describe('Post e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let postUpdatePage: PostUpdatePage;
  let postComponentsPage: PostComponentsPage;
  let postDeleteDialog: PostDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Posts', async () => {
    await navBarPage.goToEntity('post');
    postComponentsPage = new PostComponentsPage();
    await browser.wait(ec.visibilityOf(postComponentsPage.title), 5000);
    expect(await postComponentsPage.getTitle()).to.eq('gatewayApp.socialPost.home.title');
  });

  it('should load create Post page', async () => {
    await postComponentsPage.clickOnCreateButton();
    postUpdatePage = new PostUpdatePage();
    expect(await postUpdatePage.getPageTitle()).to.eq('gatewayApp.socialPost.home.createOrEditLabel');
    await postUpdatePage.cancel();
  });

  it('should create and save Posts', async () => {
    const nbButtonsBeforeCreate = await postComponentsPage.countDeleteButtons();

    await postComponentsPage.clickOnCreateButton();
    await promise.all([
      postUpdatePage.setUserInput('user'),
      postUpdatePage.setDescriptionInput('description'),
      postUpdatePage.setPhotoInput('photo'),
      postUpdatePage.setCreatedOnInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await postUpdatePage.getUserInput()).to.eq('user', 'Expected User value to be equals to user');
    expect(await postUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await postUpdatePage.getPhotoInput()).to.eq('photo', 'Expected Photo value to be equals to photo');
    expect(await postUpdatePage.getCreatedOnInput()).to.contain('2001-01-01T02:30', 'Expected createdOn value to be equals to 2000-12-31');
    await postUpdatePage.save();
    expect(await postUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Post', async () => {
    const nbButtonsBeforeDelete = await postComponentsPage.countDeleteButtons();
    await postComponentsPage.clickOnLastDeleteButton();

    postDeleteDialog = new PostDeleteDialog();
    expect(await postDeleteDialog.getDialogTitle()).to.eq('gatewayApp.socialPost.delete.question');
    await postDeleteDialog.clickOnConfirmButton();

    expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
