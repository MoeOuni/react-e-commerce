import { useParams } from "react-router-dom";

function Product() {

    const { id } = useParams();

    return (
        <div>
            This is product with id {id}
        </div>
    )
}

export default Product;