import React, { useState } from 'react'

export const FilterProductsSection = () => {

     const [filters, setFilters] = useState({
        sortBy: "most_favorite",
        priceMin: "",
        priceMax: "",
        brand: "",
      });
    
      const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Applied Filters:", filters);
        // Apply the filter logic or API request here
      };



    return (
        <form className="p-4 mt-6 shadow rounded flex justify-between  items-center bg-primary font-subheading" onSubmit={handleSubmit}>
            {/* Sorting Filter */}
            <fieldset className="">

                <label htmlFor="sortBy" className="block">Sort By</label>
                <select
                    name="sortBy"
                    id="sortBy"
                    value={filters.sortBy}
                    onChange={handleChange}
                    className="w-[200px] border p-2 rounded bg-white"
                >
                    <option value="most_favorite">Best-selling </option>
                    <option value="latest">Latest</option>
                    <option value="price_low_high">Featured deal</option>
                    <option value="price_high_low">Most-favorite</option>
                </select>
            </fieldset>

            {/* Brand Filter */}
            <fieldset className="">

                <label htmlFor="sortBy" className="block">Sort By</label>
                <select
                    name="sortBy"
                    id="sortBy"
                    value={filters.sortBy}
                    onChange={handleChange}
                    className="w-[200px] border p-2 rounded bg-white"
                >
                    <option value="most_favorite">Best-selling </option>
                    <option value="latest">Latest</option>
                    <option value="price_low_high">Featured deal</option>
                    <option value="price_high_low">Most-favorite</option>
                </select>
            </fieldset>

            {/* Categories */}
            <fieldset className="">

                <label htmlFor="sortBy" className="block">
                    Catagory
                </label>
                <select
                    name="sortBy"
                    id="sortBy"
                    value={filters.sortBy}
                    onChange={handleChange}
                    className="w-[200px] border p-2 rounded bg-white"
                >
                    <option value="most_favorite">Most Favorite</option>
                    <option value="latest">Latest</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                </select>
            </fieldset>

            {/* Price Filter */}
            <fieldset className="">
                <legend className="font-semibold">Price</legend>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="priceMin"
                        value={filters.priceMin}
                        onChange={handleChange}
                        placeholder="Min"
                        className="w-[150px] border p-2 rounded bg-white"
                    />
                    <span className="self-center">to</span>
                    <input
                        type="number"
                        name="priceMax"
                        value={filters.priceMax}
                        onChange={handleChange}
                        placeholder="Max"
                        className="w-[150px] border p-2 rounded bg-white"
                    />
                </div>
            </fieldset>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-4 bg-textyellow text-white w-[200px] py-2 rounded"
            >
                Apply Filters
            </button>
        </form>
    )
}
