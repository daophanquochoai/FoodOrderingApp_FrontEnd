import React, { useState } from 'react';
import { ModalState } from '@/type/store/common';
import ModalBase from './ModalBase';
import { Button, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { FloatingInput, FloatingSelect } from '../input';
import dayjs, { Dayjs } from 'dayjs';

const voucherFoods = [
    {
        id: "1",
        voucher_id: "1",
        food_id: "1",
        food_name: "Cheeseburger",
        food_image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4="
    },
    {
        id: "2",
        voucher_id: "1",
        food_id: "2",
        food_name: "French Fries",
        food_image: "https://grillfood-demo.myshopify.com/cdn/shop/files/18_70bca4a1-06fd-4e2c-89aa-c90d291cffa4.jpg?v=1746869491&width=713"
    },
];

const voucherCategories = [
    {
        id: "1",
        voucher_id: "3",
        category_id: "1",
        category_name: "Family Combos",
        category_image: "https://vnsupermark.com/uploads/catalog/8ea4d4e682f1ff9f2e49b90bb3cd4f90-acb65f540b.png"
    },
    {
        id: "2",
        voucher_id: "3",
        category_id: "2",
        category_name: "2 Person Combos",
        category_image: "https://www.borenos.com/wp-content/uploads/2018/11/2-Person-Combo-Meal_4.3.png"
    },
];

const ModalVoucher: React.FC<ModalState> = ({ data, type, variant }) => {
    const dispatch = useDispatch();
    const [voucherType, setVoucherType] = useState(data?.type || '');
    const [startDate, setStartDate] = useState<Dayjs | null>(data?.startDate ? dayjs(data.startDate) : null);
    const [endDate, setEndDate] = useState<Dayjs | null>(data?.endDate ? dayjs(data.endDate) : null);
    const [isActive, setIsActive] = useState(data?.isActive || false);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleDeleted = () => {
        // Logic to delete the voucher
        console.log(`Deleting voucher with ID: ${data.id}`);
        onClose();
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
        return current && (startDate ? current <= startDate : false);
    };

    const getVoucherFoods = (voucherId: string) => {
        if (!voucherId) return [];
        return voucherFoods.filter(food => food.voucher_id === voucherId);
    };

    const getVoucherCategories = (voucherId: string) => {
        if (!voucherId) return [];
        return voucherCategories.filter(category => category.voucher_id === voucherId);
    };

    const renderFoodItems = (voucherId: string) => {
        const foods = getVoucherFoods(voucherId);
        
        if (foods.length === 0) return null;
        
        return (
            <div className="mb-4">
                <h3 className="font-medium mb-2">Applied Products:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {foods.map((food) => (
                        <div key={food.id} className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-100">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                <img 
                                    src={food.food_image} 
                                    alt={food.food_name} 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium truncate">{food.food_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderCategoryItems = (voucherId: string) => {
        const categories = getVoucherCategories(voucherId);
        
        if (categories.length === 0) return null;
        
        return (
            <div>
                <h3 className="font-medium mb-2">Applied Categories:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border border-gray-100">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                <img 
                                    src={category.category_image} 
                                    alt={category.category_name} 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium truncate">{category.category_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderVoucherScope = (voucherId: string) => {
        const foods = getVoucherFoods(voucherId);
        const categories = getVoucherCategories(voucherId);

        if (foods.length === 0 && categories.length === 0) {
            return <p className="text-sm text-gray-500">This voucher applies to all products and categories.</p>;
        }

        return (
            <div className="border rounded-md p-4 bg-gray-50 mt-1">
                {renderCategoryItems(data?.id)}
                {renderFoodItems(data?.id)}
            </div>
        );
    };

    return (
        <ModalBase type={type}>
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
                    <h2 className="text-xl font-semibold mb-6 text-center">{getModalTitle()}</h2>
                    <form className="space-y-4">
                        <div className='grid grid-cols-2 items-center gap-4'>
                            <FloatingInput
                                id='voucherCode'
                                label='Voucher Code'
                                type='text'
                                defaultValue={data?.code || ''}
                                error={false}
                                helperText={''}
                                readOnly={variant === 'view'}
                            />
                            <FloatingSelect
                                id='type'
                                label='Voucher Type'
                                value={voucherType}
                                onChange={(e) => setVoucherType(e.target.value)}
                                options={[
                                    { value: 'percentage', label: 'Percentage' },
                                    { value: 'fixed', label: 'Fixed Amount' },
                                ]}
                                disabled={variant === 'view'}
                            />
                        </div>
                        <FloatingInput
                            id='description'
                            label='Description'
                            type='text'
                            defaultValue={data?.description || ''}
                            error={false}
                            helperText={''}
                            readOnly={variant === 'view'}
                        />
                        <div className='grid grid-cols-3 items-center gap-4'>
                            <FloatingInput
                                id='value'
                                label='Voucher Value'
                                type='number'
                                defaultValue={data?.value || ''}
                                error={false}
                                helperText={''}
                                readOnly={variant === 'view'}
                            />
                            <FloatingInput
                                id='maxDiscount'
                                label='Max Discount'
                                type='number'
                                defaultValue={data?.maxDiscount || ''}
                                error={false}
                                helperText={''}
                                readOnly={variant === 'view'}
                            />
                            <FloatingInput
                                id='maxUsage'
                                label='Max Usage'
                                type='number'
                                defaultValue={data?.maxUsage || ''}
                                error={false}
                                helperText={''}
                                readOnly={variant === 'view'}
                            />
                        </div>
                        <div className='grid grid-cols-3 items-center gap-4'>
                            <div className='flex flex-col'>
                                <label htmlFor="startDate" className="text-sm mb-1 font-medium">Start Date</label>
                                <DatePicker
                                    id='startDate'
                                    className='w-full'
                                    format={'DD/MM/YYYY'}
                                    placeholder='Select start date'
                                    value={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    disabledDate={disabledStartDate}
                                    disabled={variant === 'view'}
                                    showNow
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="endDate" className="text-sm mb-1 font-medium">End Date</label>
                                <DatePicker
                                    id='endDate'
                                    className='w-full'
                                    format={'DD/MM/YYYY'}
                                    placeholder='Select end date'
                                    value={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    disabledDate={disabledEndDate}
                                    disabled={variant === 'view' || !startDate}
                                    showNow={false}
                                />
                            </div>
                            <FloatingSelect
                                id='status'
                                label='Status'
                                value={isActive ? 'active' : 'inactive'}
                                onChange={(e) => setIsActive(e.target.value === 'active')}
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ]}
                                disabled={variant === 'view'}
                            />
                        </div>
                        {variant === 'view' ? (
                            <>
                                <div className='grid grid-cols-3 gap-4 mt-6'>
                                    <div className='flex flex-col'>
                                        <label className="text-sm mb-1 font-medium">Created At</label>
                                        <p>{data?.createdAt ? dayjs(data.createdAt).format('DD/MM/YYYY') : 'N/A'}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className="text-sm mb-1 font-medium">Used Count</label>
                                        <p>{data?.usedCount || 0}</p>
                                    </div>
                                </div>
                                {renderVoucherScope(data?.id)}
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
        </ModalBase>
    );
};

export default ModalVoucher;