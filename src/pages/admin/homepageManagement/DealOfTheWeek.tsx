import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Table, TableColumnsType, TableColumnType, Input, InputRef, Button } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { 
  fetchDealOfWeek, 
  addDealOfWeek,
  removeProductFromHomepage,
} from '@/store/action/admin/homepage/homepage.action';
import {
  selectProducts,
  selectDealOfWeek,
  selectDealOfWeekLoading
} from '@/store/selector/admin/homepage/homepage.selector';

type DataIndex = keyof any;

const DealOfTheWeek = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const availableProducts = useSelector(selectProducts);
    const dealOfWeekProducts = useSelector(selectDealOfWeek);
    const loading = useSelector(selectDealOfWeekLoading);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    useEffect(() => {
        dispatch(fetchDealOfWeek());
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

    const handleAddDealOfWeek = (record: any) => {
        dispatch(addDealOfWeek(record));
    };
    const handleRemoveDealOfWeek = (record: any) => {
        dispatch(removeProductFromHomepage(record));
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
                    onClick={() => handleAddDealOfWeek(record)}
                    className="bg-blue-500 hover:bg-blue-600"
                    size="large"
                />
            ),
        },
    ];

    const homepageColumns: TableColumnsType = [
        {
        title: 'Name',
        dataIndex: ['food', 'name'],
        key: 'name',
        render: (_, record) => record.food?.name || 'N/A',
        },
        {
            title: 'Image',
            dataIndex: ['food', 'image'],
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
                    onClick={() => handleRemoveDealOfWeek(record)}
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
                <h2 className="text-xl pt-12 font-semibold mb-4">Deal Of The Week</h2>
                <div className="grid grid-cols-[1fr_1.5fr] mt-6 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Food List</h3>
                        <Table
                            columns={columns}
                            dataSource={availableProducts}
                            rowKey="id"
                            scroll={{ x: 'max-content' }}
                            pagination={false}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Deal Of The Week List</h3>
                        <Table
                            columns={homepageColumns}
                            dataSource={dealOfWeekProducts}
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

export default DealOfTheWeek;