import { test as base, expect as exp, chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const PWD = process.env.PWD;
const URL = "http://localhost:8000/";

export const test = base.extend({
    // eslint-disable-next-line no-empty-pattern
    context: async ({ }, use,) => {
        const context = await chromium.launch({
            headless: false,
            slowMo: 100,
            args: [
                "--start-maximized"
            ]
        });

        await use(context);
        await context.close();
    },
    // eslint-disable-next-line no-empty-pattern
    page: async ({ page }, use, testInfo) => {
        // requests interception
        console.log(testInfo.title);
        console.log(testInfo.titlePath);

        const [fileName, ...tail] = testInfo.titlePath;

        console.info(fileName);

        const endpoints = ["arena"];
        for (const endpoint of endpoints) {
            const pathToData = path.join(PWD, "e2e", "mocks", ...tail.map(t => t.toLowerCase()), `${endpoint}.json`);
            const pathToDatas = path.join(PWD, "e2e", "mocks", ...tail.map(t => t.toLowerCase()), endpoint);

            const mocks = [];

            if (fs.existsSync(pathToData)) {
                const content = fs.readFileSync(pathToData);
                mocks.push(JSON.parse(content));
            }
            if (fs.existsSync(pathToDatas)) {
                for (let index = 0; ; index++) {
                    const pathToMock = path.join(PWD, "e2e", "mocks", ...tail.map(t => t.toLowerCase()), endpoint, `${index}.json`);
                    if (fs.existsSync(pathToMock)) {
                        const content = fs.readFileSync(pathToMock);
                        mocks.push(JSON.parse(content));
                    } else {
                        break;
                    }
                }
            }

            // TODO or use default if marked
            if (mocks.length === 0) {
                continue;
            }

            let index = 0;

            await page.route(`*/**/api/${endpoint}`, async route => {
                const mock = mocks[index];
                index++;
                if (index === mocks.length) {
                    index = 0;
                }
                const { data, statusCode } = mock;

                console.info(endpoint);
                console.info(index);
                console.info(statusCode);
                console.info(JSON.stringify(data));

                await route.fulfill({ json: data, status: statusCode });
            });
        }

        // default navigation
        await page.goto(URL);

        // pass page to test
        await use(page);
    }
});

export const expect = exp;

// export const timeout = 1000;