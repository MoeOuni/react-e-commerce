import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function ProductCard(props: {
    id: number;
    name: string,
    category: string,
    price: number,
    image: string,
    discount: string,
    rating: number,
}) {

    const navigate = useNavigate();

    function navigateToDetails() {
        navigate('/product/' + props.id);
    }

    return (
        <Card>
            <CardHeader>
                <img className="aspect-square" src={props.image} />
            </CardHeader>
            <CardContent>
                <h5>
                    {props.name}
                </h5>
                <span className="font-bold">
                    {props.price} TND 
                    <span className="text-primary">({props.discount})</span>
                </span>
            </CardContent>
            <CardFooter>
                <Button onClick={navigateToDetails}>
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    )
}