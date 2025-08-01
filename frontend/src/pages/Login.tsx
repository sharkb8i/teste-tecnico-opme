import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 rounded shadow-md bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Não tem conta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium dark:text-blue-400"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}