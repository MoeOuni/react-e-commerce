import type { Product } from "@/lib/interfaces"
import { useEffect, useState } from "react"
import { products } from "@/dev-data";
import { ProductCard } from "./PorductCard";

export function RecommendedProducts(props: { category?: string, id?: string }) {
    const [productsRec, setProductsRec] = useState<Product[]>();

    useEffect(() => {
        const foundProducts = products.filter((prod) => prod.category === props.category && prod.id !== Number(props.id)).slice(0,4);

        setProductsRec(foundProducts)
    }, [props.category, props.id])

    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-5">
            {productsRec?.map((prod) =>
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