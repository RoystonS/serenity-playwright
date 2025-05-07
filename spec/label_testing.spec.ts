import { Ensure, equals } from "@serenity-js/assertions";
import { Actor, Cast, Task, the } from "@serenity-js/core";
import { describe, it, test } from "@serenity-js/playwright-test";
import { Browser } from "@playwright/test";
import { BrowseTheWebWithPlaywright } from "@serenity-js/playwright";
import { Navigate, Page } from "@serenity-js/web";
import { calculationResult, driveCalculator, enterField1, field1Value } from "./test-form-app/MainPage";

class FormPageActors implements Cast {
  constructor(private readonly browser: Browser) {}

  prepare(actor: Actor): Actor {
    return actor.whoCan(BrowseTheWebWithPlaywright.using(this.browser));
  }
}

describe("Label Testing", () => {
  test.use({
    actors: async ({ browser }, use) => {
      await use(new FormPageActors(browser));
    },
    baseURL: "https://serenity.shufflebotham.org/index.html",
  });

  describe("test-form", () => {
    it("works", async ({ actorCalled }) => {
      await actorCalled("Alice").attemptsTo(
        startWithEmptyForm(),
        observesThatFieldsDriveEachOther(),
        driveCalculator(4.5, 3.7),
        Ensure.that(calculationResult(), equals("8.2"))
      );
    });
  });
});

export const startWithEmptyForm = () =>
  Task.where(
    the`#actor starts with an empty form`,
    Navigate.to("/"),
    Ensure.that(Page.current().title().describedAs("website title"), equals("Test form page"))
  );

export const observesThatFieldsDriveEachOther = () =>
  Task.where(
    the`#actor observes that fields drive each other`,
    enterField1("some text"),
    Ensure.that(field1Value(), equals("some text"))
  );
