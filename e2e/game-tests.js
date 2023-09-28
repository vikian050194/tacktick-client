import { test } from "./fixtures.js";
import { GamePage } from "./pom/index.js";

test.describe("Game", () => {
    test("Single", async ({ page }) => {
        // Arrange
        const pom = new GamePage(page);

        // Act
        // await pom.goto();
        await pom.reload();

        // Assert
        await pom.arena.visible();
    });
});