import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post("auth/jwt/create/", { username, password });
    login(res.data.access, res.data.refresh);
    navigate("/tasks");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
      <p>
        Não tem conta?{" "}
        <Link to="/register">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}