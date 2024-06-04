import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Box,
  TextField,
} from "@mui/material";
import ColumnButton from "../ColumnButton/ColumnButton";

export default function TableCard() {
  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <TextField
              label="Table Name"
              variant="filled"
              size="medium"
              sx={{ marginRight: 2 }}
            />
            <Button color="success" variant="contained">ADD COLUMN</Button>
          </Box>
        }
      />
      <CardContent><ColumnButton/></CardContent>
      <CardActions>
        <Button color="error" variant="contained">DELETE TABLE</Button>
      </CardActions>
    </Card>
  );
}
