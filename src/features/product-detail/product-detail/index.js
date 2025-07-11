import React from 'react'

export const ProductDetailSection = ({ detail }) => {
  // console.log(detail, "---------------detail from detail---------------");
  return (

    <div className='max-w-[1400px] m-auto '>

      {/* <div className='bg-white dark:bg-[#0D1F1A] dark:bg- mt-16 mb-6 mx-4 md:mx-2'> */}
      {/* <div className='dark:bg-[#d7c1a1] dark:bg- mt-16 mb-6 mx-4 md:mx-2 bg-[#FAF6F0] rounded-r-lg shadow-lg'>
        <h1 className=' p-4 font-subheading text-mainheading dark:text-white w-fit border-l-4 border-primary dark:border-mainbutton '>PRODUCT DETAILS</h1>
      </div> */}
      <div className=' mb-6 mx-4 md:mx-2 border-b-4 border-pinkmain'>
        <h1 className=' p-4 font-medium text-pinkmain  dark:text-white w-fit  dark:border-mainbutton '>PRODUCT DETAILS</h1>
      </div>

      <div className='p-3  text-[#868686]'>

        <p dangerouslySetInnerHTML={{ __html: detail.details }} className='font-light '></p>

      </div>

    </div>

  )
}
