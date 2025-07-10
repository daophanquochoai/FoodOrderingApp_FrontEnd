import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toggleArrayParam } from '../../../utils';
import { FilterSidebarProps } from '../type';

const AvailabilityFilter = ({ categories, productsList }: FilterSidebarProps) => {
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const current = searchParams.getAll("availability");

  const countStock = productsList?.filter(food => food.status == true).length || 0;
  const countOutOfStock = productsList?.filter(food => food.status == false).length || 0;

  const toggleFilter = (value: string) => {
    const updated = toggleArrayParam(searchParams, "availability", value);
    navigate({ search: updated.toString() });
  };

  return (
    <div className='px-2 py-4'> 
      <h3 className="font-semibold pb-2 text-base">Availability</h3>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={current.includes("1")} onChange={() => toggleFilter("1")} className='size-4 cursor-pointer' />
        <span>In Stock ({countStock})</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={current.includes("0")} onChange={() => toggleFilter("0")} className='size-4 cursor-pointer' />
        <span>Out of stock ({countOutOfStock})</span>
      </label>
    </div>
  );
}

export default AvailabilityFilter