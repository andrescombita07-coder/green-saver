import { loginRemoteUser, registerRemoteUser } from "@/src/services/backend";
import {
    clearStoredCurrentUser,
    getStoredCurrentUser,
    getStoredUsers,
    removeStoredUserByEmail,
    setStoredCurrentUser,
    setStoredUsers,
} from "@/src/services/storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const getDisplayName = (email) =>
  email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usuario administrador fijo
  const adminUser = {
    email: "admin@greensaver.com",
    password: "admin",
    role: "admin",
    name: "Administrador",
  };

  // 🔄 Cargar sesión guardada
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedUser = await getStoredCurrentUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.log("Error cargando sesión", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    // Admin
    if (
      email === adminUser.email &&
      password === adminUser.password
    ) {
      await setStoredCurrentUser(adminUser);
      setUser(adminUser);
      return;
    }

    // Backend (si existe endpoint de auth)
    try {
      const remoteSession = await loginRemoteUser({ email, password });

      const remoteUser = {
        email: remoteSession?.email || email,
        role: remoteSession?.role || "user",
        name: remoteSession?.name || getDisplayName(email),
        phone: remoteSession?.phone || "",
      };

      await setStoredCurrentUser(remoteUser);
      setUser(remoteUser);
      return;
    } catch {
      // Si el backend no tiene auth aún o está caído, usamos fallback local.
    }

    // Usuarios registrados
    const users = await getStoredUsers();

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Credenciales incorrectas");
    }

    const sessionUser = {
      ...foundUser,
      name: foundUser.name || getDisplayName(foundUser.email),
    };

    await setStoredCurrentUser(sessionUser);
    setUser(sessionUser);
  };

  // 📝 REGISTRO
  const register = async ({ email, password, name, phone }) => {
    const users = await getStoredUsers();

    const exists = users.find((u) => u.email === email);
    if (exists) {
      throw new Error("El usuario ya existe");
    }

    const newUser = {
      email,
      password,
      role: "user",
      name: name?.trim() || getDisplayName(email),
      phone: phone?.trim() || "",
    };

    await setStoredUsers([...users, newUser]);

    // Sincronización no bloqueante con backend actual.
    try {
      await registerRemoteUser({
        name: newUser.name,
        city: "N/A",
        monthlyConsumption: 0,
      });
    } catch {
      // El registro local sigue funcionando aunque backend no esté disponible.
    }

    const sessionUser = {
      ...newUser,
      name: newUser.name || getDisplayName(newUser.email),
    };

    await setStoredCurrentUser(sessionUser);
    setUser(sessionUser);

    return sessionUser;
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await clearStoredCurrentUser();
    setUser(null);
  };

  const getRegisteredUsers = async () => getStoredUsers();

  const deleteUser = async (email) => {
    const nextUsers = await removeStoredUserByEmail(email);

    if (user?.email === email) {
      await clearStoredCurrentUser();
      setUser(null);
    }

    return nextUsers;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        getRegisteredUsers,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);