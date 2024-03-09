import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const authToken = `Bearer ${token}`;

  let isLoggedIn = !!token;

  //Logout user
  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  //Store token in local storage
  const storeTokenInLS = (token) => {
    setToken(token);
    return localStorage.setItem("token", token);
  };

  //Authenticating user
  useEffect(() => {
    const userAuthentication = async () => {
      try {
        setisLoading(true);
        const response = await fetch(
          `${window.location.origin}/api/auth/user`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (response.status === 200) {
          const user = await response.json();
          console.log("User authenticated", user.userData);
          setUser(user.userData);
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      } catch (error) {
        console.log("Error while authenticating user", error);
      }
    };
    userAuthentication();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        LogoutUser,
        storeTokenInLS,
        isLoggedIn,
        user,
        authToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContextValue;
};
