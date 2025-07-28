import React, { useRef, useState } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Divider,
    Image,
    TableColumnsType,
    InputRef,
    TableColumnType,
    Tag,
} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { common } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import Highlighter from 'react-highlight-words';
import { FilterDropdownProps } from 'antd/es/table/interface';
import FilterBar from '@/components/filter/FilterBar';
type DataIndex = keyof any;

const { Option } = Select;

//#region fake data
// foods chưa có công thứ --> để tạo mới
const foods = [
    {
        id: 4,
        name: 'Pizza Phô Mai',
        image: 'https://newviet.vn/wp-content/uploads/2024/05/image3.png.webp',
        sizes: [
            { id: 401, name: 'Nhỏ', ingredients: [] },
            { id: 402, name: 'Vừa', ingredients: [] },
            { id: 403, name: 'Lớn', ingredients: [] },
        ],
    },
    {
        id: 5,
        name: 'Mì Ý Sốt Bò',
        image: 'https://daynauan.info.vn/wp-content/uploads/2018/03/hinh-mi-y-xot-bo-bam.jpg',
        sizes: [{ id: 501, name: 'Phần thường', ingredients: [] }],
    },
];

// foods đã có công thức món ăn --> hiển thị dữ liệu ra bảng
const foodsIngredient = [
    {
        id: 1, /// id của food Id
        name: 'Burger Bò',
        image: 'https://gofood.vn/upload/r/san-pham/Thit-bo-My/thit-bo-my-moi/bo-xay-burger-3.jpg',
        sizes: [
            {
                id: 101,
                name: 'Nhỏ',
                ingredients: [
                    { ingredients_id: 1, quantity_per_unit: 100, unit: 'g' },
                    { ingredients_id: 2, quantity_per_unit: 1, unit: 'piece' },
                    { ingredients_id: 3, quantity_per_unit: 10, unit: 'ml' },
                ],
            },
            {
                id: 102,
                name: 'Vừa',
                ingredients: [
                    { ingredients_id: 1, quantity_per_unit: 150, unit: 'g' },
                    { ingredients_id: 2, quantity_per_unit: 1, unit: 'piece' },
                    { ingredients_id: 3, quantity_per_unit: 15, unit: 'ml' },
                ],
            },
        ],
        is_active: true,
    },
    {
        id: 2,
        name: 'Gà Rán',
        image: 'https://cokhiviendong.com/wp-content/uploads/2019/01/kinnh-nghi%E1%BB%87m-m%E1%BB%9F-qu%C3%A1n-g%C3%A0-r%C3%A1n-7.jpg',
        sizes: [
            {
                id: 201,
                name: '1 miếng',
                ingredients: [
                    { ingredients_id: 4, quantity_per_unit: 120, unit: 'g' },
                    { ingredients_id: 5, quantity_per_unit: 50, unit: 'g' },
                ],
            },
        ],
        is_active: true,
    },
    {
        id: 3,
        name: 'Khoai Tây Chiên',
        image: 'https://doiduavang.vn/wp-content/uploads/2021/02/khoai-tay-chien.jpg',
        sizes: [
            {
                id: 301,
                name: 'Vừa',
                ingredients: [
                    { ingredients_id: 6, quantity_per_unit: 150, unit: 'g' },
                    { ingredients_id: 7, quantity_per_unit: 15, unit: 'ml' },
                ],
            },
        ],
        is_active: false,
    },
];

// Giả sử nguyên liệu lấy ra để có thể select options cho công thức (tránh việc tự tạo)
const ingredients = [
    { id: 1, name: 'Thịt bò', avgPrice: 250000, unit: 'kg' },
    { id: 2, name: 'Bánh mì burger', avgPrice: 3000, unit: 'piece' },
    { id: 3, name: 'Sốt mayonnaise', avgPrice: 50000, unit: 'liter' },
    { id: 4, name: 'Đùi gà', avgPrice: 70000, unit: 'piece' },
    { id: 5, name: 'Bột chiên giòn', avgPrice: 25000, unit: 'kg' },
    { id: 6, name: 'Khoai tây', avgPrice: 20000, unit: 'kg' },
    { id: 7, name: 'Dầu ăn', avgPrice: 40000, unit: 'liter' },
];

// Giả sử dữ liệu size lấy ra để select options
const sizes = [
    { id: 101, name: 'Nhỏ' },
    { id: 102, name: 'Vừa' },
    { id: 103, name: 'Lớn' },
    { id: 201, name: '1 miếng' },
    { id: 301, name: 'Phần thường' },
];

const RecipeManagement = () => {
    const data = { foods, foodsIngredient, ingredients, sizes };

    //dispath
    const dispatch = useDispatch();

    //state
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filters, setFilters] = useState({});

    //ref
    const searchInput = useRef<InputRef>(null);

    // search table
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

    //#region function modal
    const handleAddRecipe = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.RECIPE_MANAGEMENT,
                variant: 'add',
                data: data,
            })
        );
    };

    const handleDeleteAllRecipe = (record) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.RECIPE_MANAGEMENT,
                variant: 'delete',
                data: { ...data, record },
            })
        );
    };

    const handleEditRecipe = (record) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.RECIPE_MANAGEMENT,
                variant: 'edit',
                data: { ...data, record },
            })
        );
    };

    const handleViewRecipe = (record) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.RECIPE_MANAGEMENT,
                variant: 'view',
                data: { ...data, record },
            })
        );
    };

    //#region columns table
    const columns: TableColumnsType<any> = [
        {
            title: 'Food name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (image: string) => (
                <div className="">
                    <Image width={120} height={80} className="object-contain" src={image} />
                </div>
            ),
        },
        {
            title: 'Size quantity',
            dataIndex: 'sizes',
            align: 'center',
            key: 'sizes',
            sorter: (a, b) => a.sizes.length - b.sizes.length,
            render: (sizes) => <p>{sizes?.length || 0}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.is_active == value,
            render: (status) => {
                if (status) return <Tag color="green">Active</Tag>;
                return <Tag color="red">Inactive</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '150px',
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        color="primary"
                        variant="filled"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            handleViewRecipe(record);
                        }}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            handleEditRecipe(record);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handleDeleteAllRecipe(record);
                        }}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    //#region filter
    const recipeFilterFields = [
        { key: 'name', type: 'text', placeholder: 'Food name' },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Trạng thái',
            options: [
                { label: 'Hoạt động', value: 'active' },
                { label: 'Dừng hoạt động', value: 'inactive' },
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
        <div>
            <h1 className="text-2xl font-bold mb-3">Product Recipe Management</h1>
            {/* filter */}
            <div className="mb-3">
                <FilterBar
                    fields={recipeFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    type={ModalType.CATEGORY}
                />
            </div>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button
                    type="primary"
                    onClick={() => {
                        handleAddRecipe(data);
                    }}
                >
                    + Add Recipe
                </Button>
                <Table
                    dataSource={foodsIngredient}
                    columns={columns}
                    style={{ marginTop: 16 }}
                    pagination={false}
                    // expandable={{
                    //     expandedRowRender: (record) => (
                    //         <ul>
                    //             {record.ingredients.map((ing, index) => (
                    //                 <li key={index}>
                    //                     {ing.name} - {ing.quantity} {ing.unit} -{' '}
                    //                     {ing.price.toLocaleString()}đ
                    //                 </li>
                    //             ))}
                    //         </ul>
                    //     ),
                    // }}
                />
            </div>
        </div>
    );
};

export default RecipeManagement;
