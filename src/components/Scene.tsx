import Sketch from "react-p5";
import p5Types from "p5";
import Field from "../primitives/Field";

type Props = {
    field: Field,
    gameIsOnline: () => boolean
}

const Scene = ({field, gameIsOnline}: Props) => {
    let framesPassed = 0;
    let generation = 0;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(40 * 16, 40 * 16).parent(canvasParentRef);
        p5.background(0);
    };

    const draw = (p5: p5Types) => { // CAN'T USE setState
        p5.background(0);
        if (!field) return;

        field.show(false, p5);
        if (gameIsOnline() && ++framesPassed === 30) {
            field.act(generation);
            framesPassed = 0;
        }
    }

    return <Sketch setup={setup} draw={draw}/>;
};

export default Scene;