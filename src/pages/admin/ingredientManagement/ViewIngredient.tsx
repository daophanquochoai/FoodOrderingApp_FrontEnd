import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
    Button,
    DatePicker,
    Descriptions,
    DescriptionsProps,
    Pagination,
    Spin,
    Table,
    TableColumnsType,
    Tag,
} from 'antd';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilterHistoryIngredient,
    selectHistory,
    selectIngredientsSelected,
    selectLoadingHistory,
} from '@/store/selector/admin/ingredients/ingredients.selector';
import { fetchHistory } from '@/store/action/admin/ingredients/ingredient.action';
import { HistoryImportOrExportDto, HistoryIngredientsDto } from '@/type/store/admin/history/history.style';
import './style.css';

const ViewIngredient = () => {
    // selector
    const selectedFood = useSelector(selectIngredientsSelected);
    const loadingHistory = useSelector(selectLoadingHistory);
    const historyList = useSelector(selectHistory);
    const filterHistory = useSelector(selectFilterHistoryIngredient);

    // hook
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect
    useEffect(() => {
        dispatch(fetchHistory());
    }, []);

    const getStatusTag = (status: boolean) => {
        switch (status) {
            case true:
                return <Tag color="green">Active</Tag>;
            default:
                return <Tag color="red">InActive</Tag>;
        }
    };

    const foodInfo: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: 'Ingredient name',
            children: selectedFood?.name,
        },
        {
            key: 'unit',
            label: 'Unit',
            children: selectedFood?.unit,
        },
        {
            key: 'low_threshold',
            label: 'Threshold',
            children: selectedFood?.lowThreshold,
        },
        {
            key: 'status',
            label: 'Status',
            children: getStatusTag(selectedFood?.isActive),
        },
    ];

    const columns: TableColumnsType<HistoryImportOrExportDto> = [
        {
            title: 'Import lot',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Supplier',
            key: 'source',
            render: (item) => <p>{item?.source?.name}</p>,
        },
        {
            title: 'import quantity',
            key: 'quantity',
            sorter: (a, b) => {
                const historyOfIngredinetA : HistoryIngredientsDto = a?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                let quantityA = historyOfIngredinetA?.quantity || 0;

                const historyOfIngredinetB : HistoryIngredientsDto = b?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                let quantityB = historyOfIngredinetB?.quantity || 0;
                return quantityA - quantityB;
            },
            render: (record) => {
                const historyOfIngredinet : HistoryIngredientsDto = record?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                let quantity = historyOfIngredinet?.quantity || 0;
                return (
                    <p>
                    {quantity}
                </p>
                )
            },
        },
        {
            title: 'Number of use',
            key: 'used_unit',
            sorter: (a, b) => {
                const historyOfIngredinetA : HistoryIngredientsDto = a?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                let usedCountA = historyOfIngredinetA?.usedUnit || 0;

                 const historyOfIngredinetB : HistoryIngredientsDto = b?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                let usedCountB = historyOfIngredinetB?.usedUnit || 0;
                return usedCountA - usedCountB;
            },
            render: (record : HistoryImportOrExportDto) => {
                const historyOfIngredinet : HistoryIngredientsDto = record?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                let usedCount = historyOfIngredinet?.usedUnit || 0;
                return (
                    <p>
                        {usedCount}
                    </p>
                );
            },
        },
        {
            title: 'Number of processing',
            key: 'uses',
            sorter: (a, b) => {
                const historyOfIngredinetA : HistoryIngredientsDto = a?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                const sumUseForOrderA = historyOfIngredinetA?.uses?.reduce( (sum, item) => sum + (item?.isActive ? item?.quantity : 0), 0);

                const historyOfIngredinetB : HistoryIngredientsDto = b?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                const sumUseForOrderB = historyOfIngredinetB?.uses?.reduce( (sum, item) => sum + (item?.isActive ? item?.quantity : 0), 0);
                return sumUseForOrderA - sumUseForOrderB;
            },
            render: (record) => {
                const historyOfIngredinet : HistoryIngredientsDto = record?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                const sumUseForOrder = historyOfIngredinet?.uses?.reduce( (sum, item) => sum + (item?.isActive ? item?.quantity : 0), 0);
                return (
                    <p>
                        {sumUseForOrder || 0}
                    </p>
                );
            },
        },
        {
            title: 'Number of damages',
            key: 'error',
            sorter: (a, b) => {
                const historyOfIngredinetA : HistoryIngredientsDto = a?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                const sumErrorA = historyOfIngredinetA?.errors?.reduce( (sum, item) => sum + (item?.isActive ? item?.quantity : 0), 0);
                
                const historyOfIngredinetB : HistoryIngredientsDto = b?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                const sumErrorB = historyOfIngredinetB?.errors?.reduce( (sum, item) => sum + (item?.isActive ? item?.quantity : 0), 0);
                return sumErrorA - sumErrorB;
            },
            render: (record) => {
                const historyOfIngredinet : HistoryIngredientsDto = record?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                const sumError = historyOfIngredinet?.errors?.reduce( (sum, item) => sum + (item?.isActive ? item?.quantity : 0), 0);
                return (
                    <p>
                        {sumError || 0}
                    </p>
                );
            },
        },
        {
            title: 'Đơn vị nhập',
            key: 'Đơn vị nhập',
            render: (record) => {
                const historyOfIngredinet : HistoryIngredientsDto = record?.historyIngredients?.find( item => item?.ingredients?.id == selectedFood?.id);
                return (
                    <p>
                        { historyOfIngredinet?.ingredients?.unit || 'Unknown'}
                    </p>
                );
            },
        },
        {
            title: 'BathCode',
            dataIndex: 'bathCode',
            key: 'bathCode',
            sorter: (a, b) => a.bathCode.localeCompare(b.bathCode),
        },
        {
            title: 'Import at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date, dateString) =>
                            setSelectedKeys(dateString ? ([dateString] as string[]) : [])
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                        placeholder="Chọn ngày"
                        value={selectedKeys.length ? dayjs(selectedKeys[0] as string) : null}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: '100%', marginBottom: 4 }}
                    >
                        Áp dụng
                    </Button>
                    <Button onClick={() => clearFilters?.()} size="small" style={{ width: '100%' }}>
                        Xoá
                    </Button>
                </div>
            ),
            onFilter: (value, record) => {
                const recordDate = dayjs(record.createdAt).format('YYYY-MM-DD');
                return recordDate === value;
            },
            render: (item) => <p>{dayjs(item).format('YYYY-MM-DD')}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'status',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.isActive == value,
            render: (status) => {
                if (status == true) return <Tag color="green">Active</Tag>;
                return <Tag color="red">Inactive</Tag>;
            },
        },
    ];

    return (
        <div className="relative">
            <div className="absolute top-0 left-0">
                <button
                    onClick={() => navigate(`/admin/ingredient-management`)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-gray-50 rounded shadow"
                >
                    <IoMdArrowBack /> Back
                </button>
            </div>
            <div className="pt-12">
                <div className="bg-white px-2 py-2 rounded-md">
                    <Descriptions
                        title="Ingredient Information"
                        bordered
                        column={1}
                        items={foodInfo}
                    />
                </div>

                <Spin spinning={loadingHistory}>
                    <div className="bg-white px-2 py-2 rounded-md mt-6 ">
                        <h2 className="text-[14px] mb-6 font-semibold">
                            Ingredient History Import
                        </h2>
                        <Table
                            columns={columns}
                            dataSource={historyList?.history}
                            rowKey="key"
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                        <div className="flex justify-center mt-[20px]">
                            <Pagination
                                current={filterHistory?.pageNo}
                                pageSize={10}
                                total={historyList?.totalPage}
                            />
                        </div>
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default ViewIngredient;
