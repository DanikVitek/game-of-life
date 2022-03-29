import {
    FormControl,
    FormLabel, HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

type Props = {
    isGameOnline: boolean,
    onGridSizeChange: (newSize: [number, number]) => void,
    initialSize: [number, number]
};

const GridSize = ({isGameOnline, onGridSizeChange, initialSize}: Props) => {
    const [width, setWidth] = useState(initialSize[0]);
    const [height, setHeight] = useState(initialSize[1]);

    useEffect(
        () => onGridSizeChange([width, height]),
        [width, height]
    );

    const handleWidthChange = (_: string, valueAsNumber: number) => {
        if (valueAsNumber >= 1) setWidth(valueAsNumber)
    }

    const handleHeightChange = (_: string, valueAsNumber: number) => {
        if (valueAsNumber >= 1) setHeight(valueAsNumber)
    }

    return (<>
        <HStack>
            <FormControl isDisabled={isGameOnline}>
                <FormLabel>Width</FormLabel>
                <NumberInput defaultValue={initialSize[0]} min={3} max={500} precision={0} onChange={handleWidthChange}>
                    <NumberInputField/>
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl isDisabled={isGameOnline}>
                <FormLabel>Height</FormLabel>
                <NumberInput defaultValue={initialSize[1]} min={3} max={500} precision={0} onChange={handleHeightChange}>
                    <NumberInputField/>
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </HStack>
    </>);
};

export default GridSize;