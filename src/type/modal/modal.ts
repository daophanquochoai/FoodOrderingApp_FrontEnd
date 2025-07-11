import { useState } from "react";
import { Food } from "../index";


export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export interface ModalOptionProductProps extends BaseModalProps {
  product?: Food;
}

export type ModalState =
  | {
      type: "product";
      variant: "options";
      isOpen: boolean;
      product: Food;
    }
  | { type: null };
