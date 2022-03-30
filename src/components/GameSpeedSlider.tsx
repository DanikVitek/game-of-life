import {
    FormControl,
    FormLabel,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    useColorMode
} from "@chakra-ui/react";

type Props = {
    gameSpeed: number,
    onSliderUpdate: (gameSpeed: number) => void,
    min: number,
    max: number
}

export default function GameSpeedSlider({gameSpeed, max, min, onSliderUpdate}: Props) {
    const {colorMode} = useColorMode();

    return (<>
        <FormControl>
            <FormLabel>Game speed (fast to slow): {gameSpeed}</FormLabel>
            <Slider min={min} max={max} defaultValue={gameSpeed}
                    step={0.01}
                    onChange={onSliderUpdate}
                    getAriaValueText={(value: number) => `${value}`}
            >
                <SliderTrack>
                    <SliderFilledTrack/>
                </SliderTrack>
                <SliderThumb bgColor={colorMode === "light" ? "darkgray" : "white"}/>
            </Slider>
        </FormControl>
    </>);
}