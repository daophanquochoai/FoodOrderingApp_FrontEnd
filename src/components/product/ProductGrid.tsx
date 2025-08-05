import { Food } from '@/type/store/client/collection/food.style';
import ProductItem from './ProductItem';

const ProductGrid = ({ products = [] }: { products: Food[] }) => {
    return (
        <div className="mt-5">
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 auto-rows-fr">
                {products.length > 0 &&
                    products.map((product) => (
                        <div key={product.id}>
                            <ProductItem {...product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductGrid;
