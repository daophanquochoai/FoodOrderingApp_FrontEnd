import {
    Button,
    DatePicker,
    Image,
    Pagination,
    Popconfirm,
    Space,
    Spin,
    Table,
    TableColumnsType,
    Tag,
} from 'antd';
import { useEffect, useState } from 'react';

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { ModalType } from '@/type/store/common';
import { common, employee } from '@/store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import FilterBar from '@/components/filter/FilterBar';
import {
    changePageEmployee,
    resetPasswordEmployee,
    fetchFirst,
    filterEmployee,
} from '@/store/action/admin/employee/employee.action';
import { selectEmployee, selectFilter } from '@/store/selector/admin/employee/employee.selector';
import { Employee } from '@/type/store/admin/employee/employee.style';
import { getCookies } from '@/utils/cookies/cookies';
import { initFilterEmployee } from '@/defaultValue/admin/employee/employee';

const EmployeeAccount = () => {
    //hook
    const dispatch = useDispatch();

    //state
    const [filters, setFilters] = useState(initFilterEmployee);

    // selector
    const employeeList = useSelector(selectEmployee);
    const filter = useSelector(selectFilter);
    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const tagRole = (role) => {
        let color = '';
        let label = '';

        switch (role) {
            case 'ROLE_ADMIN':
                color = 'blue';
                label = role;
                break;
            case 'ROLE_CHEF':
                color = 'orange';
                label = role;
                break;
            case 'ROLE_SHIPPER':
                color = 'default';
                label = role;
                break;
            default:
                color = 'gray';
                label = role;
        }

        return <Tag color={color}>{label}</Tag>;
    };

    // event handling
    const handleEditEmpAccount = (data) => {
        dispatch(employee.actions.setSelectEmployee(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.EMP_ACCCOUNT_MANAGEMENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handlDeleteEmpAccount = (data) => {
        dispatch(employee.actions.setSelectEmployee(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.EMP_ACCCOUNT_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const handleOpenAddEmployeeModal = () => {
        dispatch(employee.actions.setSelectEmployee(null));
        dispatch(
            common.actions.showModal({
                type: ModalType.EMP_ACCCOUNT_MANAGEMENT,
                variant: 'add',
                data: null,
            })
        );
    };

    // Filter handling
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
    };

    const handleApplyFilter = (filterValues) => {
        dispatch(filterEmployee(filterValues));
    };

    const handleResetFilter = () => {
        setFilters(initFilterEmployee);
        dispatch(filterEmployee(initFilterEmployee));
    };

    // Filter fields configuration
    const employeeFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Search name, email, CCCD...' },
        {
            key: 'email',
            type: 'multiSelect',
            placeholder: 'Select email',
            options: [
                { label: 'abc@gmail.com', value: 'abc@gmail.com' },
                { label: 'xyz@gmail.com', value: 'xyz@gmail.com' },
            ],
        },
        {
            key: 'phoneNumber',
            type: 'multiSelect',
            placeholder: 'Select phone number',
            options: [
                { label: '0989123456', value: '0989123456' },
                { label: '0123456789', value: '0123456789' },
            ],
        },
        {
            key: 'cccd',
            type: 'multiSelect',
            placeholder: 'Select CCCD',
            options: [
                { label: '012345678901', value: '012345678901' },
                { label: '012345678902', value: '012345678902' },
            ],
        },
        {
            key: 'isActiveEmploy',
            type: 'multiSelect',
            placeholder: 'Select status',
            options: [
                { label: 'Active', value: true },
                { label: 'Inactive', value: false },
            ],
        },
        // { key: 'create_at', type: 'dateRange', placeholder: 'Created Date' },
    ];

    // data column
    const columns: TableColumnsType<Employee> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Citizen ID Card',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
            onFilter: (value, record) => record?.lastLogin?.startsWith(value as string) || false,
            render: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => tagRole(role.roleName),
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
            render: (_, record) => {
                const user = getCookies('user');
                if (user == null) {
                    return <></>;
                }
                const userObj = JSON.parse(user);
                if (userObj?.username == record.email) {
                    return <></>;
                }
                return (
                    <Space size="small">
                        <Popconfirm
                            title="Confirm reset password"
                            description={`Are you sure you want to reset password of "${record.name}" ?`}
                            onConfirm={() => {
                                dispatch(resetPasswordEmployee(record?.id));
                            }}
                            okText="Ok"
                            cancelText="Cancel"
                        >
                            <Button
                                color="primary"
                                danger
                                type="primary"
                                className=""
                                size="middle"
                            >
                                Reset password
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const handleChangePage = (e) => {
        console.log(e);
        dispatch(changePageEmployee(e - 1));
    };

    return (
        <Spin spinning={employeeList.loading}>
            <h1 className="text-2xl font-bold mb-3">Quản lý tài khoản nhân viên</h1>

            {/* Filter */}
            <div className="mb-3">
                <FilterBar
                    fields={employeeFilterFields}
                    values={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={handleApplyFilter}
                    type={ModalType.EMP_ACCCOUNT_MANAGEMENT}
                />
            </div>

            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddEmployeeModal}>
                    + New Account
                </Button>

                <Table
                    columns={columns}
                    dataSource={employeeList?.data}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />
                <Pagination
                    pageSize={10}
                    current={filter.pageNo}
                    total={employeeList.totalPage}
                    onChange={handleChangePage}
                />
            </div>
        </Spin>
    );
};

export default EmployeeAccount;
