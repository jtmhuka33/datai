import React from "react";
import { useState } from "react";
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

export default function TableCard({onDelete}) {

  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    setColumns([...columns, {id: Date.now(), name: ''}])
  }

  const handleDeleteColumn = (id) => {
    setColumns(columns.filter(column => column.id !== id))
  }
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
            <Button color="success" variant="contained" onClick={handleAddColumn}>Add Column</Button>
          </Box>
        }
      />
      <CardContent>{columns.map(column => (<ColumnButton key={column.id} column={column} onDelete={handleDeleteColumn} />))}</CardContent>
      <CardActions>
        <Button color="error" variant="contained" onClick={onDelete}>Delete Table</Button>
      </CardActions>
    </Card>
  );
}
