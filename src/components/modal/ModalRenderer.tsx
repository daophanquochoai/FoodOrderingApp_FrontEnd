import ModalOptionProduct from "./ModalOptionProduct";
import ModalReview from "./ModalReview";
import ModalAddress from "./ModalAddress";
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

    case "review":
      if (modalState.variant == "write")
        return (
          <ModalReview
            isOpen={modalState.isOpen}
            onClose={() => setModalState({ type: null })}
            productId={modalState.productId}
            onSubmit={modalState.onSubmit}
          />
        );
      break;

    case "address":
      if (modalState.variant === "add" || modalState.variant === "edit")
        return (
          <ModalAddress
            isOpen={modalState.isOpen}
            onClose={() => setModalState({ type: null })}
            address={modalState.address}
            onSubmit={modalState.onSubmit}
          />
        );
      break;

    default:
      break;
  }
};
