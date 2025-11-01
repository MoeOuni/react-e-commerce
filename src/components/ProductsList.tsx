import { products } from "@/dev-data"
import { ProductCard } from "./PorductCard"

export function PorductsList() {
    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-5">
            {products.slice(5, 13).map((prod) => 
                <ProductCard 
                    id={prod.id}
                    name={prod.name}
                    image={prod.image}
                    category={prod.category}
                    price={prod.price}
                    discount={prod.discount}
                    rating={prod.rating}
                />
            )}
        </div>
    )
}