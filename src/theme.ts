import {extendTheme} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: mode("white", "black")
            }
        })
    }
})

export default theme;