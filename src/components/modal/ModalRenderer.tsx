import { useSelector } from 'react-redux';
import { selectModal } from '@/store/selector/common/common.selector';
import { ModalType } from '@/type/store/common';
import ModalOptionProduct from './ModalOptionProduct';
import ModalAddress from './ModalAddress';
import ModalCategory from './ModalCategory';
import ModalReview from './ModalReview';
import ModalIngredient from './ModalIngredient';
import ModalProductManagementView from './ModalProductManagementViewDelete';
import ModalSpoilIngredient from './ModalSpoilIngredient';
import ModalSourceManagement from './ModalSourceManagement';
import ModalOrderManagement from './ModalOrderManagement';
import ModalVoucher from './ModalVoucher';
import ModalEmployeeManagement from './ModalEmployeeManagement';
import ModalRecipeManagement from './ModalRecipeManagement';
import ModalImportManagement from './ModalImportManagement';
import ModalOrderChef from './ModalOrderChef';
import ModalOrderShipper from './ModalOrderShipper';

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
            case ModalType.SPOIL_INGREDIENT:
                return <ModalSpoilIngredient key={modal.type} {...modal} />;
            case ModalType.SOURCE_MANAGEMENT:
                return <ModalSourceManagement key={modal.type} {...modal} />;
            case ModalType.ORDER_MANAGEMENT:
                return <ModalOrderManagement key={modal.type} {...modal} />;
            case ModalType.ORDER_CHEF:
                return <ModalOrderChef key={modal.type} {...modal} />;
            case ModalType.ORDER_SHIPPER:
                return <ModalOrderShipper key={modal.type} {...modal} />;
            case ModalType.EMP_ACCCOUNT_MANAGEMENT:
                return <ModalEmployeeManagement key={modal.type} {...modal} />;
            case ModalType.RECIPE_MANAGEMENT:
                return <ModalRecipeManagement key={modal.type} {...modal} />;
            case ModalType.IMPORT_MANAGEMENT:
                return <ModalImportManagement key={modal.type} {...modal} />;
            case ModalType.PRODUCT_MANAGEMENT:
                if (modal.variant == 'view' || modal.variant == 'delete')
                    return <ModalProductManagementView key={modal.type} {...modal} />;
            case ModalType.VOUCHER:
                return <ModalVoucher key={modal.type} {...modal} />;
            default:
                return null;
        }
    });

    return <div>{renderModal}</div>;
};
