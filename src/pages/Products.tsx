import { ProductCard } from "@/components/PorductCard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating"
import { Slider } from "@/components/ui/slider"
import { products, categories } from "@/dev-data"
import type { Product } from "@/lib/interfaces"
import { useEffect, useState } from "react"

interface Filters {
    category?: string,
    price: number[],
    rating?: number
}

export function Products() {
    const [productsList, setProductsList] = useState<Product[]>(products);
    const [sort, setSort] = useState<string>('price-accending');
    const [filters, setFilters] = useState<Filters>({
        price: [0, 3000]
    });

    useEffect(() => {
        let tempList = products;
        if (filters.category) {
            tempList = tempList.filter((prod) => prod.category === filters.category);
        }

        if (filters.price) {
            tempList = tempList.filter((prod) => prod.price >= filters?.price?.[0] && prod.price <= filters?.price?.[1])
        }

        if (filters.rating) {
            tempList = tempList.filter((prod) => prod.rating === filters.rating);
        }

        setProductsList(tempList);
        
    }, [filters])

    return (
        <div className="bg-muted flex justify-center min-h-screen w-full p-1 sm:p-6">
            <div className="w-full sm:w-[80%] bg-white p-2 sm:p-6 rounded-xl">

                {/* Filter section */}
                <div className="flex justify-end gap-3">
                    <Dialog>
                        <DialogTrigger>
                            <Button>Filter</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[420px]">
                            <DialogHeader>
                                <DialogTitle>
                                    Filters
                                </DialogTitle>
                            </DialogHeader>

                            <div className="flex flex-col gap-3">
                                <div className="space-y-3">
                                    <Label className="font-bold text-lg">Category:</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant={'outline'} size={"sm"}>
                                                Select a category
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuRadioGroup value={filters?.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                                                {categories.map((cat) =>
                                                    <DropdownMenuRadioItem value={cat}>{cat}</DropdownMenuRadioItem>
                                                )}
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="w-[60%] space-y-3">
                                    <Label className="font-bold text-lg">Price Range:</Label>
                                    <Slider
                                        value={filters?.price}
                                        onValueChange={(value) => setFilters({ ...filters, price: value })}
                                        max={3000}
                                        step={1}
                                    />
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Min: {filters?.price?.[0]}</span>
                                        <span>Max: {filters?.price?.[1]}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="font-bold text-lg">Rating:</Label>
                                    <Rating value={filters?.rating} onValueChange={(value) => setFilters({ ...filters, rating: value })}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <RatingButton className="text-yellow-500" key={index} />
                                        ))}
                                    </Rating>
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose>
                                    <Button variant={'secondary'}>Cancel</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>


                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button>
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                                <DropdownMenuRadioItem value='price-accending'>Price accending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='price-decending'>Price decending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='popularity'>Popularity</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='new'>New</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* Product List */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-5">
                    {productsList.map((prod) =>
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
            </div>
        </div>
    )
}