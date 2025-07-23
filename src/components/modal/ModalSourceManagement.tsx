import { ModalState, ModalType } from '@/type/store/common';
import { Button, Descriptions, DescriptionsProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react'
import { Link } from 'react-router-dom';
import ModalBase from './ModalBase';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';

const ModalSourceManagement: React.FC<ModalState> = ({ data, type, variant }) => {

    const dispatch = useDispatch();


    const sourceInfo: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: 'Tên nhà cung cấp',
            children: data.name,
        },
        {
            key: 'taxCode',
            label: 'Mã thuế',
            children: data.taxCode,
        },
        {
            key: 'address',
            label: 'Địa chỉ',
            children: data.address,
        },
        {
            key: 'phoneNumber',
            label: 'Số điện thoại',
            children: data.phoneNumber,
        },
        {
            key: 'email',
            label: 'Email',
            children: data.email,
        },
        {
            key: 'link',
            label: 'Link',
            children: data.link ? <Link to='#'>{data.link}</Link> : "No link",
        },
        {
            key: 'create_at',
            label: 'Ngày tạo',
            children: dayjs(data.create_at).format('DD/MM/YYYY'),
        },
        {
            key: 'late_update_time',
            label: 'Ngày cập nhật',
            children: data.late_update_time ? dayjs(data.late_update_time).format('DD/MM/YYYY') : "No update",
        },

    ];

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(ModalType.SOURCE_MANAGEMENT));
    };

    const handleDeleted = () => {
        console.log("--------delete--------", data.id);
    }


    if(variant == "view"){
        return (
            <ModalBase type={type}>
                <Descriptions
                    title="Thông tin nhà cung cấp"
                    bordered
                    column={1}
                    items={sourceInfo}
                />
            </ModalBase>
        )
    }

    if(variant == "delete"){
        return (
            <ModalBase type={type}>    
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">Delete source</h2>
                </div>
                <div className="">
                    <p className="text-center text-red-600">
                        <>
                            Are you sure you want to delete source <b>"{data.name}"</b>{' '}
                            ?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" danger onClick={handleDeleted}>
                            Delete
                        </Button>
                    </div>
                </div>
            </ModalBase>
        )
    }

    return (
        <div>ModalSourceManagement</div>
    )
}

export default ModalSourceManagement