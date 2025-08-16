import {
    Button,
    Input,
    InputRef,
    Space,
    Table,
    TableColumnsType,
    TableColumnType,
    Spin,
    Pagination,
} from 'antd';
import { useRef, useState, useEffect } from 'react';

import { FilterDropdownProps } from 'antd/es/table/interface';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ModalType } from '@/type/store/common';
import { common, ingredientsError } from '@/store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@/store/action/admin/ingredients/ingredients_error.action';
import * as selectors from '@/store/selector/admin/ingredients/ingredients_error.selector';
import FilterBar from '@/components/filter/FilterBar';
import { filterIngredientsError } from '@/defaultValue/admin/ingredients/ingredients_error';

type DataIndex = keyof any;

const SpoilIngredient = () => {
    // hook
    const dispatch = useDispatch();

    // state
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [filters, setFilters] = useState({});

    // selector
    const loading = useSelector(selectors.selectLoadingPage);
    const ingredientsErrorList = useSelector(selectors.selectIngredientsError);
    const filter = useSelector(selectors.selectFilter);
    const totalPage = useSelector(selectors.selectTotalPage);

    // useEffect
    useEffect(() => {
        dispatch(actions.fetchFirst());
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

    const columns: TableColumnsType = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Import Batch Code',
            dataIndex: ['batchCode', 'bathCode'],
            key: 'bathCode',
            width: '200px',
            render: (_, record) => record.batchCode?.bathCode || 'N/A',
            sorter: (a, b) => {
                const aCode = a.batchCode?.bathCode || '';
                const bCode = b.batchCode?.bathCode || '';
                return aCode.localeCompare(bCode);
            },
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            filters: [
                { text: 'KG', value: 'KG' },
                { text: 'G', value: 'G' },
                { text: 'LITER', value: 'LITER' },
            ],
            onFilter: (value, record) => record.unit == value,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            width: '150px',
            render: (reason) => (
                <p
                    style={{
                        width: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {reason}
                </p>
            ),
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
                        onClick={() => handleOpenViewSpoilIngredientModal(record)}
                        className=""
                        size="small"
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleOpenEditSpoilIngredientModal(record)}
                        className="bg-blue-500 hover:bg-blue-600"
                        size="small"
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleOpenDeleteSpoilIngredientModal(record)}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const handleOpenViewSpoilIngredientModal = (spoil) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'view',
                data: {
                    name: spoil.name,
                    batchCode: spoil.batchCode?.bathCode,
                    unit: spoil.unit,
                    quantity: spoil.quantity,
                    reason: spoil.reason,
                },
            })
        );
    };

    const handleOpenAddSpoilIngredientModal = () => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'add',
                data: null,
            })
        );
    };

    const handleOpenEditSpoilIngredientModal = (spoil) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'edit',
                data: {
                    id: spoil.id,
                    name: spoil.historyId,
                    batchCode: spoil.batchCode?.id,
                    unit: spoil.unit,
                    quantity: spoil.quantity,
                    reason: spoil.reason,
                },
            })
        );
    };

    const handleOpenDeleteSpoilIngredientModal = (spoil) => {
        dispatch(
            common.actions.showModal({
                type: ModalType.SPOIL_INGREDIENT,
                variant: 'delete',
                data: {
                    id: spoil.id,
                    name: spoil.historyId,
                    batchCode: spoil.batchCode?.id,
                    unit: spoil.unit,
                    quantity: spoil.quantity,
                    reason: spoil.reason,
                },
            })
        );
    };

    const handleChangePage = (page) => {
        dispatch(actions.changePage(page - 1));
    };

    const spoilIngredientFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Search' },
        { key: 'startDate', type: 'date', placeholder: 'Created at' },
    ];

    const handleFilterChange = (key, value) => {
        dispatch(ingredientsError.actions.setFilter({ ...filter, [key]: value }));
        console.log(filter);
        dispatch(actions.fetchFirst());
    };

    const handleApplyFilter = () => {
        dispatch(ingredientsError.actions.setFilter(filterIngredientsError));
        // console.log(filter);
        dispatch(actions.fetchFirst());
    };

    return (
        <Spin spinning={loading}>
            <div>
                <h1 className="text-2xl font-bold mb-3">Spoil Ingredient Management</h1>

                {/* filter */}
                <div className="mb-3">
                    <FilterBar
                        fields={spoilIngredientFilterFields}
                        values={filters}
                        onChange={handleFilterChange}
                        onReset={handleApplyFilter}
                        type={ModalType.SPOIL_INGREDIENT}
                        onApply={() => {}}
                    />
                </div>

                <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                    <Button type="primary" onClick={handleOpenAddSpoilIngredientModal}>
                        + New Report
                    </Button>

                    <Table
                        columns={columns}
                        dataSource={ingredientsErrorList}
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

export default SpoilIngredient;
