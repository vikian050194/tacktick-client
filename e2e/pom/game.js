import { BasePage, BasePOM } from "./base.js";
// import { ModalPopup } from "./modal.js";

const URL = "http://localhost:8000";

class ArenaPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        this.root = page.locator("#arena");
    }

    async visible() {
        await this.expect(this.root).toBeVisible();
    }

    async hidden() {
        await this.expect(this.root).toBeHidden();
    }
}

class ActionsPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

    }
}

class UserPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

    }
}

class UsersListPOM extends BasePOM {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

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
        this.usersList = new UsersListPOM(page);
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