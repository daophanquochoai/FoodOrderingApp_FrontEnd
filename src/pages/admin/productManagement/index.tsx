import {
    Button,
    DatePicker,
    Image,
    Input,
    InputRef,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Food } from '@/type';
import { useRef, useState } from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { CiFilter } from 'react-icons/ci';
import { FormFilter } from '@/components/category';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import { useNavigate } from 'react-router-dom';

type DataIndex = keyof Food;

const productsData = [
    {
        id: 1,
        name: 'Hamburger Bò',
        desc: 'Bánh hamburger bò nướng với rau xà lách, cà chua và sốt đặc biệt.',
        image: 'https://img.freepik.com/premium-photo/humber-barger_1019272-1536.jpg',
        status: true,
        create_date: '2024-09-01T08:00:00Z',
        last_update_time: '2024-09-10T10:30:00Z',
        food_code: 'HB001',
        category_id: 1, // Đồ ăn nhanh
        sizes: [
            { size: 'S', price: 25000 },
            { size: 'M', price: 32000 },
            { size: 'L', price: 39000 },
        ],
        rate: 4.5,
    },
    {
        id: 2,
        name: 'Gà Rán Giòn Cay',
        desc: 'Miếng gà rán giòn tan, vị cay nhẹ, phù hợp khẩu vị người Việt.',
        image: 'https://bonchon.com.vn/sites/default/files/media/user-946/lam-ga-chien-cay-khong-the-bo-qua-cac-buoc-nay-03.jpg',
        status: true,
        create_date: '2024-09-02T09:00:00Z',
        last_update_time: '2024-09-12T11:00:00Z',
        food_code: 'CH002',
        category_id: 1,
        sizes: [
            { size: 'Nhỏ', price: 18000 },
            { size: 'Lớn', price: 35000 },
        ],
        rate: 4.7,
    },
    {
        id: 3,
        name: 'Khoai Tây Chiên',
        desc: 'Khoai tây chiên giòn rụm, dùng kèm tương cà/chili.',
        image: 'https://bizweb.dktcdn.net/100/440/789/products/4-cach-lam-khoai-tay-chien-gion-ngon-tai-nha-ai-cung-thich-cach-lam-khoai-tay-chien-3-1558678701-603-width600height367.jpg?v=1638268383250',
        status: false,
        create_date: '2024-09-03T10:00:00Z',
        last_update_time: '2024-09-11T14:00:00Z',
        food_code: 'PT003',
        category_id: 2, // Món phụ
        sizes: [
            { size: 'Nhỏ', price: 12000 },
            { size: 'Vừa', price: 18000 },
            { size: 'Lớn', price: 25000 },
        ],
        rate: 4.2,
    },
];

const ProductManagement = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [showFilter, setShowFilter] = useState(false);
    const dispatch = useDispatch();
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

    const handleOpenEditProductModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.PRODUCT_MANAGEMENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handleOpenAddProductModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.PRODUCT_MANAGEMENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenDeleteProductModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.PRODUCT_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
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
                    <Image width={150} height={100} className="object-contain" src={image} />
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) =>
                status ? (
                    <>
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Active
                        </Tag>
                    </>
                ) : (
                    <>
                        <Tag icon={<CloseCircleOutlined />} color="error">
                            Inactive
                        </Tag>
                    </>
                ),
        },
        {
            title: 'Created Time',
            dataIndex: 'create_date',
            key: 'create_date',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date, dateString) =>
                            setSelectedKeys(dateString ? [dateString as string] : [])
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Apply
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Delete
                    </Button>
                </div>
            ),
            onFilter: (value, record) => record.create_date?.startsWith(value as string) || false,
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Updated Time',
            dataIndex: 'late_update_time',
            key: 'last_update_time',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <DatePicker
                        onChange={(date, dateString) =>
                            setSelectedKeys(dateString ? [dateString as string] : [])
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Apply
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
                        size="small"
                        style={{ width: '100%' }}
                    >
                        Delete
                    </Button>
                </div>
            ),
            onFilter: (value, record) =>
                record.last_update_time?.startsWith(value as string) || false,
            render: (date) => (date ? dayjs(date).format('DD/MM/YYYY') : 'No date'),
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
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => navigate('/admin/product-management/edit/1')}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleOpenDeleteProductModal(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <Button
                        type="primary"
                        // onClick={handleOpenAddProductModal}
                        onClick={() => navigate('/admin/product-management/add')}
                    >
                        + New Product
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
                    dataSource={productsData}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default ProductManagement;
