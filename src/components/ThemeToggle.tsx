import {Button, useColorMode} from "@chakra-ui/react";

export default function ThemeToggle() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <header>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? "Light" : "Dark"}
            </Button>
        </header>
    );
}