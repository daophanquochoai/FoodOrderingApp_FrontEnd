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
    <div className='ml-0 md:ml-2 lg:ml-4 p-2'>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-5 auto-rows-fr'>
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