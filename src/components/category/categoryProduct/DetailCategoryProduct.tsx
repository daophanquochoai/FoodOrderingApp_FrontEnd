import React from 'react';
import { Food } from '../../../type';
import { ProductGrid } from '../../product';
import { FilterBar } from '../../category';

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
