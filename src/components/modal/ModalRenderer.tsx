import { useSelector } from 'react-redux';
import { selectModal } from '@/store/selector/common/common.selector';
import { ModalType } from '@/type/store/common';
import ModalOptionProduct from './ModalOptionProduct';

export const ModalRenderer = () => {
    const modals = useSelector(selectModal);

    const renderModal = modals.map((modal) => {
        switch (modal.type) {
            case ModalType.DETAIL_PRODUCT:
                return <ModalOptionProduct key={modal.type} {...modal} />;
            default:
                return null;
        }
    });

    return <div>{renderModal}</div>;
};
