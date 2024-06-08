import { IconButton, Stack, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ColumnButton({ column, onDelete, onUpdate }) {
  return (
    <Stack marginLeft={6} marginBottom={3} direction="row">
      <TextField
        label="Column Name"
        variant="outlined"
        defaultValue={column.name}
        onChange={(e) => onUpdate(e.target.value)}
      />
      <IconButton
        color="error"
        aria-label="delete column"
        onClick={() => onDelete(column.id)}
      >
        <CancelIcon />
      </IconButton>
    </Stack>
  );
}
