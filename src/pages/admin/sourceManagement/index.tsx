import {
    Button,
    Input,
    InputRef,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import React, { useRef, useState } from 'react';

import { FilterDropdownProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { mapIngredients } from '../../../utils/mapIngredients';
import { ModalType } from '@/type/store/common';
import { common } from '@/store/reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type DataIndex = keyof any;

const SourceManagement: React.FC = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const navigate = useNavigate();

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

    const columns: TableColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Tax Code',
            dataIndex: 'taxCode',
            key: 'taxCode',
            ...getColumnSearchProps('taxCode'),
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
                        onClick={() => handleOpenViewSourceModal(record)}
                        className=""
                        size="small"
                    />
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
                        onClick={() => handleOpenDeleteSourceModal(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const dataSource = [
        {
            "id": 1,
            "name": "Công ty TNHH Nguyên Liệu Sài Gòn",
            "address": "123 Đường Số 7, Quận Bình Tân, TP.HCM",
            "phoneNumber": "0912345678",
            "email": "lienhe@nguyenlieusaigon.vn",
            "link": "http://nguyenlieusaigon.vn",
            "taxCode": "0300012345",
            "create_at": "2023-04-01T08:00:00",
            "late_update_time": "2024-05-20T10:30:00",
            "is_active": true
        },
        {
            "id": 2,
            "name": "Công ty CP Thực Phẩm Nhanh Việt",
            "address": "45A Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
            "phoneNumber": "0923456789",
            "email": "info@tpnhanhviet.vn",
            "link": "http://tpnhanhviet.vn",
            "taxCode": "0300023456",
            "create_at": "2022-12-15T09:15:00",
            "late_update_time": "2024-06-10T14:45:00",
            "is_active": true
        },
        {
            "id": 3,
            "name": "Nhà Cung Cấp Rau Củ GreenFarm",
            "address": "67 Đường Láng, Đống Đa, Hà Nội",
            "phoneNumber": "0934567890",
            "email": "support@greenfarm.vn",
            "link": "http://greenfarm.vn",
            "taxCode": "0100034567",
            "create_at": "2021-08-20T07:30:00",
            "late_update_time": "2023-11-05T16:10:00",
            "is_active": false
        }
    ]

    const handleOpenViewSourceModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SOURCE_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenAddIngredientModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditIngredientModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.INGREDIENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handleOpenDeleteSourceModal = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SOURCE_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Source Management</h1>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddIngredientModal}>
                    + New Source
                </Button>

                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default SourceManagement;
