import React, { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        mt: 4,
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="600">
        Add New Task
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          multiline
          rows={3}
        />

        <Button type="submit" variant="contained" size="large">
          Add Task
        </Button>
      </Box>
    </Paper>
  );
}

export default TaskForm;
