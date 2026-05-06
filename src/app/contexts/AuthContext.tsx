import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  userType: "empresa" | "fornecedor" | null;
  login: (type: "empresa" | "fornecedor") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<"empresa" | "fornecedor" | null>(null);

  const login = (type: "empresa" | "fornecedor") => {
    setUserType(type);
  };

  const logout = () => {
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
