import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might validate the token with the backend here.
    // For now, we'll decode the JWT (if any) or restore the user state.
    if (token) {
      try {
        // Simple mock decoding for demonstration.
        // Expecting token format: "mock-token-{role}"
        const role = token.split('-')[2];
        if (role) {
          setUser({ id: 1, name: `Demo ${role}`, role: role });
        } else {
           // Fallback or handle invalid token structure
           localStorage.removeItem('token');
           setToken(null);
        }
      } catch(e) {
        console.error("Invalid token format");
        localStorage.removeItem('token');
        setToken(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
