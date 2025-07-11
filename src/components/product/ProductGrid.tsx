import React from 'react'
import { FilterSidebarProps } from '../category'
import ProductItem from './ProductItem';
import { filterFoods } from '../../utils';
import { useSearchParams } from 'react-router-dom';

const ProductGrid = ({ productsList = [] }: FilterSidebarProps) => {

  // console.log(productsList);
  const [searchParams] = useSearchParams();

  const filteredFoods = filterFoods(productsList, searchParams) || [];

  return (
    <div className='mt-3'>
      <div className='grid xl:grid-cols-4 md:grid-cols-3 gap-5 auto-rows-fr'>
        {filteredFoods.length > 0 &&
          filteredFoods.map((product) => (
            <div key={product.id}>
              <ProductItem {...product} />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ProductGrid