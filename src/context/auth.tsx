import { createContext, useContext } from 'react';

export const AuthContext :any = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}