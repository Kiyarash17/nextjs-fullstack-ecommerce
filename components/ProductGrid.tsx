'use client';
import ProductCard from './ProductCard';

type Props= {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: Array<any>;
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
