import {Coords, KeyboardKeySet, SelBot, SelCore} from "./bot-declaration";
import {pollUntil} from "../util";

export class WebBot {
    private bot: SelBot;
    private core: SelCore;
    private window: Window;
    private constructor() {}

    public static createDummy(): WebBot {
        return new WebBot();
    }

    public static create(): Promise<WebBot> {
        const wb = new WebBot();
        return pollUntil({
            test: () => window.bot !== undefined && window.core !== undefined,
            description: 'this.bot to be defined'
        }, 10000).then(() => {
            wb.setWindow(window);
            return wb;
        });
    }

    public webBotReady(): Promise<boolean> {
        return Promise.resolve(this.bot !== undefined && this.core !== undefined && this.window !== undefined);
    }

    private setWindow(window: Window): void {
        if (!window.bot || !window.core) {
            throw Error("Could not find window.bot or window.core, please include bot.js");
        }
        this.window = window;
        this.bot = window.bot;
        this.core = window.core;
        this.bot.setWindow(window);
    }

    private findElement(locator: string): Element {
        return this.core.locators.findElement(locator);
    }

    public type(locator: string, text: string|Array<string|keyof KeyboardKeySet>): Promise<void> {
        if (Array.isArray(text)) {
            text = text.map(s => this.bot.Keyboard.Keys[s] ? this.bot.Keyboard.Keys[s] : s);
        }
        const elem = this.findElement(locator);
        this.bot.action.type(elem, text);
        return Promise.resolve();
    }

    public setAttribute(locator: string, attributeKey: string, value: string): Promise<void> {
        const elem = this.findElement(locator);
        elem[attributeKey] = value;
        return Promise.resolve();
    }

    public click(locator: string, opt_coords?: Coords): Promise<void> {
        const elem = this.findElement(locator);
        this.bot.action.click(elem, opt_coords);
        return Promise.resolve();
    }

    public getText(locator: string): Promise<string> {
        const elem = this.findElement(locator);
        return Promise.resolve(this.core.text.getElementText(elem));
    }

    public clear(locator: string): Promise<void> {
        const elem = this.findElement(locator);
        this.bot.action.clear(elem);
        return Promise.resolve();
    }

    public setCheckbox(locator: string, shouldBeChecked: boolean): Promise<void> {
        const checkbox = this.findElement(locator);
        const isChecked = checkbox.getAttribute('value') === 'true';
        if (isChecked === shouldBeChecked)
            return;
        this.bot.action.click(checkbox);
        return Promise.resolve();
    }

    public elementExists(locator: string): Promise<boolean> {
        return Promise.resolve(this.core.locators.findElementOrNull(locator) !== null);
    }

    public evaluateJs(js: string): Promise<any> {
        return Promise.resolve(eval(js));
    }

    public getElementAttribute(locator: string, attribute: string): Promise<string> {
        const elem = this.findElement(locator);
        return Promise.resolve(elem.getAttribute(attribute));
    }

    public isElementInteractable(locator: string): Promise<boolean> {
        const elem = this.core.locators.findElementOrNull(locator);
        if (elem === null)
            return Promise.resolve(false);

        return Promise.resolve(this.bot.dom.isInteractable(elem));
    }
}
