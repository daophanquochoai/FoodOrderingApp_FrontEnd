import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toggleArrayParam } from '../../../utils';
import { FilterSidebarProps } from '../type';

const CategoryChildFilter = ({ categories, productsList }: FilterSidebarProps) => {
  
  const categorySub = categories?.map(category => ({
    name: category.name, 
    product_total: productsList?.filter(product => product.category_id == category.id).length || 0
  }));
  
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selected = searchParams.getAll('category_sub');

  // console.log(selected);

  const toggleFilter = (value: string) => {
    const updated = toggleArrayParam(searchParams, "category_sub", value);
    navigate({ search: updated.toString() });
  };

  
  return (
    <div className='px-2 py-4'>
      <h3 className="font-semibold pb-2 text-base">Product Type</h3>
      {categorySub?.map((type) => (
        <label key={type.name} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(type.name)}
            onChange={() => toggleFilter(type.name)}
            className={`size-4 cursor-pointer`}
            disabled={type.product_total == 0}
          />
          <span>{type.name} ({type.product_total})</span>
        </label>
      ))}
    </div>
  );
}

export default CategoryChildFilter