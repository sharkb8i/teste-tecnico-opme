import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../auth/useAuth";

interface Task {
  id: number;
  title: string;
  is_done: boolean;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [filterDone, setFilterDone] = useState<string>("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTasks = (url?: string, doneStatus: string = filterDone) => {
    const requestUrl = url || `tasks/?${doneStatus ? `is_done=${doneStatus}` : ""}`;
    api.get<ApiResponse>(requestUrl).then((res) => {
      setTasks(res.data.results);
      setCount(res.data.count);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setFilterDone(doneStatus);
    });
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
        <button onClick={() => fetchTasks(undefined, "")}>Todas</button>
        <button onClick={() => fetchTasks(undefined, "false")}>Pendentes</button>
        <button onClick={() => fetchTasks(undefined, "true")}>Concluídas</button>
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

      <div>
        <button disabled={!prevPageUrl} onClick={() => prevPageUrl && fetchTasks(prevPageUrl)}>
          Anterior
        </button>
        <button disabled={!nextPageUrl} onClick={() => nextPageUrl && fetchTasks(nextPageUrl)}>
          Próxima
        </button>
        <span> Total de tarefas: {count} </span>
      </div>
    </div>
  );
}