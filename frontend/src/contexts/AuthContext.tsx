import { createContext, ReactNode, useState, useContext } from "react";

import { api } from "services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function signOut() {

    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log('Error on signout');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 15, // Expira em 15 dias
                path: '/' // Quais caminhos terão acesso ao cookies (/ = todos)
            });

            setUser({
                id,
                name,
                email
            });

            // Enviar token nas próximas requisições
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/dashboard');

        } catch(err) {
            console.log("Access Error:", err);
        }
    } 

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

