import {
    Button,
    Input,
    InputRef,
    Pagination,
    Space,
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
import { common, sources } from '@/store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, fetchFirst, loadPage } from '@/store/action/admin/source/source.action';
import { selectSource, selectFilter } from '@/store/selector/admin/source/source.selector';
import { initFilter } from '@/defaultValue/admin/source/source';
import FilterBar from '@/components/filter/FilterBar';

type DataIndex = keyof any;

const SourceManagement: React.FC = () => {
    // hook
    const dispatch = useDispatch();

    //state
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    // selector
    const sourcesList = useSelector(selectSource);
    const filter = useSelector(selectFilter);

    // useEffect
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

    const columns: TableColumnsType<any> = [
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
                                onClick={() => handleOpenDeleteSourceModal(record)}
                                size="small"
                            />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const handleOpenViewSourceModal = (data) => {
        dispatch(sources.actions.setSelectedSource(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.SOURCE_MANAGEMENT,
                variant: 'view',
                data: data,
            })
        );
    };

    const handleOpenAddIngredientModal = () => {
        dispatch(sources.actions.setSelectedSource(null));
        dispatch(
            common.actions.showModal({
                type: ModalType.SOURCE_MANAGEMENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditIngredientModal = (data) => {
        dispatch(sources.actions.setSelectedSource(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.SOURCE_MANAGEMENT,
                variant: 'edit',
                data: data,
            })
        );
    };

    const handleOpenDeleteSourceModal = (data) => {
        dispatch(sources.actions.setSelectedSource(data));
        dispatch(
            common.actions.showModal({
                type: ModalType.SOURCE_MANAGEMENT,
                variant: 'delete',
                data: data,
            })
        );
    };

    const sourceFilterFields = [{ key: 'search', type: 'text', placeholder: 'Search' }];

    const handleFilterChange = (key, value) => {
        // console.log(key, value);
        dispatch(
            sources.actions.setFilter({
                ...filter,
                [key]: value,
            })
        );
    };

    const handleApplyFilter = (filterValues) => {
        console.log(filterValues);
        dispatch(loadPage());
    };

    const handleResetFilter = () => {
        dispatch(sources.actions.setFilter(initFilter));
        dispatch(loadPage());
    };

    const handleChangePage = (e) => {
        dispatch(changePage(e - 1));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Source Management</h1>

            {/* filter */}
            <div className="my-3">
                <FilterBar
                    fields={sourceFilterFields}
                    values={filter}
                    onChange={handleFilterChange}
                    onReset={handleResetFilter}
                    onApply={handleApplyFilter}
                    type={ModalType.SOURCE_MANAGEMENT}
                />
            </div>

            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                <Button type="primary" onClick={handleOpenAddIngredientModal}>
                    + New Source
                </Button>

                <Table
                    columns={columns}
                    dataSource={sourcesList?.data}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                />

                <Pagination
                    current={filter?.pageNo + 1 || 0}
                    pageSize={10}
                    onChange={handleChangePage}
                    total={sourcesList?.totalPage * 10 || 1}
                />
            </div>
        </div>
    );
};

export default SourceManagement;
