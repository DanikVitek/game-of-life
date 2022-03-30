import React, {useEffect, useState} from 'react';
import Scene from "./components/Scene";
import {Box, HStack, VStack} from "@chakra-ui/react";
import GridInput from "./components/GridInput";
import GameSpeedSlider from "./components/GameSpeedSlider";
import PlayButton from "./components/PlayButton";
import Field from "./primitives/Field";
import ThemeToggle from "./components/ThemeToggle";
import ClearFieldButton from "./components/ClearFieldButton";

function App() {
    const [[gridW, gridH], setDims] = useState([40, 40]);
    const [gameIsOnline, setGameIsOnline] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(0.3);
    const [showGrid, setShowGrid] = useState(false);
    const [field, setField] = useState(new Field(gridW, gridH));

    useEffect(() => {
        if (!gameIsOnline) setField(new Field(gridW, gridH));
    }, [gridW, gridH]);

    return (
        <VStack>
            <ThemeToggle alignSelf="flex-end" marginTop={10} marginRight={10} position="absolute"/>
            <Box borderStyle="solid" borderWidth={1} borderColor="white">
                <Scene field={field} gameSpeed={gameSpeed} gameIsOnline={gameIsOnline} showGrid={showGrid}/>
            </Box>
            <VStack>
                <GridInput isGameOnline={gameIsOnline} onGridSizeChange={setDims} initialSize={[gridW, gridH]}
                           showGrid={showGrid} onShowGridChange={setShowGrid}
                />
                <GameSpeedSlider gameSpeed={gameSpeed} onSliderUpdate={setGameSpeed} min={0} max={1}/>
                <HStack>
                    <PlayButton isGameOnline={gameIsOnline} onGameIsOnlineChange={setGameIsOnline}/>
                    <ClearFieldButton field={field}/>
                </HStack>
            </VStack>
        </VStack>
    );
}

export default App;
