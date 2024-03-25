import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
