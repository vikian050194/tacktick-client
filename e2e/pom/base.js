import { expect } from "../fixtures.js";

export class BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.expect = expect;
    }
}

export class TextOption extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.locator = page;
    }

    async hasValue(value) {
        await this.expect(this.locator).toContainText(value);
    }
}

export class ButtonPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page, locator) {
        super(page);

        this.locator = page.locator(locator);
    }

    async click() {
        await this.locator.click();
    }

    async hasValue(value) {
        await this.expect(this.locator).toHaveValue(value);
    }

    async visible() {
        await this.expect(this.locator).toBeVisible();
    }

    async hidden() {
        await this.expect(this.locator).toBeHidden();
    }
}

export class BasePage extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
    }

    async reload() {
        await this.page.reload();
    }

    async close() {
        await this.page.close();
    }
}