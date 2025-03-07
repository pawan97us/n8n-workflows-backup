test('This is the test name', {
    tag: ['@Team-3','@Product-SalesOs','@Component-tags','@Component-filter','@TestingLayer-e2e','@Manual'],
    annotation:[
        { type: 'DD_TAGS[skip_reason]', description: 'the reason my test is being skipped'},
        { type: 'ArtifactLink', description: 'https://github.com/microsoft/playwright/issues/23180' },
        { type: 'Steps', description: `
            1. Logs in to the application using the specified user credentials
            2. Navigates to the Advanced Search tab
            3. Verifies that the URL contains the expected path (/searchV2)
            `
        }
    ]
}, async ({ page }) => {

    // use only if the test is skip
    test.skip(true, '') 
    
    // Test code
    console.log("Test code")
});
