import { IconButton, Stack, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';


export default function ColumnButton() {
    return (
        <Stack marginLeft={6} marginBottom={3} direction="row">
            <TextField label="Column Name" variant="outlined"/>
            <IconButton aria-label="delete column"><CancelIcon/></IconButton>
        </Stack>
    )
}