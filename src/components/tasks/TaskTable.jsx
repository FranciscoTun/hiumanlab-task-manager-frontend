import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
  Button,
  Typography,
  Container,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTasksApi } from "../../services/tasksApi";

const STATUS_COLORS = {
  PENDIENTE: "warning",
  "EN PROGRESO": "info",
  COMPLETADA: "success",
};

function TaskTable({ onOpenAddModal, onOpenEditModal, refreshTrigger }) {
  const { getTasks, updateTask, deleteTask } = useTasksApi();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("TODAS");

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  useEffect(() => {
    filterTasks();
  }, [tasks, statusFilter]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const filterTasks = () => {
    if (statusFilter === "TODAS") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === statusFilter));
    }
  };

  const openStatusMenu = (event, task) => {
    setSelectedTask(task);
    setAnchorEl(event.currentTarget);
  };

  const closeStatusMenu = () => {
    setSelectedTask(null);
    setAnchorEl(null);
  };

  const handleStatusChange = async (status) => {
    await updateTask(selectedTask._id, { status });
    closeStatusMenu();
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === selectedTask._id ? { ...task, status } : task
      )
    );
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
  };

  const handleEdit = (task) => {
    onOpenEditModal(task);
  };

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const getTaskStats = () => {
    const pendientes = tasks.filter(t => t.status === "PENDIENTE").length;
    const enProgreso = tasks.filter(t => t.status === "EN PROGRESO").length;
    const completadas = tasks.filter(t => t.status === "COMPLETADA").length;
    return { pendientes, enProgreso, completadas };
  };

  const stats = getTaskStats();

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="700" color="text.primary" sx={{ mb: 0.5 }}>
            Task Manager
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tasks.length === 0 
              ? "No tienes tareas registradas" 
              : `${tasks.length} ${tasks.length === 1 ? 'tarea' : 'tareas'} total${tasks.length === 1 ? '' : 'es'} • ${stats.pendientes} pendiente${stats.pendientes !== 1 ? 's' : ''} • ${stats.enProgreso} en progreso • ${stats.completadas} completada${stats.completadas !== 1 ? 's' : ''}`
            }
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onOpenAddModal}
          size="large"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Agregar Tarea
        </Button>
      </Box>

      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <FilterListIcon sx={{ color: "text.secondary" }} />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filtrar por estado</InputLabel>
          <Select
            value={statusFilter}
            label="Filtrar por estado"
            onChange={handleFilterChange}
            sx={{
              borderRadius: 1.5,
            }}
          >
            <MenuItem value="TODAS">Todas ({tasks.length})</MenuItem>
            <MenuItem value="PENDIENTE">Pendientes ({stats.pendientes})</MenuItem>
            <MenuItem value="EN PROGRESO">En Progreso ({stats.enProgreso})</MenuItem>
            <MenuItem value="COMPLETADA">Completadas ({stats.completadas})</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                  Título
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "35%" }}>
                  Descripción
                </TableCell>
                <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                  Estado
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, width: "25%" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      {tasks.length === 0 
                        ? "No hay tareas. Comienza agregando una nueva."
                        : `No hay tareas con estado "${statusFilter}".`
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow
                    key={task._id}
                    hover
                    sx={{
                      "&:last-child td": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>
                      {task.title}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {task.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={task.status}
                          color={STATUS_COLORS[task.status]}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => openStatusMenu(e, task)}
                          sx={{
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(task)}
                          sx={{
                            "&:hover": {
                              bgcolor: "primary.lighter",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(task._id)}
                          sx={{
                            "&:hover": {
                              bgcolor: "error.lighter",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeStatusMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleStatusChange("PENDIENTE")}>
          PENDIENTE
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("EN PROGRESO")}>
          EN PROGRESO
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("COMPLETADA")}>
          COMPLETADA
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default TaskTable;