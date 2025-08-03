import React, { useState, useEffect } from 'react';
import ModalBase from './ModalBase';
import { useProvinces } from '../../hooks/address/useProvinces';
import { useWards } from '../../hooks/address/useWards';
import { FloatingSelect } from '../input';
import { Button, Checkbox, Spin } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import { Address } from '@/type/store/client/account/account.style';
import {
    selectAddressSelected,
    selectLoadingComponent,
} from '@/store/selector/client/account/account.selector';
import { createAddressInProfile, updateAddressInProfile } from '@/store/action/client/account/account.action';

const ModalAddress: React.FC<any> = (props) => {
    // selector
    const selectedAddress = useSelector(selectAddressSelected);
    const loadingComponent = useSelector(selectLoadingComponent);

    //hook
    const dispatch = useDispatch();

    // decontructor
    const { type } = props;

    // variable
    const isEditing = selectedAddress !== undefined && selectedAddress !== null;
    const title = isEditing ? 'Edit Address' : 'Add New Address';
    const [formData, setFormData] = useState({
        fullAddress: '',
        province: '',
        ward: '',
        isDefault: false,
        name: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState({
        fullAddress: '',
        province: '',
        ward: '',
        name: '',
        phoneNumber: '',
    });
    const { provinces } = useProvinces();
    const { wards } = useWards(formData.province);

    useEffect(() => {
        if (isEditing) {
            setFormData({
                fullAddress: selectedAddress?.address,
                province: selectedAddress?.province || '',
                ward: selectedAddress?.commune || '',
                isDefault: selectedAddress?.isDefault || false,
                name: selectedAddress?.name || '',
                phoneNumber: selectedAddress?.phoneNumber || '',
            });
        } else {
            setFormData({
                fullAddress: '',
                province: '',
                ward: '',
                isDefault: false,
                name: '',
                phoneNumber: '',
            });
        }
        setErrors({
            fullAddress: '',
            province: '',
            ward: '',
            name: '',
            phoneNumber: '',
        });
    }, [isEditing, selectedAddress]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (name in errors) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'province' ? { ward: '' } : {}), // Reset ward when province changes
        }));
        if (name in errors) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setFormData((prev) => ({
            ...prev,
            isDefault: e.target.checked,
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.fullAddress.trim()) {
            newErrors.fullAddress = 'Address is required';
            isValid = false;
        }

        if (!formData.province) {
            newErrors.province = 'Province is required';
            isValid = false;
        }

        if (!formData.ward) {
            newErrors.ward = 'Ward is required';
            isValid = false;
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        }

        if (formData.phoneNumber.length > 12 && formData.phoneNumber.length < 10) {
            newErrors.phoneNumber = 'Phone number should have 10-12 digits';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const addressData: Address = {
            id: selectedAddress?.id || 0,
            address: formData.fullAddress || '',
            province: formData?.province || '',
            commune: formData?.province || '',
            isDefault: false,
            isActive: true,
            phoneNumber: formData?.phoneNumber || '',
            name: formData?.name || '',
        };
        if (isEditing) {
            dispatch(updateAddressInProfile(addressData))
        } else {
            dispatch(createAddressInProfile(addressData));
        }
    };

    return (
        <ModalBase type={type}>
            <Spin spinning={loadingComponent}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-between gap-[20px]">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    placeholder="Name Receiver"
                                    className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                                >
                                    Name Receiver
                                </label>
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                )}
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber || ''}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                />
                                <label
                                    htmlFor="phoneNumber"
                                    className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                                >
                                    Phone Number
                                </label>
                                {errors.fullAddress && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.fullAddress}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="address"
                                name="fullAddress"
                                value={formData.fullAddress || ''}
                                onChange={handleInputChange}
                                placeholder="Street Address"
                                className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                            />
                            <label
                                htmlFor="address"
                                className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                            >
                                Street Address
                            </label>
                            {errors.fullAddress && (
                                <p className="mt-1 text-xs text-red-500">{errors.fullAddress}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <FloatingSelect
                                    label="Province"
                                    id="province"
                                    name="province"
                                    value={formData.province || ''}
                                    onChange={handleSelectChange}
                                    options={provinces}
                                    placeholder="Select province"
                                />
                                {errors.province && (
                                    <p className="mt-1 text-xs text-red-500">{errors.province}</p>
                                )}
                            </div>
                            <div>
                                <FloatingSelect
                                    label="Ward"
                                    id="ward"
                                    name="ward"
                                    value={formData.ward || ''}
                                    onChange={handleSelectChange}
                                    options={wards}
                                    placeholder={
                                        formData.province ? 'Select ward' : 'Select province first'
                                    }
                                    disabled={!formData.province}
                                />
                                {errors.ward && (
                                    <p className="mt-1 text-xs text-red-500">{errors.ward}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                {isEditing ? 'Save Changes' : 'Add Address'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Spin>
        </ModalBase>
    );
};

export default ModalAddress;
