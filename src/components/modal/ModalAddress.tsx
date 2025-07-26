import React, { useState, useEffect } from 'react';
import ModalBase from './ModalBase';
import { ModalAddressProps } from '@/type/modal/modal';
import { Address } from '../../type';
import { useProvinces } from '../../hooks/address/useProvinces';
import { useWards } from '../../hooks/address/useWards';
import { FloatingSelect } from '../input';
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';

const ModalAddress: React.FC<any> = (props) => {
    const { data, type, variant } = props;
    const isEditing = data !== undefined && data !== null;
    const title = isEditing ? 'Edit Address' : 'Add New Address';
    const [formData, setFormData] = useState({
        fullAddress: '',
        province: '',
        ward: '',
        isDefault: false,
    });
    const [errors, setErrors] = useState({
        fullAddress: '',
        province: '',
        ward: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { provinces } = useProvinces();
    const { wards } = useWards(formData.province);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEditing && data) {
            setFormData({
                fullAddress: data.fullAddress,
                province: data.province,
                ward: data.ward,
                isDefault: data.isDefault || false,
            });
        } else {
            setFormData({
                fullAddress: '',
                province: '',
                ward: '',
                isDefault: false,
            });
        }
        setErrors({
            fullAddress: '',
            province: '',
            ward: '',
        });
    }, [isEditing, data]);

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

        setErrors(newErrors);
        return isValid;
    };

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const addressData: Address = {
                id: isEditing ? data.id : Date.now().toString(), // Generate new ID for new address
                fullAddress: formData.fullAddress,
                commune: formData.province,
                province: formData.ward,
                isDefault: formData.isDefault,
            };
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onClose();
        } catch (error) {
            console.error('Error submitting address:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div>
                        <Checkbox checked={formData.isDefault} onChange={handleCheckboxChange}>
                            Set as default address
                        </Checkbox>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            {isEditing ? 'Save Changes' : 'Add Address'}
                        </Button>
                    </div>
                </form>
            </div>
        </ModalBase>
    );
};

export default ModalAddress;
