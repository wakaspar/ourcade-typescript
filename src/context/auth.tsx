import { createContext, useContext } from 'react';

export const AuthContext :any = createContext(null);

export function useAuth(){
    // console.log('AuthContext: ', AuthContext);
    return useContext(AuthContext);
}