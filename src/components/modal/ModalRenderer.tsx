import ModalOptionProduct from "./ModalOptionProduct";
import { useModalContext } from "../../hooks/context/ModalContext";

export const ModalRenderer = () => {
  const { modalState, setModalState } = useModalContext();

  switch (modalState.type) {
    case "product":
      if (modalState.variant == "options")
        return (
          <ModalOptionProduct
            isOpen={modalState.isOpen}
            onClose={() => setModalState({ type: null })}
            product={modalState.product}
          />
        );

      break;

    default:
      break;
  }
};
