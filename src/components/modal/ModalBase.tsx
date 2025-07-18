import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import { selectModal } from '@/store/selector/common/common.selector';

const ModalBase: React.FC<any> = ({ children, type }) => {
    // hook
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    if (!modal.some((m) => m.type === type)) {
        return;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="container flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 min-w-[300px] relative sm:w-[85%] md:w-[75%]">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <IoMdClose className="size-4" />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalBase;
