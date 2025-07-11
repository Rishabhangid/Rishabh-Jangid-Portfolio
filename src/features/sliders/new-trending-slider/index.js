import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { fetchTrendingProducts } from "../../../api/services/homepageService";

// Custom Arrows
const CustomPrevArrow = ({ onClick }) => (
    <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-800 z-10 hidden md:block"
        onClick={onClick}
    >
        <GoArrowLeft size={20} />
    </button>
);
const CustomNextArrow = ({ onClick }) => (
    <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-800 z-10 hidden md:block"
        onClick={onClick}
    >
        <GoArrowRight size={20} />
    </button>
);

export const SliderTrending = () => {
    const navigate = useNavigate();
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [hoverImages, setHoverImages] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchAllProductCategory = async () => {
            try {
                setIsLoading(true)
                const { data } = await fetchTrendingProducts();
                setTrendingProducts(data?.products || []);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchAllProductCategory();
    }, []);

    const handleMouseEnter = (id, image) => {
        setHoverImages((prev) => ({ ...prev, [id]: image }));
    };

    const handleMouseLeave = (id, image) => {
        setHoverImages((prev) => ({ ...prev, [id]: image }));
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        pauseOnHover: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        dotsClass: "slick-dots custom-dots", // Custom class for styling dots
        customPaging: (i) => <div className="w-3 h-3 bg-gray-400 rounded-full"></div>, // Custom dot style
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="slider-container px-4 sm:px-6 lg:px-8 pb-1 md:pb-8">
            <Slider {...settings} className="mt-3 md:mt-10 max-w-[1300px] mx-auto">
                {isLoading ? (
                    // skeleton
                    <div className='flex gap-6 flex-row flex-wrap justify-center items-center border-4'>

                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>
                        <div class="flex flex-col items-center justify-center  w-56 h-64 animate-pulse rounded-xl p-4 gap-4"                      >
                            <div class="bg-neutral-400/50 w-32 h-32 rounded-full animate-pulse "></div>
                            <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                        </div>



                    </div>
                ) : trendingProducts.length > 0 ? (
                    trendingProducts.map((trending) => {
                        const defaultImage = `https://mukeshgems.idea2reality.tech/storage/app/public/product/thumbnail/${trending.thumbnail}`;
                        const hoverImage = `https://mukeshgems.idea2reality.tech/storage/app/public/product/${trending.images?.[2] || trending.images?.[1] || trending.images?.[0] || trending.thumbnail}`;

                        return (
                            <div
                                key={trending.id}
                                className="flex flex-col gap-3 h-auto justify-between items-start rounded-xl p-3 sm:p-4 hover:cursor-pointer"
                                onClick={() => navigate(`/detail/${trending.slug}`)}
                            >
                                {/* Image */}
                                <div
                                    className="w-full flex justify-center"
                                    onMouseEnter={() => handleMouseEnter(trending.id, hoverImage)}
                                    onMouseLeave={() => handleMouseLeave(trending.id, defaultImage)}
                                >
                                    <img
                                        src={hoverImages[trending.id] || defaultImage}
                                        className="w-full h-[250px] sm:h-[280px] md:h-[300px] max-w-[350px] object-cover rounded-xl shadow-lg transition-opacity duration-300 ease-in-out"
                                        alt={trending.name}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col gap-2 mt-2 w-full text-mainheading">
                                    <h1 className="font-heading font-medium text-center text-xs sm:text-sm md:text-[16px] dark:text-gray-300">
                                        {trending.name.length > 25 ? `${trending.name.substring(0, 25)}...` : trending.name}
                                    </h1>

                                    {/* Price */}
                                    <div className="flex gap-2 w-full text-center justify-center items-center">
                                        <p className="text-mainheading dark:text-mainbutton text-[14px] md:text-[16px] font-normal">
                                            ₹{trending.purchase_price}
                                        </p>
                                        <p className="text-[#9A0056] dark:text-white text-[14px] sm:text-lg font-medium line-through">
                                            ₹{trending.unit_price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-lg font-medium">No trending products found</p>
                )
                }

            </Slider>

            {/* Custom styling for dots to ensure correct positioning */}
            <style>{`
                .custom-dots {
                    bottom: -46px !important; /* Move dots further down */
                }
                .custom-dots li button:before {
                    font-size: 10px; /* Reduce dot size */
                    color: gray;
                }
                .custom-dots li.slick-active button:before {
                    color: black !important; /* Highlight active dot */
                }
            `}</style>
        </div>
    );
};

