import React, { useState, useEffect } from "react";
import { Grid, Stack, Box, Button, TextField } from "@mui/material";
import TableCard from "./components/TableCard/TableCard";

function App() {
  const [tables, setTables] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isGenerateButtonDisabled, setIsGenerateButtonDisabled] =
    useState(true);

  const handleAddTable = () => {
    setTables([...tables, { id: Date.now(), name: "", columns: [] }]);
  };

  const handleDeleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  const handleUpdateTable = (updatedTable) => {
    setTables(
      tables.map((table) =>
        table.id === updatedTable.id ? updatedTable : table
      )
    );
  };

  const handleGenerateSchema = () => {
    const dataToSend = JSON.stringify({
      tables,
      additionalInfo,
    });
    if (window.vscode) {
      window.vscode.postMessage({
        type: "generateCustomSchema",
        data: dataToSend,
      });
    }
    console.log("Data to send:", dataToSend); // For debugging purposes
  };

  const areFieldsFilled = () => {
    if (!additionalInfo.trim()) return false;
    for (const table of tables) {
      if (!table.name.trim()) return false;
      for (const column of table.columns) {
        if (!column.name.trim()) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setIsGenerateButtonDisabled(!areFieldsFilled());
  }, [tables, additionalInfo]);

  return (
    <>
      <Grid container width="33%">
        <Grid item sm={6} xl={12} sx={{ marginBottom: 7 }}>
          <Stack spacing={8} direction="row">
            <h2>Custom Schema Generator</h2>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="success"
              variant="contained"
              onClick={handleAddTable}
            >
              Add Table
            </Button>
          </Stack>
        </Grid>
        {tables.map((table) => (
          <Grid key={table.id} item xl={12} display="block">
            <TableCard
              table={table}
              onDelete={() => handleDeleteTable(table.id)}
              onUpdate={handleUpdateTable}
            />
          </Grid>
        ))}
        <Grid item xl={12} marginTop={3}>
          <TextField
            label="Additional Information"
            multiline
            maxRows={5}
            fullWidth
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </Grid>
        <Grid item xl={12} marginTop={3}>
          <Stack direction="row">
            <Box sx={{ flexGrow: 1 }} />
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={handleGenerateSchema}
              disabled={isGenerateButtonDisabled}
            >
              Generate Schema
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
