import React from 'react';
import { ProductGrid } from '../../product';
import { FilterBar } from '../../category';
import { Food } from '@/type/store/client/collection/food.style';

const DetailCategoryProduct = ({ products }: { products: Food[] }) => {
    return (
        <>
            <div>
                <div className="border-t border-gray-200 py-5">
                    <FilterBar />
                    <ProductGrid products={products} />
                </div>
            </div>
        </>
    );
};

export default DetailCategoryProduct;
