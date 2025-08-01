import type { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./auth/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path="/tasks/new" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
          <Route path="/tasks/edit/:id" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
          <Route path="*" element={<Login />} /> {/* fallback */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;