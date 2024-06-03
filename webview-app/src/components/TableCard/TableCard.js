import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Box,
  TextField,
} from "@mui/material";

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
            <Button color="success" variant="contained">ADD TABLE</Button>
          </Box>
        }
      />

      <CardContent>{/**  */}</CardContent>
      <CardActions>
        <Button color="error" variant="contained">DELETE TABLE</Button>
      </CardActions>
    </Card>
  );
}
