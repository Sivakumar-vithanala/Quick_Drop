import React from 'react'
import { DisplayPriceInRupess } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import valideURLConvert from '../utils/valideURLConvert'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
  return (
     <Link to={url} className='border p-4 grid gap-3 max-w-52 lg:min-w-52 rounded'>

            <div className='min-h-20 max-h-32 rounded'>
                <img src={data.image[0]} alt="" 
                className='w-full h-full object-scale-down scale-x-125'/>
            </div>

            <div className='rounded text-sm w-fit p-[1px] px-2 bg-gray-100 text-two-orginal'>
                10 min 
            </div>
            
            <div className='font-medium text-ellipsis line-clamp-2'>
                {data.name}
            </div>


            <div className='w-fit'>
                {data.unit}
            </div>

            <div className='flex items-center justify-between gap-3'>

                <div className=''>
                    {DisplayPriceInRupess(data.price)}
                </div>

                <div className='font-semibold'>
                    <button className='bg-two-orginal hover:bg-two-dark text-white px-4 py-1 rounded'>
                        Add
                    </button>
                </div>
            </div>
        </Link>
  )
}

export default CardProduct