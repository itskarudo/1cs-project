import { useContext, createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    const token = getCookie("access_token");
    if (!token) {
      setIsAuthReady(true);
      return;
    }

    const payload = jwtDecode(token);
    setAuthData(payload);
    setIsLoggedIn(true);
    setIsAuthReady(true);
  }, []);

  const login = async (formData) => {
    const url = "http://localhost:3000/auth/login";
    const response = await axios.post(
      url,
      {
        email: formData.email,
        password: formData.password,
      },
      { withCredentials: true },
    );
    if (response.status != 200) return;

    const token = getCookie("access_token");
    if (!token) return;

    const payload = jwtDecode(token);
    setAuthData(payload);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const url = "http://localhost:3000/auth/logout";
    await axios.post(url, {}, { withCredentials: true });
    setIsLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{
        isAuthReady,
        isLoggedIn,
        authData,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
