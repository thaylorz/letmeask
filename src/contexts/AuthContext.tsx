import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import firebase from "firebase";

type AuthContextType = {
    user: UserType | undefined;
    loginInWithGoogle: () => Promise<void>;
};

type UserType = firebase.User | undefined;

type AuthContextProviderProps = {
    children: ReactNode
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                if (!user.displayName || !user.photoURL) {
                    throw new Error('Missing information from Google Account.')
                }

                setUser(user);
            }
        })

        return () => {
            unsubscribe();
        };
    }, []);

    async function handleLoginWithEmail(email: string, password: string) {
        const { user } = await auth.signInWithEmailAndPassword(email, password);

        if (user) {
            if (!user.displayName || !user.photoURL) {
                throw new Error('Missing information from Google Account.')
            }

            setUser(user);
        }
    }

    async function loginInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider);

        if (user) {
            if (!user.displayName || !user.photoURL) {
                throw new Error('Missing information from Google Account.')
            }

            setUser(user);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loginInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}