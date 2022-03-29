import {Button} from "@chakra-ui/react";
import {useState} from "react";

type Props = {
    onGameOnlineStateChange: (newValue: boolean) => void
}

const PlayButton = ({onGameOnlineStateChange} : Props) => {
    const [isGameOnline, setIsGameOnline] = useState(false);

    const handleClick = () => {
        setIsGameOnline(!isGameOnline);
        onGameOnlineStateChange(isGameOnline);
    }

    return (
        <Button onClick={handleClick}>{isGameOnline ? "Stop" : "Play"}</Button>
    );
};

export default PlayButton;