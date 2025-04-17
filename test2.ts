import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";
import { deleteCSVFile, writeCSVToFile } from "../../../utils/generic-utils";
import { ZiBundles } from "../../../src/enums/ZiBundleEnums";

test.describe('Bulk upload user using email', () => {

  test('Validate user creation using Bulk upload user flow by csv',
    { tag: ['@Sanity'] },
    async ({
             loginPage,
             onboardingPage,
             userManagementPage,
             utilities,
             bulkUsersListStatusPage,
             navigationHelper
           }) => {
      const emails = writeCSVToFile(1, 'resources/output.csv');
      await loginPage?.appLoginAdmin("s2a-connected-test-user-2");
      await onboardingPage?.verifyOnboardingPageIsDisplayed();
      await navigationHelper?.navigateToUserManagementPage();
      await utilities.clickElementWithStepDescription(userManagementPage.addUserBtn, "Click on Add user button");
      await utilities.clickElementWithStepDescription(userManagementPage.bulkAddUserLink, "Click on Bulk add user button");
      await userManagementPage?.verifyBulkAddUsersDialogDisplayed();
      await utilities.clickElementWithStepDescription(userManagementPage?.bulkAddUsersDialog?.uploadCSVButton, "Click on upload button");
      await userManagementPage?.bulkAddUsersDialog?.uploadCSVFile();
      expect(await userManagementPage?.bulkAddUsersDialog?.getMessageOnFileUploadComplete()).toEqual("File uploaded successfully.");
      await utilities.clickElementWithStepDescription(userManagementPage.bulkAddUsersDialog.nextButton, "Click on Next button on bulk add users dialog - Confirm details");
      await utilities.clickElementWithStepDescription(userManagementPage.bulkAddUsersDialog.subscriptionPlanDropDown, "Click on subscription plan dropdown");
      await userManagementPage?.bulkAddUsersDialog?.selectProductFromDropdown(ZiBundles.COPILOT_ENTERPRISE_BUNDLE);
      await userManagementPage?.bulkAddUsersDialog?.closeOverlayContainer();
      await utilities.clickElementWithStepDescription(userManagementPage.bulkAddUsersDialog.nextButton, "Click on Add Users button - Finalize step");
      expect(await utilities.getToastNotificationTitle()).toEqual("Upload Processing");
      expect(await utilities.getToastNotificationMessage()).toEqual("Go to Bulk User Uploads or click 'View Now' to check the status.");
      await utilities.closeToastNotification();
      await navigationHelper?.navigateToBulkUsersUploadPage();
      await bulkUsersListStatusPage?.waitUntilListIsProcessed();
      await navigationHelper?.navigateToUserManagementPage();
      await userManagementPage?.searchForUserUsingSearchInput(emails[0]);
      await userManagementPage?.verifyUserIsFoundOnUserManagementPage(emails[0]);
      await userManagementPage?.selectFirstDisplayedUser();
      await userManagementPage?.clickOnActionsMenu();
      await userManagementPage?.clickOnDeactivate();
      await userManagementPage?.deactivateUserDialog.clickOnSubmit();
    });

  test.afterEach(() => {
    deleteCSVFile('resources/output.csv');
  })
});
