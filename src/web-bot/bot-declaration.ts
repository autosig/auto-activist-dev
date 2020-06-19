export interface Key {
}

export interface Coords {
    x: number,
    y: number
}

export interface KeyboardKeySet {
    BACKSPACE: Key,
    TAB: Key,
    ENTER: Key,
    SHIFT: Key,
    CONTROL: Key,
    ALT: Key,
    PAUSE: Key,
    CAPS_LOCK: Key,
    ESC: Key,
    SPACE: Key,
    PAGE_UP: Key,
    PAGE_DOWN: Key,
    END: Key,
    HOME: Key,
    LEFT: Key,
    UP: Key,
    RIGHT: Key,
    DOWN: Key,
    PRINT_SCREEN: Key,
    INSERT: Key,
    DELETE: Key,
}

export interface Keyboard {
    Key (code: number, opt_char?: string, opt_shiftChar?: string): Key;
    Keys: KeyboardKeySet
}

export interface SelBot {
    Keyboard: Keyboard,
    action: {
        // @throws {Error} if the element cannot be interacted with
        type (element: Element, values: string|Key|Array<(string|Key)>, opt_keyboard?: Keyboard, opt_persistModifiers?: boolean): void;
        // @throws {Error} if the element cannot be interacted with
        click (element: Element, opt_coords?: Coords, opt_mouse?: object, opt_force?: object): void;
        focusOnElement (element: Element): void;
        // @throws {bot.Error} If the element is not an editable text field.
        clear (element: Element): void;
    },
    setWindow(window: Window): void;
}

export interface SelCore {
    locators: {
        findElementOrNull (locator: string, opt_win?: Window): Element;
        // @throws {Error} If no element can be located
        findElement (locator: string, opt_doc?: Document, opt_win?: Window): Element;
        isElementPresent (locator: string): boolean;
    },
    text: {
        getElementText (element: Element): string;
        isTextPresent (pattern: string): boolean;
    },
    setWindow(window: Window): void;
}

declare global {
    interface Window {
        bot: SelBot;
        core: SelCore;
    }
}
