import React, { useState, useEffect } from 'react';
import { ModalState } from '@/type/store/common';
import ModalBase from './ModalBase';
import { Button, DatePicker, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import { FloatingInput, FloatingSelect } from '../input';
import dayjs, { Dayjs } from 'dayjs';
import {
    selectLoadingComponent,
    selectVoucherSelected,
} from '@/store/selector/admin/voucher/voucher_admin.selector';
import { voucherEditSchema } from '@/validation/voucher.validation';
import Editor from '../editor/editor';
import { createVoucher, updateVoucher } from '@/store/action/admin/voucher/voucher_admin.action';

const ModalVoucher: React.FC<ModalState> = ({ data, type, variant }) => {
    // hooook
    const dispatch = useDispatch();

    // selector
    const selectVoucher = useSelector(selectVoucherSelected);
    const loadingComponent = useSelector(selectLoadingComponent);

    // Form state for validation
    const [formData, setFormData] = useState({
        code: selectVoucher?.code || '',
        description: selectVoucher?.desc || 'VOUCHER TEST',
        discountType: selectVoucher?.discountType?.toString() || '',
        discountValue: selectVoucher?.discountValue || '',
        maxDiscount: selectVoucher?.maxDiscount || '',
        maxUse: selectVoucher?.maxUse || '',
        startDate: selectVoucher?.startDate ? dayjs(selectVoucher.startDate) : null,
        endDate: selectVoucher?.endDate ? dayjs(selectVoucher.endDate) : null,
        status: selectVoucher?.status?.toString() || 'ACTIVE',
    });

    // Editor state
    const [editorData, setEditorData] = useState(selectVoucher?.desc || '');
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Update form data when selected voucher changes
    useEffect(() => {
        if (selectVoucher) {
            setFormData({
                code: selectVoucher.code || '',
                description: selectVoucher.desc || '',
                discountType: selectVoucher.discountType?.toString() || '',
                discountValue: selectVoucher.discountValue || '',
                maxDiscount: selectVoucher.maxDiscount || '',
                maxUse: selectVoucher.maxUse || '',
                startDate: selectVoucher.startDate ? dayjs(selectVoucher.startDate) : null,
                endDate: selectVoucher.endDate ? dayjs(selectVoucher.endDate) : null,
                status: selectVoucher.status?.toString() || 'ACTIVE',
            });
            setEditorData(selectVoucher.desc || '');
            setErrors({});
        }
    }, [selectVoucher]);

    // event handling
    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleDeleted = () => {
        const payload = {
            ...selectVoucher,
            status: 'DELETE',
        };
        dispatch(updateVoucher(payload));
        // onClose();
    };

    // Validation functions
    const validateField = async (field: string, value: any) => {
        try {
            // For maxDiscount, only validate if discountType is PERCENT
            if (field === 'maxDiscount' && formData.discountType !== 'PERCENT') {
                setErrors((prev) => ({ ...prev, [field]: '' }));
                return;
            }

            await voucherEditSchema.validateAt(field, { [field]: value });
            setErrors((prev) => ({ ...prev, [field]: '' }));
        } catch (error: any) {
            setErrors((prev) => ({ ...prev, [field]: error.message }));
        }
    };

    const validateForm = async () => {
        try {
            // Prepare form data for validation
            const validationData = {
                ...formData,
                maxDiscount: formData.discountType === 'PERCENT' ? formData.maxDiscount : undefined,
            };

            await voucherEditSchema.validate(validationData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error: any) {
            const newErrors: Record<string, string> = {};
            error.inner.forEach((err: any) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleInputChange = (field: string, value: any) => {
        const newFormData = { ...formData, [field]: value };
        setFormData(newFormData);
        validateField(field, value);

        // If discountType changes, also validate maxDiscount
        if (field === 'discountType') {
            validateField('maxDiscount', newFormData.maxDiscount);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            switch (variant) {
                case 'add':
                    dispatch(createVoucher(formData));
                    break;
                case 'edit':
                    dispatch(updateVoucher(formData));
                    break;
            }
        } else {
            dispatch(common.actions.setErrorMessage('Please fix the validation errors'));
        }
    };

    const getModalTitle = () => {
        switch (variant) {
            case 'add':
                return 'Create New Voucher';
            case 'edit':
                return 'Edit Voucher';
            default:
                return 'Voucher Details';
        }
    };

    const disabledStartDate = (current: Dayjs) => {
        return current && current < dayjs().startOf('day');
    };

    const disabledEndDate = (current: Dayjs) => {
        return current && (formData.startDate ? current <= formData.startDate : false);
    };

    const renderFoodItems = () => {
        if (!selectVoucher?.foods?.length) return null;

        return (
            <div className="mb-4">
                <h3 className="font-medium mb-2">Applied Products:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectVoucher.foods.map((food) => (
                        <div
                            key={food.id}
                            className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-100"
                        >
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium truncate">{food.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderCategoryItems = () => {
        if (!selectVoucher?.categories?.length) return null;

        return (
            <div>
                <h3 className="font-medium mb-2">Applied Categories:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectVoucher.categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-100"
                        >
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium truncate">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderVoucherScope = () => {
        const hasFoods = selectVoucher?.foods?.length;
        const hasCategories = selectVoucher?.categories?.length;

        if (!hasFoods && !hasCategories) {
            return (
                // <p className="text-sm text-gray-500">
                //     This voucher applies to all products and categories.
                // </p>
                <></>
            );
        }

        return (
            <div className="border rounded-md p-4 bg-gray-50 mt-1">
                {renderCategoryItems()}
                {renderFoodItems()}
            </div>
        );
    };

    return (
        <ModalBase type={type}>
            <Spin spinning={loadingComponent}>
                {variant === 'delete' ? (
                    <div>
                        <p className="text-center text-red-600">
                            <>
                                Are you sure you want to delete the voucher <b>"{data.code}"</b> ?
                            </>
                        </p>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" danger onClick={handleDeleted}>
                                Delete Voucher
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-6 text-center">
                            {getModalTitle()}
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <FloatingInput
                                    id="voucherCode"
                                    label="Voucher Code"
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => handleInputChange('code', e.target.value)}
                                    error={!!errors.code}
                                    helperText={errors.code || ''}
                                    readOnly={variant === 'view'}
                                />
                                <div className="flex flex-col">
                                    <FloatingSelect
                                        id="type"
                                        label="Voucher Type"
                                        value={formData.discountType}
                                        onChange={(e) =>
                                            handleInputChange('discountType', e.target.value)
                                        }
                                        options={[
                                            { value: 'PERCENT', label: 'Percentage' },
                                            { value: 'CASH', label: 'Cash' },
                                        ]}
                                        disabled={variant === 'view'}
                                    />
                                    {errors.discountType && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.discountType}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="text-sm mb-1 font-medium">
                                    Description
                                </label>
                                <Editor
                                    editorData={editorData}
                                    setEditorData={(data) => {
                                        setEditorData(data);
                                        handleInputChange('description', data);
                                    }}
                                    disabled={variant === 'view'}
                                />
                                {errors.description && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.description}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <FloatingInput
                                    id="value"
                                    label="Voucher Value"
                                    type="number"
                                    value={formData.discountValue}
                                    onChange={(e) =>
                                        handleInputChange('discountValue', Number(e.target.value))
                                    }
                                    error={!!errors.discountValue}
                                    helperText={errors.discountValue || ''}
                                    readOnly={variant === 'view'}
                                />
                                {formData.discountType != 'CASH' && (
                                    <FloatingInput
                                        id="maxDiscount"
                                        label="Max Discount"
                                        type="number"
                                        value={formData.maxDiscount}
                                        onChange={(e) =>
                                            handleInputChange('maxDiscount', Number(e.target.value))
                                        }
                                        error={!!errors.maxDiscount}
                                        helperText={errors.maxDiscount || ''}
                                        readOnly={variant === 'view'}
                                    />
                                )}
                                <FloatingInput
                                    id="maxUsage"
                                    label="Max Usage"
                                    type="number"
                                    value={formData.maxUse}
                                    onChange={(e) =>
                                        handleInputChange('maxUse', Number(e.target.value))
                                    }
                                    error={!!errors.maxUse}
                                    helperText={errors.maxUse || ''}
                                    readOnly={variant === 'view'}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="startDate" className="text-sm mb-1 font-medium">
                                        Start Date
                                    </label>
                                    <DatePicker
                                        id="startDate"
                                        className={`w-full ${
                                            errors.startDate ? 'border-red-500' : ''
                                        }`}
                                        format={'DD/MM/YYYY'}
                                        placeholder="Select start date"
                                        value={formData.startDate}
                                        onChange={(date) => handleInputChange('startDate', date)}
                                        disabledDate={disabledStartDate}
                                        disabled={variant === 'view'}
                                        showNow
                                    />
                                    {errors.startDate && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.startDate}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="endDate" className="text-sm mb-1 font-medium">
                                        End Date
                                    </label>
                                    <DatePicker
                                        id="endDate"
                                        className={`w-full ${
                                            errors.endDate ? 'border-red-500' : ''
                                        }`}
                                        format={'DD/MM/YYYY'}
                                        placeholder="Select end date"
                                        value={formData.endDate}
                                        onChange={(date) => handleInputChange('endDate', date)}
                                        disabledDate={disabledEndDate}
                                        disabled={variant === 'view' || !formData.startDate}
                                        showNow={false}
                                    />
                                    {errors.endDate && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errors.endDate}
                                        </span>
                                    )}
                                </div>
                                {variant == 'view' && (
                                    <div className="flex flex-col">
                                        <FloatingSelect
                                            id="status"
                                            label="Status"
                                            value={formData.status}
                                            onChange={(e) =>
                                                handleInputChange('status', e.target.value)
                                            }
                                            options={[
                                                { value: 'ACTIVE', label: 'Active' },
                                                { value: 'DELETE', label: 'Delete' },
                                                { value: 'EXPIRED', label: 'Expired' },
                                            ]}
                                            disabled={variant === 'view'}
                                        />
                                        {errors.status && (
                                            <span className="text-red-500 text-xs mt-1">
                                                {errors.status}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            {variant === 'view' ? (
                                <>
                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        <div className="flex flex-col">
                                            <label className="text-sm mb-1 font-medium">
                                                Used Count
                                            </label>
                                            <p>{selectVoucher?.usedCount || 0}</p>
                                        </div>
                                    </div>
                                    {renderVoucherScope()}
                                </>
                            ) : (
                                <div className="flex justify-end space-x-3 mt-6">
                                    <Button onClick={onClose}>Cancel</Button>
                                    <Button type="primary" htmlType="submit">
                                        {variant === 'add' ? 'Create Voucher' : 'Update Voucher'}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </Spin>
        </ModalBase>
    );
};

export default ModalVoucher;
