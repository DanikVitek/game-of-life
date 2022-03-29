import {Button} from "@chakra-ui/react";

type Props = {
    isGameOnline: boolean,
    onGameIsOnlineChange: (newValue: boolean) => void
}

const PlayButton = ({isGameOnline, onGameIsOnlineChange}: Props) => {
    const handleClick = () => {
        onGameIsOnlineChange(!isGameOnline);
    }

    return (
        <Button onClick={handleClick}>{isGameOnline ? "Stop" : "Play"}</Button>
    );
};

export default PlayButton;