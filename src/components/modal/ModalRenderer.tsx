import { useSelector } from 'react-redux';
import { selectModal } from '@/store/selector/common/common.selector';
import { ModalType } from '@/type/store/common';
import ModalOptionProduct from './ModalOptionProduct';
import ModalAddress from './ModalAddress';
import ModalCategory from './ModalCategory';
import ModalReview from './ModalReview';
import ModalIngredient from './ModalIngredient';
import ModalProductManagementView from './ModalProductManagementViewDelete';
import ModalProductManagementAddEdit from './ModalProductManagementViewDelete';

export const ModalRenderer = () => {
    const modals = useSelector(selectModal);

    const renderModal = modals.map((modal) => {
        switch (modal.type) {
            case ModalType.DETAIL_PRODUCT:
                return <ModalOptionProduct key={modal.type} {...modal} />;
            case ModalType.ADDRESS:
                return <ModalAddress key={modal.type} {...modal} />;
            case ModalType.CATEGORY:
                return <ModalCategory key={modal.type} {...modal} />;
            case ModalType.REVIEW:
                return <ModalReview key={modal.type} {...modal} />;
            case ModalType.INGREDIENT:
                return <ModalIngredient key={modal.type} {...modal} />;
            case ModalType.PRODUCT_MANAGEMENT:
                if (modal.variant == 'view' || modal.variant == 'delete')
                    return <ModalProductManagementView key={modal.type} {...modal} />;
            default:
                return null;
        }
    });

    return <div>{renderModal}</div>;
};
