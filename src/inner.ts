const button = document.getElementById('button')!;
const info = document.getElementById('info')!;

interface Position {
    left: number;
    top: number;
}
function getPositionToTopWindow(element: Element): Position {
    function f(element: Element, store: Position | undefined) {
        const win = element.ownerDocument.defaultView!;
        const style = win.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        if (store) {
            store.left += rect.left + parseInt(style.borderLeftWidth);
            store.top += rect.top + parseInt(style.borderTopWidth);
        } else {
            store = {
                left: rect.left,
                top: rect.top,
            }
        }

        if (win.frameElement) {
            f(win.frameElement, store);
        }
    }
    const position: Position = { left: 0, top: 0 };
    f(element, position);
    return position;
}

setInterval(() => {
    const position = getPositionToTopWindow(button);
    info.innerText = `x: ${position.top}, y: ${position.left}`;
}, 100);