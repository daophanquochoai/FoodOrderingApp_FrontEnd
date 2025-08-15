import { useEffect, useRef, useState } from 'react';
import {
    Table,
    Button,
    Space,
    Image,
    TableColumnsType,
    InputRef,
    Tag,
    Pagination,
    Spin,
} from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { common, recipe } from '@/store/reducer';
import { ModalType } from '@/type/store/common';
import FilterBar from '@/components/filter/FilterBar';
import { changePage, fetchFilter, fetchFirst } from '@/store/action/admin/recipe/recipe.action';
import {
    selectFilter,
    selectFood,
    selectLoadingPage,
} from '@/store/selector/admin/recipe/recipe.selector';
import { Food } from '@/type/store/client/collection/food.style';
import { filterFoodManager } from '@/defaultValue/admin/food/food_manager';
import { firstFetch } from '@/store/action/client/collection/collection.action';

const RecipeManagement = () => {
    // hook
    const dispatch = useDispatch();
    const foodList = useSelector(selectFood);
    const filter = useSelector(selectFilter);
    const loading = useSelector(selectLoadingPage);

    //useEffect
    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const handleEditRecipe = (record) => {
        dispatch(recipe.actions.setSelectedFood(record));
        dispatch(
            common.actions.showModal({
                type: ModalType.RECIPE_MANAGEMENT,
                variant: 'edit',
            })
        );
    };

    const handleViewRecipe = (record) => {
        dispatch(recipe.actions.setSelectedFood(record));
        dispatch(
            common.actions.showModal({
                type: ModalType.RECIPE_MANAGEMENT,
                variant: 'view',
            })
        );
    };

    const handleChangePage = (e) => {
        dispatch(changePage(e - 1));
    };

    //#region columns table
    const columns: TableColumnsType<Food> = [
        {
            title: 'Food name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a?.name?.localeCompare(b?.name),
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
            align: 'center',
            key: 'sizes',
            sorter: (a, b) => a?.foodSizes?.length - b?.foodSizes?.length,
            render: (item) => <p>{item?.foodSizes?.filter((i) => i?.isActive == true)?.length}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'is_active',
            align: 'center',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record?.status == value,
            render: (status) => {
                if (status == 'ACTIVE') {
                    return <Tag color="green">Active</Tag>;
                } else if (status == 'OUT_STOCK') {
                    return <Tag color="yellow">Out of Stock</Tag>;
                }
                return <Tag color="red">Delete</Tag>;
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
                </Space>
            ),
        },
    ];

    //#region filter
    const recipeFilterFields = [
        { key: 'search', type: 'text', placeholder: 'Food name' },
        {
            key: 'statusFoods',
            type: 'select',
            placeholder: 'Status',
            options: [
                { label: 'Active', value: 'ACTIVE' },
                { label: 'Out of Stock', value: 'OUT_STOCK' },
                { label: 'Delete', value: 'DELETE' },
            ],
        },
    ];

    const handleFilterChange = (key, value) => {
        if (key == 'statusFoods') {
            dispatch(
                recipe.actions.setFilter({
                    ...filter,
                    [key]: [value],
                })
            );
        } else {
            dispatch(
                recipe.actions.setFilter({
                    ...filter,
                    [key]: value,
                })
            );
        }
        dispatch(fetchFilter());
    };

    const handleResetFilter = () => {
        dispatch(recipe.actions.setFilter(filterFoodManager));
        dispatch(fetchFilter());
    };

    return (
        <div>
            <Spin spinning={loading}>
                <h1 className="text-2xl font-bold mb-3">Product Recipe Management</h1>
                {/* filter */}
                <div className="mb-3">
                    <FilterBar
                        fields={recipeFilterFields}
                        values={filter}
                        onChange={handleFilterChange}
                        onReset={handleResetFilter}
                        type={ModalType.CATEGORY}
                    />
                </div>
                <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm space-y-4">
                    {/* <Button
                        type="primary"
                        onClick={() => {
                            handleAddRecipe();
                        }}
                    >
                        + Add Recipe
                    </Button> */}
                    <Table
                        dataSource={foodList?.data}
                        columns={columns}
                        style={{ marginTop: 16 }}
                        pagination={false}
                    />
                    <div className="flex items-center justify-center">
                        <Pagination
                            onChange={(e) => handleChangePage(e)}
                            current={filter?.pageNo + 1}
                            total={foodList?.totalPage}
                            pageSize={10}
                        />
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default RecipeManagement;
