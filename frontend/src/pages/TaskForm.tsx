import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // usado para editar
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
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Editar" : "Criar"} Tarefa</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
      <button type="submit">Salvar</button>
    </form>
  );
}