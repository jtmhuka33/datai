import { IconButton, Stack, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';


export default function ColumnButton() {
    return (
        <Stack direction="row">
            <TextField label="Column Name" variant="outlined"/>
            <IconButton aria-label="delete"><CancelIcon/></IconButton>
        </Stack>
    )
}