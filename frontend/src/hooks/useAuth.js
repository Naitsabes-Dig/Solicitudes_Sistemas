import { useState } from "react";
import api from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (correo, contrasena) => {
    try {
      const res = await api.post("/auth/login", { correo, contrasena });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return { user, token, login, logout };
}
