import React from 'react'
import { MainHeading, SubHeading } from '../../../../shared'
import { SliderTrending } from '../../../sliders'


export const TrendingProducts = () => {
  return (
    // <div className='text-center py-16   md:py-12  bg-[#FAF6F0]' style={{ clipPath: "polygon(0 0, 100% 9%, 100% 100%, 0 88%)" }}>
    // <div className='text-center py-16   md:py-12  bg-gray-100 dark:bg-[#121212]'>
    <div className='text-center py-6 md:py-12  bg-[#F9F5F0] dark:bg-[#121212]'>

      <MainHeading name="Discover All Trends" />
      <SubHeading name="Stay ahead with the hottest styles" />
      <SliderTrending/>

    </div>
  )
}
