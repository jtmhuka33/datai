import "./App.css";
import TableCard from "./components/TableCard/TableCard";
import { Stack, Button, Grid, Box } from "@mui/material";

function App() {
  return (
    <>
      <Grid  width="33%" container>
        <Grid sx={{marginBottom: 3}} sm={6} xl={12} item>
          <Stack spacing={8} direction="row">
            <h2>Custom Schema Generator</h2>
            <Box sx={{ flexGrow: 1}}/>
            <Button color="success" variant="contained">
              ADD TABLE
            </Button>
          </Stack>
        </Grid>
        <Grid display="block" xl={12} item>
          <TableCard />
        </Grid>
        <Grid marginTop={3} xl={12} item>
          <Stack direction="row">
          <Box sx={{ flexGrow: 1}}/>
          <Button type="submit" variant="contained" color="success">Generate Schema</Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
