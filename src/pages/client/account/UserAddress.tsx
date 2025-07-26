import { useEffect, useState } from 'react';
import { Address } from '@/type';
import { Button, Card, Tag, Empty, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { formatFullAddress } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { fetchAddress } from '@/store/action/client/account/account.action';
import { selectAddress } from '@/store/selector/client/account/account.selector';

const UserAddress = () => {
    // disatch
    const dispatch = useDispatch();

    // selector
    const address = useSelector(selectAddress);

    // useEffect
    useEffect(() => {
        dispatch(fetchAddress());
    }, []);

    console.log(address);

    const handleOpenAddAddressModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ADDRESS,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditAddressModal = (address: Address) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ADDRESS,
                variant: 'edit',
                data: address,
            })
        );
    };

    const handleDeleteAddress = (id: string) => {};

    const handleSetDefaultAddress = (id: string) => {};

    return (
        <div className="bg-white p-6 border border-gray-300 rounded-lg">
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My addresses</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleOpenAddAddressModal}
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        Add New Address
                    </Button>
                </div>

                {!address?.data || address?.data?.length === 0 ? (
                    <Empty description="No addresses found" className="my-12" />
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {address?.data.map((address) => (
                            <Card
                                key={address.id}
                                className={`shadow-sm ${
                                    address.isDefault ? 'border-orange-500' : 'border-gray-200'
                                }`}
                            >
                                <div className="flex flex-col justify-between">
                                    <div>
                                        {address.isDefault && (
                                            <Tag
                                                color="orange"
                                                icon={<CheckCircleOutlined />}
                                                className="mt-2"
                                            >
                                                Default Address
                                            </Tag>
                                        )}
                                        <p className="text-lg font-medium">
                                            {formatFullAddress(address)}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button type="text" icon={<EditOutlined />}>
                                            Edit
                                        </Button>
                                        <Popconfirm
                                            title="Delete this address"
                                            description="Are you sure you want to delete this address?"
                                            okText="Yes"
                                            cancelText="No"
                                            okButtonProps={{ danger: true }}
                                        >
                                            <Button type="text" danger icon={<DeleteOutlined />}>
                                                Delete
                                            </Button>
                                        </Popconfirm>
                                        {!address.isDefault && (
                                            <Button type="link">Set as Default</Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAddress;
