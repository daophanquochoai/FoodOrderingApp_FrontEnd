import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FloatingInput } from '../../input';

const PriceFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [min, setMin] = useState(searchParams.get("price.gte") || "");
  const [max, setMax] = useState(searchParams.get("price.lte") || "");

  const applyPriceFilter = () => {
    if (min) searchParams.set("price.gte", min);
    else searchParams.delete("price.gte");

    if (max) searchParams.set("price.lte", max);
    else searchParams.delete("price.lte");

    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      applyPriceFilter();
    }, 1000); 
  
    return () => {
      clearTimeout(handler); 
    };
  }, [min, max]);

  return (
    <div className='px-2 py-4'>
      <h3 className="font-semibold mb-1">Price</h3>
      <div className="flex gap-1">
        <FloatingInput
          id="From"
          type="number"
          label="From"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          small={true}
        />
        <FloatingInput
          id="To"
          type="number"
          label="To"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          small={true}
        />
      </div>
    </div>
  );
}

export default PriceFilter