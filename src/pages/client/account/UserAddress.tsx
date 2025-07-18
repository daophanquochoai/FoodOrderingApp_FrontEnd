import { useState } from "react";
import { Address } from "@/type";
import { Button, Card, Tag, Empty, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { formatFullAddress } from "../../../utils";
import { useDispatch } from 'react-redux';
import { common } from "@/store/reducer";
import { ModalType } from "@/type/store/common";

const UserAddress = () => {
    const [addressList, setAddressList] = useState<Address[]>([
        {
            id: "1",
            fullAddress: "123 Nguyễn Huệ",
            province: "79",
            ward: "27316",
            isDefault: true,
        },
        {
            id: "2",
            fullAddress: "456 Lê Lợi",
            province: "79",
            ward: "26743",
            isDefault: false,
        }
    ]);

    const dispatch = useDispatch();

    const handleOpenAddAddressModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ADDRESS,
                variant: "add",
                data: null
            })
        );
    };

    const handleOpenEditAddressModal = (address: Address) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.ADDRESS,
                variant: "edit",
                data: address
            })
        );
    };

    const handleDeleteAddress = (id: string) => {
        const filteredAddresses = addressList.filter(addr => addr.id !== id);
        // Nếu xóa địa chỉ mặc định và vẫn còn địa chỉ khác, đặt địa chỉ đầu tiên làm mặc định
        const deletedAddress = addressList.find(addr => addr.id === id);
        if (deletedAddress?.isDefault && filteredAddresses.length > 0) {
            filteredAddresses[0] = { ...filteredAddresses[0], isDefault: true };
        }
        
        setAddressList(filteredAddresses);
    };

    const handleSetDefaultAddress = (id: string) => {
        const updatedAddresses = addressList.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        }));
        setAddressList(updatedAddresses);
    };

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

                {addressList.length === 0 ? (
                    <Empty
                        description="No addresses found"
                        className="my-12"
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {addressList.map((address) => (
                            <Card 
                                key={address.id} 
                                className={`shadow-sm ${address.isDefault ? 'border-orange-500' : 'border-gray-200'}`}
                            >
                                <div className="flex flex-col justify-between">
                                    <div>
                                        {address.isDefault && (
                                            <Tag color="orange" icon={<CheckCircleOutlined />} className="mt-2">
                                                Default Address
                                            </Tag>
                                        )}
                                        <p className="text-lg font-medium">{formatFullAddress(address)}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button 
                                            type="text" 
                                            icon={<EditOutlined />} 
                                            onClick={() => handleOpenEditAddressModal(address)}
                                        >
                                            Edit
                                        </Button>
                                        <Popconfirm
                                            title="Delete this address"
                                            description="Are you sure you want to delete this address?"
                                            onConfirm={() => handleDeleteAddress(address.id)}
                                            okText="Yes"
                                            cancelText="No"
                                            okButtonProps={{ danger: true }}
                                        >
                                            <Button type="text" danger icon={<DeleteOutlined />}>
                                                Delete
                                            </Button>
                                        </Popconfirm>
                                        {!address.isDefault && (
                                            <Button 
                                                type="link" 
                                                onClick={() => handleSetDefaultAddress(address.id)}
                                            >
                                                Set as Default
                                            </Button>
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