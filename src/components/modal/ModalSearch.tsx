import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/store/reducer';
import { selectModal } from '@/store/selector/common/common.selector';
import { ModalState } from '@/type/store/common';
import Search from 'antd/es/input/Search';
import { ConfigProvider, Image, Spin } from 'antd';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { searchFoods, clearSearchResults } from '@/store/action/client/search/search.action';
import {
    selectSearchResults,
    selectSearchLoading,
    selectSearchQuery,
} from '@/store/selector/client/search/search.selector';
import { Link } from 'react-router-dom';

const ModalSearch: React.FC<ModalState> = ({ data, type, variant }) => {
    // hook
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);

    const searchResults = useSelector(selectSearchResults) || [];
    const loading = useSelector(selectSearchLoading) || false;
    const searchQuery = useSelector(selectSearchQuery) || '';

    console.log(searchResults);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
        dispatch(clearSearchResults());
    };

    if (!modal.some((m) => m.type === type)) {
        return null;
    }

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            if (query.trim() !== '') {
                dispatch(searchFoods(query));
            } else {
                dispatch(clearSearchResults());
            }
        }, 500),
        [dispatch]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedSearch(value);
    };

    const handleSearch = (value: string) => {
        if (value.trim() !== '') {
            dispatch(searchFoods(value));
        } else {
            dispatch(clearSearchResults());
        }
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
            dispatch(clearSearchResults());
        };
    }, [debouncedSearch, dispatch]);

    const suggestions =
        Array.isArray(searchResults) && searchResults.length > 0
            ? [...new Set(searchResults.map((item) => item.name.toLowerCase()))]
                  .filter((name) => name.includes(searchQuery.toLowerCase()))
                  .slice(0, 10)
            : [];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#f97316',
                    colorPrimaryHover: '#fb923c',
                    colorPrimaryActive: '#ea580c',
                },
            }}
        >
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-start justify-center">
                <div className="container flex items-center justify-center mt-20 lg:mt-10">
                    <div className="bg-white rounded-lg p-6 min-w-[300px] relative w-[85%] overflow-y-auto">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <IoMdClose className="size-4" />
                        </button>

                        {/* content */}
                        <div>
                            <h2 className="text-xl font-semibold text-center">
                                What are you looking for?
                            </h2>
                            <div className="flex items-center justify-center mt-4">
                                <Search
                                    placeholder="Search for foods, drinks..."
                                    allowClear
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onSearch={handleSearch}
                                    size="large"
                                    className="w-[90%] lg:w-[75%]"
                                    loading={loading}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            {loading ? (
                                <div className="flex justify-center mt-4">
                                    <Spin size="large" />
                                </div>
                            ) : (
                                <>
                                    {(searchResults.length > 0 || suggestions.length > 0) && (
                                        <div className="flex items-center justify-center">
                                            <div className="w-[90%] lg:w-[75%] p-4 border border-gray-200 rounded-md shadow-md mt-2">
                                                {/* Suggestions */}
                                                {suggestions.length > 0 && (
                                                    <div>
                                                        <h2 className="text-sm font-medium pb-2 border-b border-gray-300">
                                                            SUGGESTIONS
                                                        </h2>
                                                        <div className="lg:max-h-[138px] max-h-[170px] overflow-y-auto">
                                                            {suggestions.map((item, index) => (
                                                                <p
                                                                    className="text-sm text-gray-800 p-2 cursor-pointer hover:bg-slate-50 hover:font-medium hover:text-[#f97316]"
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setInputValue(item);
                                                                        dispatch(searchFoods(item));
                                                                    }}
                                                                >
                                                                    {item}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                <p>{searchResults?.length}</p>
                                                {/* Products */}
                                                {searchResults && searchResults?.length > 0 && (
                                                    <div className="mt-5">
                                                        <h2 className="text-sm font-medium pb-2 border-b border-gray-300">
                                                            PRODUCTS
                                                        </h2>
                                                        <div className="lg:max-h-[240px] max-h-[300px] overflow-y-auto">
                                                            {searchResults &&
                                                                searchResults?.length > 0 &&
                                                                searchResults?.map((item) => (
                                                                    <Link
                                                                        to={`/products/${item?.id}`}
                                                                        key={item?.id}
                                                                        className="p-1 my-1 flex gap-2 justify-start cursor-pointer hover:bg-slate-50"
                                                                        onClick={onClose}
                                                                    >
                                                                        <div>
                                                                            <Image
                                                                                src={item?.image}
                                                                                alt="Product search"
                                                                                width={80}
                                                                                height={60}
                                                                                className="object-contain"
                                                                            />
                                                                        </div>
                                                                        <div className="flex justify-center items-start gap-1 flex-col ">
                                                                            <p className="text-sm font-medium">
                                                                                {item?.name}
                                                                            </p>
                                                                            {item?.foodSizes &&
                                                                            item?.foodSizes
                                                                                ?.length > 0 &&
                                                                            item?.foodSizes[0]
                                                                                ?.discount &&
                                                                            item?.foodSizes[0]
                                                                                ?.discount !==
                                                                                0.0 ? (
                                                                                <div className="flex justify-start gap-2 items-end">
                                                                                    <p className="line-through text-xs text-gray-600">
                                                                                        {item?.foodSizes[0]?.price?.toLocaleString() ||
                                                                                            '__'}{' '}
                                                                                        VND
                                                                                    </p>
                                                                                    <p
                                                                                        className={`font-medium text-sm text-[#f97316]`}
                                                                                    >
                                                                                        {(
                                                                                            item
                                                                                                ?.foodSizes[0]
                                                                                                ?.price -
                                                                                            item
                                                                                                ?.foodSizes[0]
                                                                                                ?.price *
                                                                                                item
                                                                                                    ?.foodSizes[0]
                                                                                                    ?.discount
                                                                                        )?.toLocaleString()}{' '}
                                                                                        VND
                                                                                    </p>
                                                                                </div>
                                                                            ) : (
                                                                                <p
                                                                                    className={`font-medium text-sm text-[#f97316]`}
                                                                                >
                                                                                    {(item?.foodSizes &&
                                                                                        item
                                                                                            ?.foodSizes
                                                                                            ?.length >
                                                                                            0 &&
                                                                                        item?.foodSizes[0]?.price?.toLocaleString()) ||
                                                                                        0}{' '}
                                                                                    VND
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {searchQuery && searchResults.length === 0 && !loading && (
                                        <div className="text-center text-gray-500 mt-4 italic">
                                            No matching foods found.
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ModalSearch;
