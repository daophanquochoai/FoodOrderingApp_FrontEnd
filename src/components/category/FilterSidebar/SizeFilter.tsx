import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toggleArrayParam } from '../../../utils';
import { FilterSidebarProps } from '../type';

// const sizes = ["Small", "Regular", "Medium", "Large"];

const SizeFilter = ({ productsList }: FilterSidebarProps) => {

  const sizes : string[] = productsList?.flatMap(product => product.sizes)?.map(product => product.name) ||  [];

  const uniqueSizes = [...new Set(sizes)];

  const countFoodWithSize = (size: string) => {
    return sizes.filter(s => s == size)?.length || 0;
  }

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selected = searchParams.getAll('size');

  const toggleFilter = (value: string) => {
    const updated = toggleArrayParam(searchParams, "size", value);
    navigate({ search: updated.toString() });
  };

  return (
    <div className='px-2 pt-4'>
      <h3 className="font-semibold pb-2 text-base">Size</h3>
      {uniqueSizes.length == 0 ? (
        <div>
          <span className='text-gray-400 italic text-sm'>No size</span>
        </div>
      )
      : uniqueSizes.length == 1 ? (
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={true}
              className='size-4 cursor-none'
            />
            <span>{uniqueSizes[0]} ({countFoodWithSize(uniqueSizes[0])})</span>
          </label>
        </div>
      ) 
      :
      <div>
        {uniqueSizes.map((size) => (
          <label key={size} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(size)}
              onChange={() => toggleFilter(size)}
              className='size-4 cursor-pointer'
            />
            <span>{size} ({countFoodWithSize(size)})</span>
          </label>
        ))}
      </div>
    }
    </div>
  );
}

export default SizeFilter