import {
    Button,
    Image,
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
import {
    BorderOuterOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useEffect, useRef, useState } from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { CiFilter } from 'react-icons/ci';
import { FormFilter } from '@/components/category';
import { useDispatch, useSelector } from 'react-redux';
import { common, foodManager } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { useNavigate } from 'react-router-dom';
import {
    selectFilter,
    selectFoodManager,
    selectLoadingPage,
    selectTotalPage,
} from '@/store/selector/admin/food/food_manager.selector';
import { changePage, fetchFirst } from '@/store/action/admin/food/food_manager.action';
import { Food } from '@/type/store/client/collection/food.style';
import FoodManagerSlice from '@/store/reducer/admin/food/food_manager.reducer';

type DataIndex = keyof Food;

const ProductManagement = () => {
    // hook
    const dispatch = useDispatch();

    //selector
    const foods = useSelector(selectFoodManager);
    const loading = useSelector(selectLoadingPage);
    const filter = useSelector(selectFilter);
    const totalPage = useSelector(selectTotalPage);

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    // event handling
    const handleEdit = (e) => {
        dispatch(foodManager.actions.setFoodSelected(e));
        navigate('/admin/product-management/edit');
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleOpenViewProductModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.PRODUCT_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenDeleteProductModal = (data) => {
        dispatch(foodManager.actions.setFoodSelected(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.PRODUCT_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleAddFood = () => {
        dispatch(foodManager.actions.setFoodSelected(null));
        navigate('/admin/product-management/add');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Food> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
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
                            setSearchedColumn(dataIndex);
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

    const handleChangePage = (e) => {
        dispatch(changePage(e - 1));
    };

    // declare
    const columns: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (image) => (
                <div className="flex items-center justify-center">
                    <Image width={120} height={80} className="object-contain" src={image} />
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Active', value: 'ACTIVE' },
                { text: 'Out Of Stock', value: 'OUT_STOCK' },
                { text: 'Delete', value: 'DELETE' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                if (status == 'ACTIVE') {
                    return (
                        <>
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Active
                            </Tag>
                        </>
                    );
                } else if (status == 'OUT_STOCK') {
                    return (
                        <>
                            <Tag icon={<BorderOuterOutlined />} color="yellow">
                                Out Stock
                            </Tag>
                        </>
                    );
                } else {
                    return (
                        <>
                            <Tag icon={<CloseCircleOutlined />} color="error">
                                Inactive
                            </Tag>
                        </>
                    );
                }
            },
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            ...getColumnSearchProps('desc'),
            sorter: (a, b) => a.desc.localeCompare(b.desc),
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
                        onClick={() => handleOpenViewProductModal(record)}
                        className=""
                        size="small"
                    />
                    {record?.status == 'ACTIVE' && (
                        <>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(record)}
                                className="bg-blue-500 hover:bg-blue-600"
                                size="small"
                            />
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleOpenDeleteProductModal(record)}
                                size="small"
                            />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <h1 className="text-2xl font-bold">Foods Management</h1>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <Button type="primary" onClick={handleAddFood}>
                        + New Food
                    </Button>

                    <Button onClick={() => setShowFilter((prev) => !prev)} className="flex">
                        <CiFilter /> Filter
                    </Button>
                </div>

                <div className={`${showFilter ? 'block' : 'hidden'} pb-4`}>
                    <FormFilter />
                </div>

                <Table
                    columns={columns}
                    dataSource={foods}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
                <div className="flex justify-center mt-[20px]">
                    <Pagination
                        current={filter?.pageNo + 1 || 0}
                        pageSize={10}
                        onChange={handleChangePage}
                        total={totalPage}
                    />
                </div>
            </div>
        </Spin>
    );
};

export default ProductManagement;
