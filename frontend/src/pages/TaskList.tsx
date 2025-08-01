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
  results: Task[];
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDone, setFilterDone] = useState<string>("");

  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const pageSize = 10;

  const fetchTasks = (page: number = 1, doneStatus: string = filterDone) => {
    let requestUrl = `tasks/?page=${page}`;
    if (doneStatus) requestUrl += `&is_done=${doneStatus}`;

    api.get<ApiResponse>(requestUrl).then((res) => {
      setTasks(res.data.results);
      setCount(res.data.count);
      setCurrentPage(page);
      setFilterDone(doneStatus);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleDone = async (task: Task) => {
    await api.put(`tasks/${task.id}/`, { ...task, is_done: !task.is_done });
    fetchTasks(currentPage, filterDone);
  };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div>
      <div>
        <button onClick={() => fetchTasks(1, "")}>Todas</button>
        <button onClick={() => fetchTasks(1, "false")}>Pendentes</button>
        <button onClick={() => fetchTasks(1, "true")}>Concluídas</button>
        <button onClick={() => { logout(); navigate("/login"); }}>Sair</button>
      </div>

      <h2>Minhas Tarefas</h2>
      <button onClick={() => navigate("/tasks/new")}>Nova Tarefa</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.is_done}
              onChange={() => toggleDone(task)}
            />
            <span
              style={{ textDecoration: task.is_done ? "line-through" : "none", cursor: "pointer" }}
            >
              {task.title}
            </span>
            <button onClick={() => navigate(`/tasks/edit/${task.id}`)}>Editar</button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={currentPage === 1} onClick={() => fetchTasks(currentPage - 1, filterDone)}>
          Anterior
        </button>
        <span> Página {currentPage} de {totalPages || 1} </span>
        <button disabled={currentPage === totalPages} onClick={() => fetchTasks(currentPage + 1, filterDone)}>
          Próxima
        </button>
        <span> Total de tarefas: {count} </span>
      </div>
    </div>
  );
}