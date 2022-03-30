import {Button, useColorMode} from "@chakra-ui/react";
import {CSSProperties} from "react";

export default function ThemeToggle(style?: CSSProperties) {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Button onClick={toggleColorMode} style={style}>
            {colorMode === "light" ? "Light" : "Dark"}
        </Button>
    );
}