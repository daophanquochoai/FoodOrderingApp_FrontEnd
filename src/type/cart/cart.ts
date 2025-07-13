export interface OpenCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface CartItemProps {
    image: string;
    name: string;
    price: number;
    quantity: number;
}
