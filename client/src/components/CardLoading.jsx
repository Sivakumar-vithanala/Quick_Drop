import React from 'react'

const CardLoading = () => {
    return (
        <div className='border p-4 grid gap-3 max-w-52 rounded animate-pulse'>
            <div className='min-h-20 bg-blue-200 rounded'></div>
            <div className='py-3 bg-red-200 rounded w-20'></div>
            <div className='py-3 bg-red-200 rounded'></div>
            <div className='py-3 bg-red-200 rounded w-14'></div>

            <div className='flex items-center justify-between gap-3'>
                <div className='min-h-20 bg-red-200 rounded w-20'></div>
                <div className='min-h-20 bg-red-200 rounded w-20'></div>
            </div>
        </div>
    )
}

export default CardLoading