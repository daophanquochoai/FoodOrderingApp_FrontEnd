import React, { useState } from "react";
import { FloatingSelect } from "../input";
import { useProvinces } from "../../hooks/address/useProvinces";
import { useWards } from "../../hooks/address/useWards";
import { Address } from "../../type";
import { formatFullAddress } from "../../utils";

interface AddressSelectorProps {
    selectedAddressId: string;
    onAddressSelect: (addressId: string) => void;
    onNewAddressSave: (address: any) => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
    selectedAddressId,
    onAddressSelect,
    onNewAddressSave
}) => {
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddressData, setNewAddressData] = useState({
        address: "",
        province: "",
        ward: "",

    });
    const [formError, setFormError] = useState("");

    // Mock saved addresses - thay bằng data từ API
    const savedAddresses: Address[] = [
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
    ];

    const { provinces, getProvinceByCode } = useProvinces();
    const { wards, getWardByCode } = useWards(newAddressData.province);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddressData({ ...newAddressData, [e.target.id]: e.target.value });
        setFormError("");
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        
        if (id === "province") {
            setNewAddressData({ ...newAddressData, [id]: value, ward: "" });
        } else {
            setNewAddressData({ ...newAddressData, [id]: value });
        }
        setFormError("");
    };

    const handleAddressSelect = (addressId: string) => {
        onAddressSelect(addressId);
        setShowAddAddressForm(false);
        setFormError("");
    };

    const handleAddNewAddress = () => {
        setShowAddAddressForm(true);
        onAddressSelect("");
        setNewAddressData({
            address: "",
            province: "",
            ward: "",
        });
        setFormError("");
    };

    const handleCancelAddAddress = () => {
        setShowAddAddressForm(false);
        setNewAddressData({
            address: "",
            province: "",
            ward: "",
        });
        setFormError("");
    };

    const handleSaveNewAddress = () => {
        // Validate new address
        if (!newAddressData.address.trim()) {
            setFormError("Please enter address.");
            return;
        }
        if (!newAddressData.province) {
            setFormError("Please select province.");
            return;
        }
        if (!newAddressData.ward) {
            setFormError("Please select ward.");
            return;
        }

        const selectedProvince = getProvinceByCode(newAddressData.province);
        const selectedWard = getWardByCode(newAddressData.ward);

        const fullAddress = `${newAddressData.address}, ${selectedWard?.ward_name}, ${selectedProvince?.name}`;

        const newAddress = {
            ...newAddressData,
            fullAddress,
            provinceName: selectedProvince?.name,
            wardName: selectedWard?.ward_name
        };

        onNewAddressSave(newAddress);
        
        // Reset form
        setShowAddAddressForm(false);
        setFormError("");
        setNewAddressData({
            address: "",
            province: "",
            ward: "",
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <strong className="text-lg">Delivery</strong>
                {!showAddAddressForm && (
                    <button
                        type="button"
                        onClick={handleAddNewAddress}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                        + Add New Address
                    </button>
                )}
            </div>

            {!showAddAddressForm ? (
                /* Saved Addresses Selection */
                <div className="space-y-3">
                    {savedAddresses.map((address) => (
                        <div
                            key={address.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedAddressId === address.id
                                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleAddressSelect(address.id)}
                        >
                            <div className="flex items-start space-x-3">
                                <input
                                    type="radio"
                                    name="address"
                                    value={address.id}
                                    checked={selectedAddressId === address.id}
                                    onChange={() => handleAddressSelect(address.id)}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {address.isDefault === true && (
                                            <span className="px-2 py-1 bg-green-100 text-xs rounded-full text-green-700">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {formatFullAddress(address)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Add New Address Form */
                <div className="border rounded-lg p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <strong className="text-gray-800">Add New Address</strong>
                        <button
                            type="button"
                            onClick={handleCancelAddAddress}
                            className="text-gray-500 hover:text-gray-700 text-xl font-medium"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={newAddressData.address}
                                onChange={handleInputChange}
                                placeholder="Street Address"
                                className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                required
                            />
                            <label
                                htmlFor="address"
                                className={`absolute left-5 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                            >
                                Street Address
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FloatingSelect
                                label="Province"
                                id="province"
                                value={newAddressData.province}
                                onChange={handleSelectChange}
                                options={provinces}
                                placeholder="Select province"
                            />
                            <FloatingSelect
                                label="Ward"
                                id="ward"
                                value={newAddressData.ward}
                                onChange={handleSelectChange}
                                options={wards}
                                placeholder={newAddressData.province ? "Select ward" : "Select province first"}
                                disabled={!newAddressData.province}
                            />
                        </div>

                        {formError && (
                            <p className="text-sm text-red-500">{formError}</p>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleSaveNewAddress}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Save Address
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelAddAddress}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressSelector;