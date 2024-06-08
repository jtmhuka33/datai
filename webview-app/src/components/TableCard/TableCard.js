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

export default function TableCard({ table, onDelete, onUpdate }) {
  const [tableName, setTableName] = useState(table.name || "");
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    const newColumn = { id: Date.now(), name: "" };
    setColumns([...columns, newColumn]);
    onUpdate({ ...table, columns: [...columns, newColumn], name: tableName });
  };

  const handleDeleteColumn = (id) => {
    const updatedColumns = columns.filter(column => column.id !== id);
    setColumns(updatedColumns);
    onUpdate({ ...table, columns: updatedColumns, name: tableName })
  };

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
    onUpdate({ ...table, columns, name: e.target.value });
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
              value={tableName}
              onChange={handleTableNameChange}
            />
            <Button
              color="success"
              variant="contained"
              onClick={handleAddColumn}
            >
              Add Column
            </Button>
          </Box>
        }
      />
      <CardContent>
        {columns.map((column) => (
          <ColumnButton
            key={column.id}
            column={column}
            onDelete={handleDeleteColumn}
            onUpdate={(name) => {
              const updatedColumns = columns.map(col => col.id === column.id ? { ...col, name } : col);
              setColumns(updatedColumns);
              onUpdate({ ...table, columns: updatedColumns, name: tableName });
            }}
          />
        ))}
      </CardContent>
      <CardActions>
        <Button color="error" variant="contained" onClick={onDelete}>
          Delete Table
        </Button>
      </CardActions>
    </Card>
  );
}
