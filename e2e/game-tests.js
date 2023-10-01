import { test } from "./fixtures.js";
import { GamePage } from "./pom/index.js";

test.describe("Game", () => {
    test("initial", async ({ page }) => {
        // Arrange
        const pom = new GamePage(page);

        // Act
        await pom.reload();

        // Assert
        await pom.arena.visible();
        await pom.actions.visible();
        await pom.user.visible();
        await pom.users.hidden();

        await pom.actions.count(4);
        await pom.actions.valueAt(0, " ");
        await pom.actions.valueAt(1, " ");
        await pom.actions.valueAt(2, " ");
        await pom.actions.valueAt(3, " ");

        await pom.arena.wallsCount(4);
        await pom.arena.classAt(1, 1, "wall");
        await pom.arena.classAt(4, 4, "wall");
        await pom.arena.classAt(1, 4, "wall");
        await pom.arena.classAt(4, 1, "wall");

        await pom.user.join.visible();
        await pom.user.leave.hidden();
    });

    test("join", async ({ page }) => {
        // Arrange
        const pom = new GamePage(page);

        // Act
        await page.waitForTimeout(1000);
        await pom.user.join.click();
        await page.waitForTimeout(1000);
        await pom.reload();

        // Assert
        await pom.arena.visible();
        await pom.actions.visible();
        await pom.user.visible();
        await pom.users.visible();

        await pom.actions.count(4);
        await pom.actions.valueAt(0, " ");
        await pom.actions.valueAt(1, " ");
        await pom.actions.valueAt(2, " ");
        await pom.actions.valueAt(3, " ");

        await pom.arena.wallsCount(4);
        await pom.arena.classAt(1, 1, "wall");
        await pom.arena.classAt(4, 4, "wall");
        await pom.arena.classAt(1, 4, "wall");
        await pom.arena.classAt(4, 1, "wall");
        await pom.arena.classAt(0, 0, "color-bg-0");

        await pom.user.join.hidden();
        await pom.user.leave.visible();

        await pom.users.count(1);
        await pom.users.valueAt(0, "🤍🤍🤍");
        await pom.users.classAt(0, "you");
        await pom.users.classAt(0, "color-bg-0");
    });

    test("first", async ({ page }) => {
        // Arrange
        const pom = new GamePage(page);

        // Act
        await page.waitForTimeout(1000);
        await pom.user.join.click();
        await page.waitForTimeout(1000);
        await pom.reload();

        // Assert
        await pom.arena.visible();
        await pom.actions.visible();
        await pom.user.visible();
        await pom.users.visible();

        await pom.actions.count(4);
        await pom.actions.valueAt(0, " ");
        await pom.actions.valueAt(1, " ");
        await pom.actions.valueAt(2, " ");
        await pom.actions.valueAt(3, " ");

        await pom.arena.wallsCount(4);
        await pom.arena.classAt(1, 1, "wall");
        await pom.arena.classAt(4, 4, "wall");
        await pom.arena.classAt(1, 4, "wall");
        await pom.arena.classAt(4, 1, "wall");
        await pom.arena.classAt(0, 0, "color-bg-0");
        await pom.arena.classAt(0, 0, "you");
        await pom.arena.classAt(5, 5, "color-bg-1");

        await pom.user.join.hidden();
        await pom.user.leave.visible();

        await pom.users.count(2);
        await pom.users.valueAt(0, "🤍🤍🤍");
        await pom.users.classAt(0, "you");
        await pom.users.classAt(0, "color-bg-0");
        await pom.users.valueAt(1, "🤍🤍🤍");
        await pom.users.classAt(1, "color-bg-1");
    });

    test("second", async ({ page }) => {
        // Arrange
        const pom = new GamePage(page);

        // Act
        await page.waitForTimeout(1000);
        await pom.user.join.click();
        await page.waitForTimeout(1000);
        await pom.reload();

        // Assert
        await pom.arena.visible();
        await pom.actions.visible();
        await pom.user.visible();
        await pom.users.visible();

        await pom.actions.count(4);
        await pom.actions.valueAt(0, " ");
        await pom.actions.valueAt(1, " ");
        await pom.actions.valueAt(2, " ");
        await pom.actions.valueAt(3, " ");

        await pom.arena.wallsCount(4);
        await pom.arena.classAt(1, 1, "wall");
        await pom.arena.classAt(4, 4, "wall");
        await pom.arena.classAt(1, 4, "wall");
        await pom.arena.classAt(4, 1, "wall");
        await pom.arena.classAt(0, 0, "color-bg-0");
        await pom.arena.classAt(5, 5, "you");
        await pom.arena.classAt(5, 5, "color-bg-1");

        await pom.user.join.hidden();
        await pom.user.leave.visible();

        await pom.users.count(2);
        await pom.users.valueAt(0, "🤍🤍🤍");
        await pom.users.classAt(0, "color-bg-0");
        await pom.users.valueAt(1, "🤍🤍🤍");
        await pom.users.classAt(1, "you");
        await pom.users.classAt(1, "color-bg-1");
    });

    test("dead", async ({ page }) => {
        // Arrange
        const pom = new GamePage(page);

        // Assert
        await pom.arena.visible();
        await pom.actions.visible();
        await pom.user.visible();
        await pom.users.visible();

        await pom.arena.classAt(0, 0, "color-bg-0");
        await pom.arena.classAt(5, 5, "color-bg-1");

        await pom.users.count(2);
        await pom.users.valueAt(0, "🤍");
        await pom.users.classAt(0, "color-bg-0");
        await pom.users.valueAt(1, "💀");
        await pom.users.classAt(1, "color-bg-1");
    });
});