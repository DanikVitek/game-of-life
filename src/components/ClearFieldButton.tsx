import {Button} from "@chakra-ui/react";
import Field from "../primitives/Field";

type Props = {
    field: Field
}

const ClearFieldButton = ({field}: Props) => <Button onClick={() => field.clear()}>Clear</Button>;
export default ClearFieldButton;