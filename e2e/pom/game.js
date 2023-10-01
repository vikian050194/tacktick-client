import { BasePage, BasePOM, ButtonPOM } from "./base.js";
// import { ModalPopup } from "./modal.js";

const URL = "http://localhost:8000";

class ArenaPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.root = page.locator("#arena");
        this.walls = this.root.locator(".wall");
    }

    async visible() {
        await this.expect(this.root).toBeVisible();
    }

    async hidden() {
        await this.expect(this.root).toBeHidden();
    }

    async wallsCount(n) {
        await this.expect(this.walls).toHaveCount(n);
    }

    async classAt(x, y, cls) {
        await this.expect(this.root.locator(`[x="${x}"][y="${y}"]`)).toHaveClass(new RegExp(cls));
    }
}

class ActionsPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.root = page.locator("#actions");
        this.items = this.root.locator(".action");
    }

    async visible() {
        await this.expect(this.root).toBeVisible();
    }

    async hidden() {
        await this.expect(this.root).toBeHidden();
    }

    async count(n) {
        await this.expect(this.items).toHaveCount(n);
    }

    async valueAt(index, value) {
        await this.expect(this.items.nth(index)).toHaveText(value);
    }
}

class UserPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.root = page.locator("#user");
        this.join = new ButtonPOM(this.root, ".join");
        this.leave = new ButtonPOM(this.root, ".leave");
    }

    async visible() {
        await this.expect(this.root).toBeVisible();
    }

    async hidden() {
        await this.expect(this.root).toBeHidden();
    }
}

class UsersListPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.root = page.locator("#users");
        this.items = this.root.locator(".list .user");
    }

    async visible() {
        await this.expect(this.root).toBeVisible();
    }

    async hidden() {
        await this.expect(this.root).toBeHidden();
    }

    async count(n) {
        await this.expect(this.items).toHaveCount(n);
    }

    async valueAt(index, value) {
        await this.expect(this.items.nth(index)).toHaveText(value);
    }

    async classAt(index, cls) {
        await this.expect(this.items.nth(index)).toHaveClass(new RegExp(cls));
    }
}

export class GamePage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.arena = new ArenaPOM(page);
        this.actions = new ActionsPOM(page);
        this.users = new UsersListPOM(page);
        this.user = new UserPOM(page);

        // this.modal = new ModalPopup(page);
    }

    async goto(params = {}) {
        let q = "";
        for (const key in params) {
            const value = params[key];
            if (value !== null) {
                q += `${key}=${value}`;
            }
        }
        await this.page.goto(`${URL}/${q ? "?" + q : ""}`);
    }
}