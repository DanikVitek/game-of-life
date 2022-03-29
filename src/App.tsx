import React, {useState} from 'react';
import './App.css';
import Scene from "./components/Scene";
import {VStack} from "@chakra-ui/react";
import GridSize from "./components/GridSize";
import PlayButton from "./components/PlayButton";

function App() {
    const [[gridW, gridH], setDims] = useState([40, 40]);
    const [gameIsOnline, setGameIsOnline] = useState(false);

    const gameIsOnlineLambda = () => gameIsOnline;

    return (
        <VStack>
            <Scene gridW={gridW} gridH={gridH} gameIsOnline={gameIsOnlineLambda}/>
            <VStack>
                <GridSize onGridSizeChange={setDims} initialSize={[gridW, gridH]}/>
                <PlayButton onGameOnlineStateChange={setGameIsOnline}/>
            </VStack>
        </VStack>
    );
}

export default App;
