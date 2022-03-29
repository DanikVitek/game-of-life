import Sketch from "react-p5";
import p5Types from "p5";
import Field from "../primitives/Field";

type Props = {
    gridW: number,
    gridH: number,
    gameIsOnline: () => boolean
}

const Scene = ({gridW, gridH, gameIsOnline}: Props) => {

    const resolution = 15;
    let framesPassed = 0;

    let field: Field;
    let generation = 0;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(gridW * (resolution + 1), gridH * (resolution + 1)).parent(canvasParentRef);
        p5.background(0);
        field = new Field(gridW, gridH);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        field.show(false, p5);
        if (++framesPassed === 30) {
            field.act(generation);
            framesPassed = 0;
        }
    }

    return <Sketch setup={setup} draw={draw}/>;
};

export default Scene;