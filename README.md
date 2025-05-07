# Playwright locators from Serenity/JS

This was forked from <https://github.com/serenity-js/serenity-js-playwright-test-template>, q.v.

This repo demonstrates how it's possible to use Playwright's powerful accessibility-based locators (e.g. <https://playwright.dev/docs/locators#locate-by-label>) from the Serenity/JS ScreenPlay pattern.

It does involve creating CSS selectors based on internal features of Playwright, but there doesn't seem to be much in the way of alternatives to that right now.

## Usage

1. Clone the repo.
1. `npm install` to install the repo dependencies
1. `npx playwright install` to install the Playwright browsers
1. `npm run test` to run the tests

    - The last phase of this, which uses Serenity BDD tooling to generate an HTML report, will fail if you don't have a Java runtime to hand. But that doesn't matter.
