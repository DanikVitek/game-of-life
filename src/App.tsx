import React, {useEffect, useState} from 'react';
import Scene from "./components/Scene";
import {Box, VStack} from "@chakra-ui/react";
import GridSize from "./components/GridSize";
import PlayButton from "./components/PlayButton";
import Field from "./primitives/Field";
import ThemeToggle from "./components/ThemeToggle";

function App() {
    const [[gridW, gridH], setDims] = useState([40, 40]);
    const [gameIsOnline, setGameIsOnline] = useState(false);
    const [field, setField] = useState(new Field(gridW, gridH));

    useEffect(() => {
        if (!gameIsOnline) setField(new Field(gridW, gridH));
    }, [gridW, gridH]);

    const gameIsOnlineLambda = () => gameIsOnline;

    return (
        <VStack>
            <ThemeToggle/>
            <Box borderStyle="solid" borderWidth={1} borderColor="white">
                <Scene field={field} gameIsOnline={gameIsOnlineLambda}/>
            </Box>
            <VStack>
                <GridSize isGameOnline={gameIsOnline} onGridSizeChange={setDims} initialSize={[gridW, gridH]}/>
                <PlayButton isGameOnline={gameIsOnline} onGameIsOnlineChange={setGameIsOnline}/>
            </VStack>
        </VStack>
    );
}

export default App;
