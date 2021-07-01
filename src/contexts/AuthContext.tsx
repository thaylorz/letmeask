import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

type AuthContextType = {
    user: UserType | undefined;
    loginInWithGoogle: () => Promise<void>;
    loginInWithGithub: () => Promise<void>;
    createNewUser: (name: string, email: string, password: string) => Promise<void>;
};

type UserType = firebase.User | null;

type AuthContextProviderProps = {
    children: ReactNode
};

const getErrorMessage = (errorType: string | number) => ({
    'auth/email-already-in-use': 'Já existir uma conta com o endereço de e-mail fornecido.',
    'auth/invalid-email': 'Endereço de e-mail não é valido.',
    'auth/operation-not-allowed': 'As contas de e-mail / senha não estão ativadas. Ative as contas de e-mail / senha no Firebase console, na guia Auth.',
    'auth/weak-password': 'A senha não é forte o suficiente.',
    '400': 'Endereço de e-mail inválido.'
})[errorType] || 'Não foi possível realizar o cadastro.';

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const history = useHistory();
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                setUser(user);
                // history.push('/rooms/new');
            }
        })

        return () => {
            unsubscribe();
        };
    }, []);

    async function createNewUser(name: string, email: string, password: string) {
        await auth.createUserWithEmailAndPassword(email, password)
            .then(UserCredential => {
                if (UserCredential.user) {
                    UserCredential.user.displayName = name;

                    setUser(user);

                    history.push('/rooms/new');
                }
            }).catch(error => window.alert(getErrorMessage(error.code)))
    }

    // async function loginWithEmail(email: string, password: string) {
    //     const { user } = await auth.signInWithEmailAndPassword(email, password);

    //     if (user) {
    //         if (!user.displayName || !user.photoURL) {
    //             throw new Error('Missing information from Google Account.')
    //         }

    //         setUser(user);
    //     }
    // }

    async function loginInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider);

        if (user) {
            setUser(user);
        }
    }

    async function loginInWithGithub() {
        const provider = new firebase.auth.GithubAuthProvider();
        const { user } = await auth.signInWithPopup(provider);

        if (user) {
            setUser(user);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loginInWithGoogle, loginInWithGithub, createNewUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}