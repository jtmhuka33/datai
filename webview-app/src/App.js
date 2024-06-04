import "./App.css";
import TableCard from "./components/TableCard/TableCard";
import { Stack, Button, Grid } from "@mui/material";

function App() {
  return (
    <>
      <Grid width="33%" container>
        <Grid sm={6} xl={12} item>
          <Stack spacing={8} direction="row">
            <h4>Custom Schema Generator</h4>
            <Button color="success" variant="contained">
              ADD TABLE
            </Button>
          </Stack>
        </Grid>
        <Grid display="block" xl={12} item>
          <TableCard />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
