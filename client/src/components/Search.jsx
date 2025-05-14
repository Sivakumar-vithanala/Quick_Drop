import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';




const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])

    const redirectToSearchPage = () => {
        navigate("/search")
    }


    return (
        <div className='w-full min-w[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-xl border overflow-hidden flex items-center text-neutral-500 bg-slate-100 group focus-within:border-primary'>
            <div>
                {
                    (isMobile && isSearchPage) ? (
                        <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary bg-white rounded-full shadow-md'>
                            <FaArrowLeft size={22} />
                        </Link>
                    ) : (
                        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary'>
                            <IoMdSearch size={22} />
                        </button>
                    )
                }
            </div>
            <div className='w-full h-full flex items-center'>
                {
                    !isSearchPage ? (
                        //not in search page
                        <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                            <TypeAnimation
                                sequence={[
                                    'Search "Bread"', 1000,
                                    'Search "Milk"', 1000,
                                    'Search "Eggs"', 1000,
                                    'Search "Apples"', 1000,
                                    'Search "Rice"', 1000,
                                    'Search "Chicken"', 1000,
                                    'Search "Butter"', 1000,
                                    'Search "Flour"', 1000,
                                    'Search "Sugar"', 1000,
                                    'Search "Salt"', 1000,
                                    'Search "Oil"', 1000,
                                    'Search "Banana"', 1000,
                                    'Search "Onion"', 1000,
                                    'Search "Tomato"', 1000,
                                    'Search "Potato"', 1000,
                                    'Search "Cheese"', 1000,
                                    'Search "Yogurt"', 1000,
                                    'Search "Tea"', 1000,
                                    'Search "Coffee"', 1000,
                                    'Search "Orange"', 1000,
                                    'Search "Lettuce"', 1000,
                                    'Search "Carrot"', 1000,
                                    'Search "Soap"', 1000,
                                    'Search "Detergent"', 1000,
                                    'Search "Toothpaste"', 1000,
                                    'Search "Spinach"', 1000,
                                    'Search "Biscuits"', 1000,
                                    'Search "Cereal"', 1000,
                                    'Search "Noodles"', 1000,
                                    'Search "Juice"', 1000,
                                    'Search "Water Bottle"', 1000,
                                    'Search "Cornflakes"', 1000,
                                    'Search "Green Peas"', 1000,
                                    'Search "Mustard"', 1000,
                                    'Search "Jam"', 1000,
                                    'Search "Honey"', 1000,
                                    'Search "Mayonnaise"', 1000,
                                    'Search "Pickle"', 1000,
                                    'Search "Chili Powder"', 1000,
                                    'Search "Turmeric"', 1000,
                                    'Search "Ginger"', 1000,
                                    'Search "Garlic"', 1000,
                                    'Search "Cucumber"', 1000,
                                    'Search "Cabbage"', 1000,
                                    'Search "Paneer"', 1000,
                                    'Search "Mint Leaves"', 1000,
                                    'Search "Baking Soda"', 1000,
                                    'Search "Vinegar"', 1000,
                                    'Search "Soy Sauce"', 1000,
                                    'Search "Black Pepper"', 1000,

                                ]}
                                wrapper="span"
                                speed={50}
                                // style={{ fontSize: '2em', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // when i was search page
                        <div className=''>
                            <input type='text' placeholder='Search For Atta Dal and More...' autoFocus className='bg-transparent w-full h-full outline-none' />
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Search