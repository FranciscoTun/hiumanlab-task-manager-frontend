import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useTasksApi } from "../../services/tasksApi";

function TaskModal({ open, onClose, onTaskSaved, editTask }) {
  const { addTask, updateTask } = useTasksApi();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editTask, open]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;

    if (editTask) {
      await updateTask(editTask._id, {
        title: title.trim(),
        description: description.trim(),
      });
    } else {
      await addTask({
        title: title.trim(),
        description: description.trim(),
        status: "PENDIENTE",
      });
    }

    setTitle("");
    setDescription("");
    onTaskSaved();
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        {editTask ? "Editar Tarea" : "Agregar Nueva Tarea"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            autoFocus
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ textTransform: "none" }}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim()}
          sx={{ textTransform: "none", px: 3 }}
        >
          {editTask ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskModal;