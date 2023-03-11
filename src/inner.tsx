import React, { FC, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { getPositionRelativeToWindow } from './getPositionRelativeToWindow';

// setInterval(() => {
//     const position1 = getPositionRelativeToWindow(button, window);
//     const position2 = getPositionRelativeToWindow(button, window.parent!);
//     const position3 = getPositionRelativeToWindow(button, window.top!);

//     button.innerText = `${JSON.stringify(position1)}\n${JSON.stringify(position2)}\n${JSON.stringify(position3)}`;
// }, 100);

interface WindowSpace {
    body: {
        "margin-top": number;
        "padding-top": number;
        "border-top-width": number;
    }
    iframe: {
        "margin-top": number;
        "padding-top": number;
        "border-top-width": number;
    }
}

const Hello: FC = () => {
    const [topWin, setTopWin] = useState<WindowSpace>({
        body: { "margin-top": 0, "padding-top": 0, "border-top-width": 0 },
        iframe: { "margin-top": 0, "padding-top": 0, "border-top-width": 0 }
    });
    const [middleWin, setMiddleWin] = useState<WindowSpace>({
        body: { "margin-top": 0, "padding-top": 0, "border-top-width": 0 },
        iframe: { "margin-top": 0, "padding-top": 0, "border-top-width": 0 }
    });
    const [thisWin, setThisWin] = useState<WindowSpace>({
        body: { "margin-top": 0, "padding-top": 0, "border-top-width": 0 },
        iframe: { "margin-top": 0, "padding-top": 0, "border-top-width": 0 }
    });

    const [info, setInfo] = useState('')
    const [buttonRef, setButtonRef] = useState<HTMLElement | null>(null)

    useEffect(() => {
        function setSpace(win: Window, space: WindowSpace) {
            Object.assign(win.document.body.style, { ...space.body });
            Object.assign(win.document.querySelector<HTMLElement>('iframe, #my-button')!.style, { ...space.iframe });
        }
        setSpace(window.top!, topWin);
        setSpace(window.parent!, middleWin);
        setSpace(window, thisWin);
        if (buttonRef) {
            setInfo(JSON.stringify(getPositionRelativeToWindow(buttonRef, window.top!)));
        } else {
            setInfo('Hello')
        }
    }, [topWin, middleWin, thisWin])

    return <div>
        <button id="my-button" ref={setButtonRef}>{info}</button>
        <hr />
        <div>
            <div>Top window</div>
            <div>
                body:
                <button onClick={() => setTopWin(n => (n.body["margin-top"] += 10, { ...n }))}>margin-top {topWin.body["margin-top"]}</button>
                <button onClick={() => setTopWin(n => (n.body["border-top-width"] += 10, { ...n }))} >border-top-width {topWin.body["border-top-width"]}</button>
                <button onClick={() => setTopWin(n => (n.body["padding-top"] += 10, { ...n }))} >padding-top {topWin.body["padding-top"]}</button>
            </div >
            <div>
                iframe:
                <button onClick={() => setTopWin(n => (n.iframe["margin-top"] += 10, { ...n }))}>margin-top {topWin.iframe["margin-top"]}</button>
                <button onClick={() => setTopWin(n => (n.iframe["border-top-width"] += 10, { ...n }))} >border-top-width {topWin.iframe["border-top-width"]}</button>
                <button onClick={() => setTopWin(n => (n.iframe["padding-top"] += 10, { ...n }))} >padding-top {topWin.iframe["padding-top"]}</button>
            </div >
        </div >
        <div>
            <div>Middle window</div>
            <div>
                body:
                <button onClick={() => setMiddleWin(n => (n.body["margin-top"] += 10, { ...n }))}>margin-top {middleWin.body["margin-top"]}</button>
                <button onClick={() => setMiddleWin(n => (n.body["border-top-width"] += 10, { ...n }))} >border-top-width {middleWin.body["border-top-width"]}</button>
                <button onClick={() => setMiddleWin(n => (n.body["padding-top"] += 10, { ...n }))} >padding-top {middleWin.body["padding-top"]}</button>
            </div >
            <div>
                iframe:
                <button onClick={() => setMiddleWin(n => (n.iframe["margin-top"] += 10, { ...n }))}>margin-top {middleWin.iframe["margin-top"]}</button>
                <button onClick={() => setMiddleWin(n => (n.iframe["border-top-width"] += 10, { ...n }))} >border-top-width {middleWin.iframe["border-top-width"]}</button>
                <button onClick={() => setMiddleWin(n => (n.iframe["padding-top"] += 10, { ...n }))} >padding-top {middleWin.iframe["padding-top"]}</button>
            </div >
        </div >
        <div>
            <div>This window</div>
            <div>
                body:
                <button onClick={() => setThisWin(n => (n.body["margin-top"] += 10, { ...n }))}>margin-top {thisWin.body["margin-top"]}</button>
                <button onClick={() => setThisWin(n => (n.body["border-top-width"] += 10, { ...n }))} >border-top-width {thisWin.body["border-top-width"]}</button>
                <button onClick={() => setThisWin(n => (n.body["padding-top"] += 10, { ...n }))} >padding-top {thisWin.body["padding-top"]}</button>
            </div >
            <div>
                my-button:
                <button onClick={() => setThisWin(n => (n.iframe["margin-top"] += 10, { ...n }))}>margin-top {thisWin.iframe["margin-top"]}</button>
                <button onClick={() => setThisWin(n => (n.iframe["border-top-width"] += 10, { ...n }))} >border-top-width {thisWin.iframe["border-top-width"]}</button>
                <button onClick={() => setThisWin(n => (n.iframe["padding-top"] += 10, { ...n }))} >padding-top {thisWin.iframe["padding-top"]}</button>
            </div >
        </div >
    </div >
}

ReactDOM.render(<Hello />, document.body);