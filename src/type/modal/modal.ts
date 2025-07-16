import { Food, Address, Category } from "../index";

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

export interface ModalAddressProps extends BaseModalProps {
  address?: Address;
  onSubmit: (address: any) => void;
}

export interface ModalCategoryProps extends BaseModalProps {
  category?: Category;
  variant: "add" | "edit" | "delete";
  onSubmit: (category: any) => void;
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
  | {
      type: "address";
      variant: "add" | "edit";
      isOpen: boolean;
      address?: Address;
      onSubmit: (address: any) => void;
    }
  | {
      type: "category";
      variant: "add" | "edit" | "delete";
      isOpen: boolean;
      category?: Category;
      onSubmit: (category: any) => void;
    }
  | { type: null };
