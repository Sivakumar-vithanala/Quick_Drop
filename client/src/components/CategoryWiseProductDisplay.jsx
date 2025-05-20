import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { useRef } from 'react'


const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()

    const fetchCategoryWiseProduct = async (req, res) => {
        try {
            setLoading(true)
            const res = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })
            const { data: resData } = res
            if (resData.success) {
                setData(resData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollRight -= 200
    }

    const loadingCardNumber = new Array(6).fill(null)
    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to="" className='text-two-dark hover:text-two-orginal'>See All</Link>
            </div>

            <div className='flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scroll-smooth'
                ref={containerRef}>

                {loading &&
                    loadingCardNumber.map((_, index) => {
                        return (
                            <CardLoading key={"CategoryWiseProductDisplay" + index} />
                        )
                    })
                }

                {/* {
                    data.map((p, index) => {
                        return (
                            <CardProduct data={p} key={p._id + "CategoryWiseProductDisplay" + index} />
                        )
                    })
                } */}

                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full'>
                        <LiaAngleDoubleLeftSolid size={25} />
                    </button>

                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-200 shadow-lg p-2 rounded-full'>
                        <LiaAngleDoubleRightSolid size={25} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay