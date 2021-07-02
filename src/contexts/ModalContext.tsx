import { createContext, ReactNode, useState } from 'react';

type ModalContextType = {
    modalState: {
        isOpen: boolean,
        message?: string
    },
    openModel: (message: string) => void
    closeModal: () => void
};

type ModalStateType = {
    message?: string,
    isOpen: boolean
}

type ModalContextProps = {
    children: ReactNode
}

export const ModalContext = createContext({} as ModalContextType);

export function ModalContextProvider(props: ModalContextProps) {
    const [modalState, setState] = useState<ModalStateType>({ isOpen: false, message: '' });

    function openModel(message: string) {
        setState({ message, isOpen: true });
    }

    function closeModal() {
        setState({ isOpen: false });
    }

    return (
        <ModalContext.Provider value={{ modalState, openModel, closeModal }}>
            {props.children}
        </ModalContext.Provider>
    )
}