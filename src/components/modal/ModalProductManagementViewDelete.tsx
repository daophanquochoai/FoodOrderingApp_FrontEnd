import { Food } from '@/type';
import { ModalState } from '@/type/store/common';
import { Button, Descriptions, DescriptionsProps, Image, Rate, Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import ModalBase from './ModalBase';
import { common } from '@/store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFoodSelected
} from '@/store/selector/admin/food/food_manager.selector';
import { updateFood } from '@/store/action/admin/food/food_manager.action';

const ModalProductManagementViewDelete: React.FC<ModalState> = ({ data, type, variant }) => {

    // hook
    const dispatch = useDispatch();

    // selector
    const selectedFood = useSelector(selectFoodSelected);

    const foodInfo: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: 'Tên món',
            children: data.name,
        },
        {
            key: 'desc',
            label: 'Mô tả',
            children: data.desc,
        },
        {
            key: 'status',
            label: 'Trạng thái',
            children: data.status ? 'Còn bán' : 'Ngừng bán',
        },
        {
            key: 'image',
            label: 'Hình ảnh',
            children: <Image width={100} src={data.image} />,
        },
        {
            key: 'create_date',
            label: 'Ngày tạo',
            children: dayjs(data.create_date).format('DD/MM/YYYY'),
        },
        {
            key: 'rate',
            label: 'Đánh giá',
            children: data.rate ? (
                <Rate value={data.rate} allowHalf={true} style={{ fontSize: '16px' }} />
            ) : (
                'Chưa có'
            ),
        },
    ];

    const sizeColumns = [
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <p>${price}</p>,
        },
    ];

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleDeleted = () => {
        dispatch(
            updateFood({
                id: selectedFood?.id,
                data: {
                    ...selectedFood,
                    isActive: false
                },
            })
        );
    };

    return (
        <ModalBase type={type}>
            {variant == 'delete' ? (
                <>
                    <div className="">
                        <p className="text-center text-red-600">
                            <>
                                Are you sure you want to delete the food <b>"{data.name}"</b> ?
                            </>
                        </p>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" danger onClick={handleDeleted}>
                                Delete Food
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <h2 className="text-xl font-semibold mb-6 text-center">{data.name}</h2>
                    </div>
                    <div>
                        <Descriptions
                            title="Thông tin món ăn"
                            bordered
                            column={1}
                            items={foodInfo}
                        />

                        <h3 style={{ marginTop: 24 }} className="text-[14px] font-medium mb-2">
                            Kích thước và giá tiền
                        </h3>
                        <Table
                            dataSource={data.sizes?.map((item, index) => ({ ...item, key: index }))}
                            columns={sizeColumns}
                            pagination={false}
                        />
                    </div>
                </>
            )}
        </ModalBase>
    );
};

export default ModalProductManagementViewDelete;
