import { Food, Ingredient } from '../index';

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ModalOptionProductProps extends BaseModalProps {
    product?: Food;
}

export interface ModalIngredientProps extends BaseModalProps {
    ingredient?: Ingredient;
    variant: 'add' | 'edit' | 'delete';
}
