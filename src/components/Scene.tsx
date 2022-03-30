import Sketch from "react-p5";
import p5Types from "p5";
import Field from "../primitives/Field";
import {useColorMode} from "@chakra-ui/react";

type Props = {
    field: Field,
    gameSpeed: number,
    gameIsOnline: boolean,
    showGrid: boolean
}

export default function Scene({field, gameIsOnline, gameSpeed, showGrid}: Props) {
    let timePassed = 0;
    let prevIJ: [number, number][] = [];
    const {colorMode} = useColorMode();

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(40 * 16, 40 * 16).parent(canvasParentRef);
        p5.background(colorMode === "light" ? 255 : 0);
    };

    const draw = (p5: p5Types) => { // CAN'T USE setState
        p5.background(colorMode === "light" ? 255 : 0);
        if (!field) return;

        field.show(showGrid, colorMode, p5);
        timePassed += p5.deltaTime / 1000;
        if (gameIsOnline && timePassed >= gameSpeed) {
            field.act();
            timePassed = 0;
        }
    };

    const putCell = (x: number, y: number, p5: p5Types) => {
        const i = Math.floor(x / (p5.width / field.width));
        const j = Math.floor(y / (p5.width / field.height));
        if (!prevIJ.some((value) => value[0] === i && value[1] === j)) {
            field.putCell(i, j);
            prevIJ.push([i, j]);
        }
    }

    const putTouch = (p5: p5Types) => {
        if (p5.mouseIsPressed) putCell(p5.mouseX, p5.mouseY, p5);
        else for (const touch of p5.touches) {
            // @ts-ignore
            const {x, y} = touch;
            putCell(x, y, p5);
        }
    };

    return <Sketch
        setup={setup} draw={draw}
        touchStarted={putTouch} touchMoved={putTouch}
        mouseReleased={() => prevIJ = []}
    />;
}