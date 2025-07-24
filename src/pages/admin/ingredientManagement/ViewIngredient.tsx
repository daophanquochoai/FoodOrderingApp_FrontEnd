import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
    Button,
    DatePicker,
    Descriptions,
    DescriptionsProps,
    Input,
    InputRef,
    Space,
    Spin,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@mui/icons-material';
import Highlighter from 'react-highlight-words';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectHistory,
    selectIngredientsSelected,
    selectLoadingHistory,
} from '@/store/selector/admin/ingredients/ingredients.selector';
import { fetchHistory } from '@/store/action/admin/ingredients/ingredient.action';
import { HistoryImportOrExportDto } from '@/type/store/admin/history/history.style';

type DataIndex = keyof any;

const ViewIngredient = () => {
    // selector
    const selectedFood = useSelector(selectIngredientsSelected);
    const loadingHistory = useSelector(selectLoadingHistory);
    const historyList = useSelector(selectHistory);

    // hook
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect
    useEffect(() => {
        dispatch(fetchHistory());
    }, []);

    const getStatusTag = (status: boolean) => {
        switch (status) {
            case true:
                return <Tag color="green">Còn</Tag>;
            default:
                return <Tag color="red">Hết</Tag>;
        }
    };

    const foodInfo: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: 'Tên nguyên liệu',
            children: selectedFood?.name,
        },
        {
            key: 'unit',
            label: 'Đơn vị',
            children: selectedFood?.unit,
        },
        {
            key: 'low_threshold',
            label: 'Ngưỡng cảnh báo',
            children: selectedFood?.lowThreshold,
        },
        {
            key: 'status',
            label: 'Trạng thái',
            children: getStatusTag(selectedFood?.isActive),
        },
    ];

    const columns: TableColumnsType<HistoryImportOrExportDto> = [
        {
            title: 'Lô nhập',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'source',
            key: 'source',
        },
        {
            title: 'Số lượng nhập',
            key: 'quantity',
            sorter: (a, b) => {
                const aTotal =
                    a.historyIngredients?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                const bTotal =
                    b.historyIngredients?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                return aTotal - bTotal;
            },
            render: (record) => (
                <p>{record?.historyIngredients?.reduce((sum, item) => sum + item.quantity, 0)}</p>
            ),
        },
        {
            title: 'Số lượng dùng',
            key: 'used_unit',
            sorter: (a, b) => {
                const aTotal =
                    a.historyIngredients?.reduce((sum, item) => sum + item.usedUnit, 0) || 0;
                const bTotal =
                    b.historyIngredients?.reduce((sum, item) => sum + item.usedUnit, 0) || 0;
                return aTotal - bTotal;
            },
            render: (record) => {
                return (
                    <p>
                        {record?.historyIngredients?.reduce((sum, item) => sum + item.usedUnit, 0)}
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
            title: 'Ngày nhập',
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
            render: (date) => {
                const parsed = typeof date === 'bigint' ? Number(date) : date;
                return dayjs(parsed).format('DD/MM/YYYY');
            },
        },
        {
            title: 'Trạng thái',
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
                        title="Thông tin nguyên liệu"
                        bordered
                        column={1}
                        items={foodInfo}
                    />
                </div>

                <Spin spinning={loadingHistory}>
                    <div className="bg-white px-2 py-2 rounded-md mt-6 ">
                        <h2 className="text-[14px] mb-6 font-semibold">Lịch sử nhập nguyên liệu</h2>
                        <Table
                            columns={columns}
                            dataSource={historyList?.history}
                            rowKey="key"
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default ViewIngredient;
