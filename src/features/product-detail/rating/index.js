import { useEffect, useState } from "react";
import { fetchProductRatingOnly } from "../../../api/services/productDetailPageService";
import { FaStar } from "react-icons/fa"; // Import star icon
import { FaRegStar } from "react-icons/fa";





export const Rating = () => {

    const [rating, setRating] = useState("")

    useEffect(() => {
        // fetching all trending products
        const fetchProductRating = async () => {
            try {
                const fetch_product_rating = await fetchProductRatingOnly(2);
                const product_rating = fetch_product_rating?.data || 0
                console.log(product_rating, "---------------product_rating nnnn---------------");
                setRating(product_rating)


            } catch (error) {
                console.log(error, "---------------error---------------");
            }
        };
        fetchProductRating()
    }, [])




    return (
        <div className="flex  items-center gap-2">
            {[...Array(rating)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500 text-xl" />
            ))}
            {/* Empty Stars (5 - rating) */}
            {[...Array(5 - rating)].map((_, index) => (
                <FaRegStar key={index + rating} className=" text-xl" />
            ))}
            <p className="text-xl">({rating})</p>

        </div>
    )
}
