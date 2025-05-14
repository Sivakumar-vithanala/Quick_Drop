import React from 'react'
import noDataImg from '../assets/nodata.avif'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-8 gap-3'>
        <img src={noDataImg} alt="No Data" className='w-80'/>
        <p className='text-neutral-800'>No Data</p>
    </div>
  )
}

export default NoData