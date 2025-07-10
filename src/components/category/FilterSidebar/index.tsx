import React from 'react'
import {AvailabilityFilter, Category, CategoryChildFilter, FilterResult, FilterSidebarProps, PriceFilter, SizeFilter} from '../../category';
import { Food } from '../../product';
import { useSearchParams } from 'react-router-dom';
import { filterFoods } from '../../../utils';



const FilterSidebar = ({ categories, productsList }: FilterSidebarProps) => {

  // console.log(categories);
  // console.log(productsList);
  const [searchParams] = useSearchParams();


  console.log("------------");
  searchParams.forEach((v, k) => {
    console.log(k, ": ", v);
  });

  const filteredFoods = filterFoods(productsList, searchParams);
  console.log(filteredFoods);

  return (
    <aside className='w-full bg-white rounded-md p-4 md:py-6 md:px-4 font-montserrat font-medium text-[15px] leading-[2]'>
        <FilterResult/>
        <hr/>
        <AvailabilityFilter categories={categories} productsList={filteredFoods}/>
        <hr/>
        <PriceFilter/>
        <hr/>
        <CategoryChildFilter categories={categories} productsList={productsList}/>
        <hr/>
        <SizeFilter categories={categories} productsList={productsList}/> 
    </aside>
  )
}

export default FilterSidebar