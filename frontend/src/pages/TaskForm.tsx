import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CategoryDropdown } from "../components/CategoryDropdown";
import ErrorBox from "../components/ErrorBox";
import api from "../services/api";

interface Category {
  id: number;
  name: string;
  color: string;
}

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category_id, setCategoryId] = useState<string>("");
  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#cccccc");

  useEffect(() => {
    if (id) {
      api.get(`tasks/${id}/`).then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategoryId(res.data.category.id ? res.data.category.id.toString() : "");
      });
    }
  }, [id]);

  useEffect(() => {
    api.get("tasks/categories/").then((res) => {
      setCategories(res.data.results || []);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCreateCategory = async () => {
    setError("");

    if (!newCategoryName.trim()) {      
      setError("Informe um nome para a categoria.");
      return;
    }

    const res = await api.post("tasks/categories/", {
      name: newCategoryName,
      color: newCategoryColor,
    });

    setCategories([...categories, res.data]);
    setCategoryId(res.data.id.toString());
    setNewCategoryName("");
    setNewCategoryColor("#cccccc");
    setShowNewCategory(false);
  };

  const handleChangeCategory = async (c: string) => {
    if (showNewCategory)
      setShowNewCategory(!showNewCategory);
    setCategoryId(c);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      description,
      category_id: category_id || null,
    };

    if (id)
      await api.put(`tasks/${id}/`, data);
    else
      await api.post("tasks/", data);
    
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

          <div className="flex flex-col border border-gray-300 rounded p-2 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Categoria</label>

            <div className="flex items-center space-between">
              <CategoryDropdown
                categories={categories}
                selectedId={category_id}
                onSelect={handleChangeCategory}
              />

              {!showNewCategory && (
                <button
                  type="button"
                  onClick={() => setShowNewCategory(!showNewCategory)}
                  className="ml-2 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition text-sm flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              )}
            </div>

            {showNewCategory && (
              <div className="mt-2 p-3 border border-gray-300 rounded dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <label
                        htmlFor="color"
                        className="block w-8 h-8 rounded-full border-2 cursor-pointer"
                        style={{ backgroundColor: newCategoryColor }}
                        title="Escolha uma cor"
                      ></label>
                      <input
                        id="color"
                        type="color"
                        value={newCategoryColor}
                        onChange={(e) => setNewCategoryColor(e.target.value)}
                        className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Ex: Urgente"
                      className="w-full border border-gray-300 rounded p-2 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  </div>
                
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    className="flex items-center justify-between ml-auto h-fit bg-green-600 text-white p-1 rounded hover:bg-green-700 transition text-sm"
                  >
                    <span className="pl-2">Add</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 p-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              
                { 
                  error &&
                  <div className="mt-3">
                    <ErrorBox message={error} />
                  </div>
                }
              </div>
            )}
          </div>

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