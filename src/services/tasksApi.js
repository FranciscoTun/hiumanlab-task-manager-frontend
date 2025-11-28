import axios from "axios";
import { useEnv } from "../context/EnvContext.jsx";

export const useTasksApi = () => {
  const { API_URL } = useEnv();
  const BASE_URL = `${API_URL}/tasks/`;

  const getTasks = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  };

  const addTask = async (task) => {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  };

  const updateTask = async (id, updates) => {
    const response = await axios.put(`${BASE_URL}${id}`, updates);
    return response.data;
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(`${BASE_URL}${id}`);
    return response.data;
  };

  return { getTasks, addTask, updateTask, deleteTask };
};
