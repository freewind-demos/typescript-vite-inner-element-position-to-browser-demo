export interface Position {
    left?: number;
    top?: number;
}

function f(element: Element, targetWin: Window, store: Position) {
    const win = element.ownerDocument?.defaultView;
    if (!win) return;
    const style = win.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    if (store.left !== undefined) {
        store.left += rect.left + parseInt(style.borderLeftWidth) + parseInt(style.paddingLeft);
    } else {
        store.left = rect.left
    }
    if (store.top !== undefined) {
        store.top += rect.top + parseInt(style.borderTopWidth) + parseInt(style.paddingTop);
    } else {
        store.top = rect.top
    }

    if (win === targetWin) {
        return;
    }
    if (win.frameElement) {
        f(win.frameElement, targetWin, store);
    }
}

export function getPositionRelativeToWindow(element: Element, targetWin: Window): Position {
    const position: Position = {};
    f(element, targetWin, position);
    return position;
}