import { CategoryItem, DetailCategoryProduct } from '../../../components/category';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firstFetch } from '@/store/action/client/collection/collection.action';
import {
    selectCategory,
    selectSelectedCategory,
} from '@/store/selector/client/collection/collection.selector';
import { Category } from '@/type/store/client/collection/collection.style';
import { collection } from '@/store/reducer';
import { selectFood } from '@/store/selector/client/collection/food.selector';

const Collections = () => {
    // hook
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);
    const selectedCategory = useSelector(selectSelectedCategory);
    const foods = useSelector(selectFood);

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
    });

    // event handling
    const handleChooseCategory = (c: Category) => {
        dispatch(collection.actions.setSelectedCategory(c));
    };
    return (
        <>
            {selectedCategory ? (
                <h2 className="pt-8 pb-2 text-center font-kanit text-2xl ">
                    {selectedCategory.name}
                </h2>
            ) : (
                <h2 className="pt-8 pb-2 text-center font-kanit text-2xl ">All Foods</h2>
            )}
            <div className="">
                <div className="container border-t border-gray-200">
                    <div className="h-[200px]">
                        <Swiper
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 3,
                                },
                                560: {
                                    slidesPerView: 4,
                                },
                                768: {
                                    slidesPerView: 5,
                                },
                                1200: {
                                    slidesPerView: 6,
                                },
                            }}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            spaceBetween={0}
                            modules={[FreeMode, Pagination]}
                            className="SlideCategory h-full"
                        >
                            {categoryRender &&
                                categoryRender.length > 0 &&
                                categoryRender.map((c) => (
                                    <SwiperSlide key={c.id} onClick={() => handleChooseCategory(c)}>
                                        <CategoryItem
                                            {...{
                                                ...c,
                                                small: true,
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="container">
                <DetailCategoryProduct products={foods} />
            </div>
        </>
    );
};

export default Collections;
