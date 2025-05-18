import { getProducts } from '../actions';
import { Product } from '../types';

export default async function Products() {
    const { products, error } = await getProducts();

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products?.map((product: Product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}