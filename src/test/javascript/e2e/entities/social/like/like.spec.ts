/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LikeComponentsPage, LikeDeleteDialog, LikeUpdatePage } from './like.page-object';

const expect = chai.expect;

describe('Like e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let likeUpdatePage: LikeUpdatePage;
  let likeComponentsPage: LikeComponentsPage;
  /*let likeDeleteDialog: LikeDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Likes', async () => {
    await navBarPage.goToEntity('like');
    likeComponentsPage = new LikeComponentsPage();
    await browser.wait(ec.visibilityOf(likeComponentsPage.title), 5000);
    expect(await likeComponentsPage.getTitle()).to.eq('gatewayApp.socialLike.home.title');
  });

  it('should load create Like page', async () => {
    await likeComponentsPage.clickOnCreateButton();
    likeUpdatePage = new LikeUpdatePage();
    expect(await likeUpdatePage.getPageTitle()).to.eq('gatewayApp.socialLike.home.createOrEditLabel');
    await likeUpdatePage.cancel();
  });

  /* it('should create and save Likes', async () => {
        const nbButtonsBeforeCreate = await likeComponentsPage.countDeleteButtons();

        await likeComponentsPage.clickOnCreateButton();
        await promise.all([
            likeUpdatePage.setUserInput('user'),
            likeUpdatePage.postSelectLastOption(),
        ]);
        expect(await likeUpdatePage.getUserInput()).to.eq('user', 'Expected User value to be equals to user');
        await likeUpdatePage.save();
        expect(await likeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await likeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Like', async () => {
        const nbButtonsBeforeDelete = await likeComponentsPage.countDeleteButtons();
        await likeComponentsPage.clickOnLastDeleteButton();

        likeDeleteDialog = new LikeDeleteDialog();
        expect(await likeDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.socialLike.delete.question');
        await likeDeleteDialog.clickOnConfirmButton();

        expect(await likeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
