import { useState } from "react";
import TaskTable from "./components/tasks/TaskTable";
import TaskModal from "./components/tasks/TaskModal";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskSaved = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditTask(null);
  };

  const handleOpenAddModal = () => {
    setEditTask(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (task) => {
    setEditTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditTask(null);
  };

  return (
    <>
      <TaskTable 
        onOpenAddModal={handleOpenAddModal}
        onOpenEditModal={handleOpenEditModal}
        refreshTrigger={refreshTrigger}
      />
      <TaskModal
        open={openModal}
        onClose={handleCloseModal}
        onTaskSaved={handleTaskSaved}
        editTask={editTask}
      />
    </>
  );
}

export default App;