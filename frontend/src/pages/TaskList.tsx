import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../auth/useAuth";

interface Task {
  id: number;
  title: string;
  is_done: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTasks = (doneStatus: string = "") => {
    const url = doneStatus ? `tasks/?is_done=${doneStatus}` : "tasks/";
    api.get(url).then((res) => setTasks(res.data.results || res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleDone = async (task: Task) => {
    await api.put(`tasks/${task.id}/`, { ...task, is_done: !task.is_done });
    fetchTasks();
  };

  return (
    <div>
      <div>
        <button onClick={() => fetchTasks()}>Todas</button>
        <button onClick={() => fetchTasks("false")}>Pendentes</button>
        <button onClick={() => fetchTasks("true")}>Concluídas</button>
        <button onClick={() => { logout(); navigate("/login"); }}>Sair</button>
      </div>

      <h2>Minhas Tarefas</h2>
      <button onClick={() => navigate("/tasks/new")}>Nova Tarefa</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleDone(task)}
              style={{ textDecoration: task.is_done ? "line-through" : "none", cursor: "pointer" }}
            >
              {task.title}
            </span>
            <button onClick={() => navigate(`/tasks/edit/${task.id}`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}