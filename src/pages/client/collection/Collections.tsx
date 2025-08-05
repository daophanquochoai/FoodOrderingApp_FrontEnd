import { CategoryItem, DetailCategoryProduct } from '../../../components/category';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firstFetch, fetchFood } from '@/store/action/client/collection/collection.action';
import {
    selectCategory,
    selectSelectedCategory,
} from '@/store/selector/client/collection/collection.selector';
import { Category } from '@/type/store/client/collection/collection.style';
import { collection, food } from '@/store/reducer';
import { selectFood, selectFilter } from '@/store/selector/client/collection/food.selector';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa';
import { PiEmptyDuotone } from 'react-icons/pi';
import { initFoodFilter } from '@/defaultValue/client/collection/food';

const Collections = () => {
    // hook
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);
    const selectedCategory = useSelector(selectSelectedCategory);
    const foods = useSelector(selectFood);
    const currentFilter = useSelector(selectFilter);

    //state
    const [categoryRender, setCategoryRender] = useState<Category[]>([]);

    // useEffect
    useEffect(() => {
        dispatch(firstFetch());
    }, []);

    useEffect(() => {
        setCategoryRender(
            category.filter((c) => {
                if (selectedCategory == null || selectedCategory == undefined) {
                    return c.parent == null;
                } else {
                    return c?.parent?.id === selectedCategory?.id;
                }
            })
        );
    }, [category, selectedCategory]);

    // scrol to
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // event handling
    const handleChooseCategory = (c: Category) => {
        dispatch(collection.actions.setSelectedCategory(c));

        const updatedFilter = {
            ...initFoodFilter,
            categoryId: [c.id], // category
        };

        dispatch(food.actions.setFilter(updatedFilter));
        dispatch(fetchFood());
    };

    const handleBackToParent = () => {
        if (selectedCategory?.parent) {
            // back to parent category
            dispatch(collection.actions.setSelectedCategory(selectedCategory.parent));

            // Update filter for parent category
            const updatedFilter = {
                ...initFoodFilter,
                id: [selectedCategory.parent.id],
            };
            dispatch(food.actions.setFilter(updatedFilter));
            dispatch(fetchFood());
        } else {
            // back to root
            dispatch(collection.actions.setSelectedCategory(null));

            // Reset filter to show all foods
            dispatch(food.actions.setFilter(initFoodFilter));
            dispatch(fetchFood());
        }
    };

    const handleBackToRoot = () => {
        dispatch(collection.actions.setSelectedCategory(null));

        // Reset filter to show all foods
        dispatch(food.actions.setFilter(initFoodFilter));
        dispatch(fetchFood());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* header*/}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    {/* navigation */}
                    <div className="flex items-center justify-between mb-3">
                        {/* back button - show khi co category con */}
                        {selectedCategory && (
                            <button
                                onClick={handleBackToParent}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-all duration-200 group text-sm"
                            >
                                <FaAngleLeft
                                    className="w-3 h-3 transform group-hover:-translate-x-0.5
                                transition-transform duration-200"
                                />
                                <span className="font-medium">
                                    {selectedCategory.parent
                                        ? selectedCategory.parent.name
                                        : 'All Categories'}
                                </span>
                            </button>
                        )}

                        {/* root categoy */}
                        {!selectedCategory && <div></div>}

                        {/* breadcrumb */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <button
                                onClick={handleBackToRoot}
                                className={`hover:text-orange-600 transition-colors duration-200 ${
                                    !selectedCategory ? 'text-orange-600 font-semibold' : ''
                                }`}
                            >
                                All Foods
                            </button>
                            {selectedCategory && (
                                <>
                                    <FaChevronRight className="size-2 text-gray-400" />
                                    <span className="text-orange-600 font-semibold">
                                        {selectedCategory.name}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* title */}
                    <div className="text-center">
                        <h2 className="font-bold text-xl text-gray-800 mb-1">
                            {selectedCategory ? selectedCategory.name : 'All Foods'}
                        </h2>
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                            <p>
                                {selectedCategory
                                    ? `${categoryRender.length} subcategories available`
                                    : `${categoryRender.length} categories available`}
                            </p>
                            {selectedCategory && (
                                <>
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    <p>{foods.length} products found</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Slider Section - Only show when there are categories */}
            {categoryRender.length > 0 && (
                <div className="bg-white py-6">
                    <div className="container mx-auto px-4">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                                {selectedCategory
                                    ? `Subcategories of ${selectedCategory.name}`
                                    : 'Browse Categories'}
                            </h3>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                        </div>

                        <div className="h-[160px]">
                            <Swiper
                                loop={true}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2.5,
                                        spaceBetween: 12,
                                    },
                                    480: {
                                        slidesPerView: 3.5,
                                        spaceBetween: 16,
                                    },
                                    640: {
                                        slidesPerView: 4.5,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 5.5,
                                        spaceBetween: 24,
                                    },
                                    1024: {
                                        slidesPerView: 6.5,
                                        spaceBetween: 24,
                                    },
                                    1200: {
                                        slidesPerView: 7.5,
                                        spaceBetween: 24,
                                    },
                                }}
                                freeMode={true}
                                modules={[FreeMode]}
                                className="category-swiper h-full pb-0"
                                style={{ paddingBottom: 0 }}
                            >
                                {categoryRender.map((c) => (
                                    <SwiperSlide key={c.id} onClick={() => handleChooseCategory(c)}>
                                        <div className="h-full p-1">
                                            <CategoryItem
                                                {...{
                                                    ...c,
                                                    small: true,
                                                }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            )}

            {/* empty category*/}
            {categoryRender.length === 0 && selectedCategory && (
                <div className="bg-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <div className="w-12 h-12 text-xl mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                <PiEmptyDuotone />
                            </div>
                            <h4 className="text-base font-medium text-gray-800 mb-1">
                                No Subcategories
                            </h4>
                            <p className="text-gray-600 text-sm">
                                This category doesn't have any subcategories yet.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-6">
                <DetailCategoryProduct products={foods} />
            </div>
        </div>
    );
};

export default Collections;
