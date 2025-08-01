import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Senhas não coincidem");
      return;
    }

    try {
      await api.post("auth/users/", { username, password });
      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.username || "Erro ao cadastrar");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirme a senha"
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Cadastrar</button>
    </form>
  );
}