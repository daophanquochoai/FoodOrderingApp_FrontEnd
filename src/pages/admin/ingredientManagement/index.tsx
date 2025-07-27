import {
    Button,
    Input,
    InputRef,
    Pagination,
    Space,
    Spin,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ModalType } from '@/type/store/common';
import { common, ingredients } from '@/store/reducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, fetchFirst } from '@/store/action/admin/ingredients/ingredient.action';
import {
    selectFilter,
    selectIngredients,
    selectLoading,
    selectTotalPage,
} from '@/store/selector/admin/ingredients/ingredients.selector';
import FilterBar from '@/components/filter/FilterBar';

type DataIndex = keyof any;

const IngredientManagement: React.FC = () => {
    const [filters, setFilters] = useState({});

    // hook
    const dispatch = useDispatch();

    // state
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate();
    // selector
    const loading = useSelector(selectLoading);
    const ingredientsList = useSelector(selectIngredients);
    const filter = useSelector(selectFilter);
    const totalPage = useSelector(selectTotalPage);

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    // event handling
    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(String(dataIndex));
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${String(dataIndex)}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(String(dataIndex));
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()) || false,
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleEye = (data) => {
        dispatch(ingredients.actions.setIngredientsSelected(data));
        navigate(`/admin/ingredient-management/${data?.id}`);
    };

    const columns: TableColumnsType = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            filters: [
                { text: 'kg', value: 'kg' },
                { text: 'liter', value: 'liter' },
            ],
            onFilter: (value, record) => record.unit == value,
        },
        {
            title: 'Low threshold',
            dataIndex: 'lowThreshold',
            key: 'low_threshold',
            sorter: (a, b) => a.low_threshold - b.low_threshold,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            filters: [
                { text: 'Stock', value: 'in_stock' },
                { text: 'Low stock', value: 'low_stock' },
                { text: 'Out of stock', value: 'out_of_stock' },
            ],
            onFilter: (value, record) => record.status == value,
            render: (status) => {
                if (status) return <Tag color="green">Còn</Tag>;
                return <Tag color="red">Hết</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '150px',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        onClick={() => handleEye(record)}
                        className=""
                        size="small"
                    />
                    {record?.isActive && (
                        <>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleOpenEditIngredientModal(record)}
                                className="bg-blue-500 hover:bg-blue-600"
                                size="small"
                            />
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleOpenDeleteIngredientModal(record)}
                                size="small"
                            />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleOpenAddIngredientModal = () => {
        dispatch(ingredients.actions.setIngredientsSelected(null));
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditIngredientModal = (ingredient) => {
        dispatch(ingredients.actions.setIngredientsSelected(ingredient));
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'edit',
                data: ingredient,
            })
        );
    };

    const handleOpenDeleteIngredientModal = (ingredient) => {
        dispatch(ingredients.actions.setIngredientsSelected(ingredient));
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'delete',
                data: ingredient,
            })
        );
    };
    const handleChangePage = (e) => {
        dispatch(changePage(e - 1));
    };

    const ingredientFilterFields = [
        { key: 'name', type: 'text', placeholder: 'Tên nguyên liệu' },
        { key: 'create_at', type: 'dateRange', placeholder: 'Ngày tạo' },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Trạng thái',
            options: [
                { label: 'Còn hàng', value: 'in_stock' },
                { label: 'Còn ít', value: 'low_stock' },
                { label: 'Hết hàng', value: 'out_of_stock' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        setFilters((pre) => ({ ...pre, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters({});
    };

    return (
        <Spin spinning={loading}>
            <div>
                <h1 className="text-2xl font-bold mb-3">Ingredient Management</h1>

                {/* filter */}
                <div className="mb-3">
                    <FilterBar
                        fields={ingredientFilterFields}
                        values={filters}
                        onChange={handleFilterChange}
                        onReset={handleResetFilter}
                        type={ModalType.INGREDIENT}
                    />
                </div>

                <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                    <Button type="primary" onClick={handleOpenAddIngredientModal}>
                        + New Ingredient
                    </Button>

                    <Table
                        columns={columns}
                        dataSource={ingredientsList}
                        rowKey="key"
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                    />
                    <Pagination
                        current={filter?.pageNo + 1 || 0}
                        pageSize={10}
                        total={totalPage}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </Spin>
    );
};

export default IngredientManagement;
