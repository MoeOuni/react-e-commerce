import { ListCategories } from "@/components/ListCategories";
import { PorductsList } from "@/components/ProductsList";
import { PromotionSection } from "@/components/PromotionSection";
import { Button } from "@/components/ui/button";

function Home() {
    return (
        <div>
            <div className="w-full flex flex-col items-center">
                <div className="w-full sm:w-[80%] sm:py-10 py-4">
                    <PromotionSection />
                </div>

                <div className="bg-muted w-full sm:p-10 p-1">
                    <h4 className="font-bold text-3xl text-center text-primary">
                        Our Categories
                    </h4>

                    <ListCategories />
                </div>


                <div className="w-full sm:w-[80%] sm:py-10 py-4">
                    <h4 className="font-bold text-3xl text-center text-primary">
                        Our Latest Product
                    </h4>

                    <PorductsList />

                    <div className="w-full flex justify-center mt-5">
                        <Button className="text-xl h-12">
                            Explore All Products
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Home;