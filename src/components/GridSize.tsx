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
    onGridSizeChange: (newSize: [number, number]) => void,
    initialSize: [number, number]
};

const GridSize = ({onGridSizeChange, initialSize}: Props) => {
    const [width, setWidth] = useState(initialSize[0]);
    const [height, setHeight] = useState(initialSize[1]);

    useEffect(() => onGridSizeChange([width, height]), [width, height]);

    const handleWidthChange = (_: string, valueAsNumber: number) => setWidth(valueAsNumber)

    const handleHeightChange = (_: string, valueAsNumber: number) => setHeight(valueAsNumber)

    return (<>
        <HStack>
            <FormControl>
                <FormLabel>Width</FormLabel>
                <NumberInput defaultValue={initialSize[0]} min={3} precision={0} onChange={handleWidthChange}>
                    <NumberInputField/>
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Height</FormLabel>
                <NumberInput defaultValue={initialSize[1]} min={3} precision={0} onChange={handleHeightChange}>
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