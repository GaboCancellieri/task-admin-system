import { API_HOST, API_PORT } from "./constants";

export const tasksEndpoint = `http://${API_HOST}:${API_PORT}/api/tasks`;
export const taskPutEndpoint = (id: string) => `http://${API_HOST}:${API_PORT}/api/tasks/${id}`;
