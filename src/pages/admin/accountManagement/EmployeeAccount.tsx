import {
    Button,
    DatePicker,
    Image,
    Input,
    InputRef,
    Popconfirm,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Tag,
} from 'antd';
import React, { useRef, useState } from 'react';

import { FilterDropdownProps } from 'antd/es/table/interface';
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
import { mapIngredients } from '../../../utils/mapIngredients';
import { ModalType } from '@/type/store/common';
import { common } from '@/store/reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import FilterBar from '@/components/filter/FilterBar';

type DataIndex = keyof any;

const EmployeeAccount = () => {
    const dispatch = useDispatch();

    //------------------ func support table ---------------------
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const navigate = useNavigate();

    const [filters, setFilters] = useState({});

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

    //------------------ data fake ---------------------
    //#region dữ liệu giả
    const roles = [
        { id: 1, role: 'Admin' },
        { id: 2, role: 'Manager' },
        { id: 3, role: 'Staff' },
    ];

    const dataSource = [
        {
            id: 1,
            name: 'Nguyễn Văn An',
            cccd: '012345678901',
            image: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
            lastLogin: '2025-07-25T09:00:00Z',
            isActive: true,
            username: 'an.nguyen',
            email: 'an.nguyen@example.com',
            password: 'hashedpassword1',
            role: roles[0], // Admin
        },
        {
            id: 2,
            name: 'Trần Thị Bình',
            cccd: '012345678902',
            image: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
            lastLogin: '2025-07-26T10:30:00Z',
            isActive: true,
            username: 'binh.tran',
            email: 'binh.tran@example.com',
            password: 'hashedpassword2',
            role: roles[1], // Manager
        },
        {
            id: 3,
            name: 'Lê Quốc Cường',
            cccd: '012345678903',
            image: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
            lastLogin: '2025-07-20T15:45:00Z',
            isActive: false,
            username: 'cuong.le',
            email: 'cuong.le@example.com',
            password: 'hashedpassword3',
            role: roles[2], // Staff
        },
    ];

    const tagRole = (role) => {
        let color = '';
        let label = '';

        switch (role) {
            case 'Admin':
                color = 'blue';
                label = role;
                break;
            case 'Manager':
                color = 'orange';
                label = role;
                break;
            case 'Staff':
                color = 'default';
                label = role;
                break;
            default:
                color = 'gray';
                label = role;
        }

        return <Tag color={color}>{label}</Tag>;
    };
    //#endregion

    //#region modal
    //------------------ func open modal ---------------------
    const handleEditEmpAccount = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.EMP_ACCCOUNT_MANAGEMENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteEmpAccount = (data) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.EMP_ACCCOUNT_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddEmployeeModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.EMP_ACCCOUNT_MANAGEMENT,
                variant: 'add',
                data: null,
            })
        );
    };

    //#endregion

    //#region cột table
    //------------------ define column table ---------------------
    const columns: TableColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'cccd',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (image) => (
                <div className="flex items-center justify-center">
                    <Image width={100} height={80} className="object-contain" src={image} />
                </div>
            ),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Last login',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
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
            onFilter: (value, record) => record.lastLogin?.startsWith(value as string) || false,
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: roles.map((role) => ({ text: role.role, value: role.id })),
            onFilter: (value, record) => record.role.id === value,
            render: (role) => tagRole(role.role),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.isActive === value,
            render: (status) => {
                if (status == true) {
                    return (
                        <>
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Active
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
            title: 'Actions',
            key: 'actions',
            width: '150px',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditEmpAccount(record)}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handlDeleteEmpAccount(record)}
                        size="small"
                    />
                </Space>
            ),
        },
        {
            title: 'Reset password',
            key: 'resetPassword',
            width: '150px',
            render: (_, record) => (
                <Space size="small">
                    <Popconfirm
                        title="Confirm reset password"
                        description={`Are you sure you want to reset password of "${record.name}" ?`}
                        onConfirm={() => {
                            console.log('reset password success!');
                            // Gọi API hoặc callback xử lý ở đây
                        }}
                        okText="Ok"
                        cancelText="Cancel"
                    >
                        <Button color="primary" danger type="primary" className="" size="middle">
                            Reset password
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    //#endregion

    //#region filter
    //------------------ filter ---------------------
    const employeeAccountFilterFields = [
        { key: 'name', type: 'text', placeholder: 'Tên nhân viên' },
        { key: 'create_at', type: 'dateRange', placeholder: 'Ngày tạo' },
        {
            key: 'isActive',
            type: 'select',
            placeholder: 'Trạng thái',
            options: [
                { label: 'Hoạt động', value: true },
                { label: 'Không hoạt động', value: false },
            ],
        },
        {
            key: 'role',
            type: 'select',
            placeholder: 'Quyền',
            options: [
                { label: 'Admin', value: 'Admin' },
                { label: 'Nhân viên', value: 'Employee' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        setFilters((pre) => ({ ...pre, [key]: value }));
    };

    const handleResetFilter = () => {
        setFilters({});
    };
    //#endregion

    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Quản lý tài khoản nhân viên</h1>

            {/* filter */}
            <div className="mb-3">
                <FilterBar
                    fields={employeeAccountFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    type={ModalType.SPOIL_INGREDIENT}
                />
            </div>

            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddEmployeeModal}>
                    + New Account
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

export default EmployeeAccount;
