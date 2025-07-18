import React, { createContext, useContext, useState } from 'react';
import { Food, Ingredient } from '../../type';

export type ModalState =
    | {
          type: 'product';
          variant: 'options';
          isOpen: boolean;
          product: Food;
      }
    | {
          type: 'ingredient';
          variant: 'add' | 'edit' | 'delete';
          isOpen: boolean;
          ingredient?: Ingredient;
      }
    | { type: null };

type ModalContextType = {
    modalState: ModalState;
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalState, setModalState] = useState<ModalState>({ type: null });

    return (
        <ModalContext.Provider value={{ modalState, setModalState }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
