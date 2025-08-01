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
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => fetchTasks(1, "")}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Todas
          </button>
          <button
            onClick={() => fetchTasks(1, "false")}
            className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500"
          >
            Pendentes
          </button>
          <button
            onClick={() => fetchTasks(1, "true")}
            className="px-3 py-1 bg-green-200 rounded hover:bg-green-300 dark:bg-green-600 dark:hover:bg-green-500"
          >
            Concluídas
          </button>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-red-500 hover:underline"
        >
          Sair
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Minhas Tarefas
        </h2>
        <button
          onClick={() => navigate("/tasks/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Nova Tarefa
        </button>
      </div>

      <ul className="space-y-2 mb-6">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 shadow rounded cursor-pointer transition-colors duration-200"
            onClick={() => toggleDone(task)}
          >
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 pointer-events-none">
                <input
                  type="checkbox"
                  checked={task.is_done}
                  readOnly
                  className="appearance-none w-full h-full border-2 border-blue-600 rounded-sm checked:bg-blue-600 checked:border-transparent"
                />
                {task.is_done ? (
                  <svg
                    className="absolute inset-0 w-5 h-5 text-white"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="4 10 8 14 16 6" />
                  </svg>
                ) : (
                  <svg
                    className="absolute inset-0 w-5 h-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                  </svg>
                )}
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {task.title}
              </span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/tasks/edit/${task.id}`);
              }}
              className="px-3 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-700 cursor-pointer select-none transition-colors"
              style={{ minWidth: "60px", textAlign: "center" }}
            >
              Editar
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => fetchTasks(currentPage - 1, filterDone)}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 dark:bg-gray-700 dark:disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-900 dark:text-gray-200">
            Página <strong>{currentPage}</strong> de {totalPages || 1}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => fetchTasks(currentPage + 1, filterDone)}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 dark:bg-gray-700 dark:disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Total de tarefas: {count}
        </span>
      </div>
    </div>
  );
}