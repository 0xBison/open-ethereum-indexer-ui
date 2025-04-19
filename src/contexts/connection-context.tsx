// src/contexts/connection-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface ConnectionContextType {
  isOnline: boolean;
  showError: boolean;
  setShowError: (show: boolean) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

export function ConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [showError, setShowError] = useState(false);

  const checkConnection = async () => {
    try {
      const response = await fetch("http://localhost:3050/events");
      const newStatus = response.ok;
      setIsOnline(newStatus);
      setShowError(!newStatus);
    } catch (error) {
      setIsOnline(false);
      setShowError(true);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ConnectionContext.Provider value={{ isOnline, showError, setShowError }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
