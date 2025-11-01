import { useParams } from "react-router-dom";
import { products } from "@/dev-data";
import { useEffect, useState } from "react";
import type { Product as ProductI } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel, CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { Separator } from "@/components/ui/separator";

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductI>();


    useEffect(() => {
        if (id) {
            const foundProduct = products.find((prod) => { return prod.id === Number(id) });

            setProduct(foundProduct)
        } else {
            console.log('No id has been passed to the params');
        }
    }, [id])

    return (
        <div className="bg-muted flex justify-center min-h-screen w-full p-1 sm:p-6">
            <div className="w-full sm:w-[80%] bg-white p-2 sm:p-6 rounded-xl">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <div>
                        <Carousel>
                            <CarouselContent>
                                {product?.detailImages?.map((image, index) => {
                                    return (
                                        <CarouselItem key={index}>
                                            <img src={image} className="rounded-xl" />
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-4xl font-bold">{product?.name}</h3>



                        <span className="font-bold">
                            {product?.price} TND <span className="text-primary">({product?.discount})</span>
                        </span>

                        <div className="flex align-center gap-1">
                            <Rating value={product?.rating} readOnly>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <RatingButton className="text-yellow-500" key={index} />
                                ))}
                            </Rating>

                            <span className="font-bold">({product?.reviews} Reviews)</span>
                        </div>

                        <div className="flex gap-2">
                            {
                                product?.badges.map((b) =>
                                    <Badge>{b}</Badge>
                                )
                            }
                        </div>

                        <Button className="max-w-xs">
                            Add to cart
                        </Button>

                        <p className="text-foreground font-medium hidden md:block">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>

                <Separator className="my-5" />
                <h4 className="text-xl font-bold text-center">You might also like</h4>
                <RecommendedProducts category={product?.category} id={id} />
            </div>
        </div>
    )
}

export default Product;