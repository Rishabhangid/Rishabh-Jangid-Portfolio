import React from 'react'

export const TopSelling = () => {
  return (
    <div className='border-2 grid grid-cols-2 gap-6 max-w-[1300px] m-auto'>
        <div className='bg-primary p-6 rounded-md'>
            <h1>Best Selling</h1>
        </div>
        <div className='bg-yellow-400 rounded-md'>
            <h1>Top Rated</h1>
        </div>
    </div>
  )
}
