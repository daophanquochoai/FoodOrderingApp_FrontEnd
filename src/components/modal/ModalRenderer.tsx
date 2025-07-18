import ModalOptionProduct from './ModalOptionProduct';
import { useModalContext } from '../../hooks/context/ModalContext';
import ModalIngredient from './ModalIngredient';

export const ModalRenderer = () => {
    const { modalState, setModalState } = useModalContext();

    switch (modalState.type) {
        case 'product':
            if (modalState.variant == 'options')
                return (
                    <ModalOptionProduct
                        isOpen={modalState.isOpen}
                        onClose={() => setModalState({ type: null })}
                        product={modalState.product}
                    />
                );

            break;

        case 'ingredient':
            if (
                'variant' in modalState &&
                (modalState.variant === 'add' || modalState.variant === 'edit')
            )
                return (
                    <ModalIngredient
                        isOpen={modalState.isOpen}
                        onClose={() => setModalState({ type: null })}
                        ingredient={modalState.ingredient}
                        variant={modalState.variant}
                    />
                );
            break;

        default:
            break;
    }
};
