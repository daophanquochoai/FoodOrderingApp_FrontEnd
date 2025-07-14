import { Food } from "../index";


export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface ModalOptionProductProps extends BaseModalProps {
  product?: Food;
}

export interface ModalReviewProps extends BaseModalProps {
  productId: string;
  onSubmit: (rating: number, comment: string) => void;
}

export type ModalState =
  | {
      type: "product";
      variant: "options";
      isOpen: boolean;
      product: Food;
    }
  | {
      type: "review";
      variant: "write";
      isOpen: boolean;
      productId: string;
      onSubmit: (rating: number, comment: string) => void;
    }
  | { type: null };
