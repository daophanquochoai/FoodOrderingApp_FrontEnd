import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Table, TableColumnsType, TableColumnType, Input, InputRef, Button } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { 
  fetchCategoryHomepage, 
  addCategoryToHomepage,
  removeCategoryFromHomepage,
} from '@/store/action/admin/homepage/homepage.action';
import { 
  selectCategories,
  selectHomepageCategories,
  selectCategoriesLoading 
} from '@/store/selector/admin/homepage/homepage.selector';

type DataIndex = keyof any;

const ShopByCategories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const availableCategories = useSelector(selectCategories);
    const homepageCategories = useSelector(selectHomepageCategories);
    const loading = useSelector(selectCategoriesLoading);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    useEffect(() => {
        dispatch(fetchCategoryHomepage());
    }, []);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(String(dataIndex));
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${String(dataIndex)}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
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

    const handleAddCategoryToHomepage = (record: any) => {
        dispatch(addCategoryToHomepage(record));
        // Optionally, you can show a success message or update the UI
    }
    const handleDeleteCategory = (record: any) => {
        dispatch(removeCategoryFromHomepage(record));
        // Optionally, you can show a success message or update the UI
    }

    const columns: TableColumnsType = [
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
            width: '100px',
            render: (image) => (
                <img
                    src={image}
                    alt="Category"
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100/orange/white?text=No+Image';
                    }}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    onClick={() => handleAddCategoryToHomepage(record)}
                    className="bg-blue-500 hover:bg-blue-600"
                    size="large"
                />
            ),
        },
    ];

    const homepageColumns: TableColumnsType = [
        {
        title: 'Name',
        dataIndex: ['category', 'name'],
        key: 'name',
        render: (_, record) => record.category?.name || 'N/A',
        },
        {
            title: 'Image',
            dataIndex: ['category', 'image'],
            key: 'image',
            width: '100px',
            render: (image) => (
                <img
                    src={image}
                    alt="Category"
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100/orange/white?text=No+Image';
                    }}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCategory(record)}
                    className="bg-red-500 hover:bg-red-600"
                    size="large"
                />
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <div className="relative">
                <div className="absolute top-0 left-0">
                    <button
                        onClick={() => navigate(`/admin/homepage-management`)}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-white hover:bg-gray-50 rounded shadow"
                    >
                        <IoMdArrowBack /> Back
                    </button>
                </div>
                <h2 className="text-xl font-semibold mb-4 pt-12">Shop By Categories</h2>
                <div className="grid grid-cols-[1fr_1.5fr] mt-6 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Category List</h3>
                        <Table
                            columns={columns}
                            dataSource={availableCategories}
                            rowKey="id"
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Homepage Category List</h3>
                        <Table
                            columns={homepageColumns}
                            dataSource={homepageCategories}
                            rowKey="id"
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default ShopByCategories;