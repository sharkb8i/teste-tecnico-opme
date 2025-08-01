import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`tasks/${id}/`).then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, description };
    if (id) {
      await api.put(`tasks/${id}/`, data);
    } else {
      await api.post("tasks/", data);
    }
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          {id ? "Editar" : "Criar"} Tarefa
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            rows={4}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="mt-2 text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}