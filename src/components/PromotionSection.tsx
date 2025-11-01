import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import { products } from "@/dev-data"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

export function PromotionSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const navigate = useNavigate();

    function navigateToDetails(id: number) {
        navigate('/product/' + id);
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {products.slice(0, 5).map((prod, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex flex-col md:flex-row gap-5 aspect-16/4">
                                    <img src={prod.image} className="rounded-2xl shadow" />
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-3xl font-bold text-primary">{prod.name}</h3>
                                        <p className="text-foreground font-medium hidden md:block">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </p>
                                        <div className="flex gap-2">
                                        {
                                            prod.badges.map((b) => 
                                                <Badge>{b}</Badge>
                                            )
                                        }
                                        </div>

                                        <span className="font-bold">
                                            {prod.price} TND <span className="text-primary">({prod.discount})</span>
                                        </span>

                                        <Button className="max-w-xs" onClick={() => navigateToDetails(prod.id)}>
                                            Buy Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
