import React from 'react'

export const BecomeSeller = (footerbanners) => {
  // console.log(footerbanners.footerBanners, "---------------footerbanner from inside---------------");
  return (
    <div className=' max-w-[1300px] m-auto gap-4  grid-cols-1 mt-6  md:grid md:grid-cols-2 p-6 pt-16 pb-16'>
      {
        footerbanners.footerBanners.length > 0 ?
          footerbanners.footerBanners.map((item) => (
            <div>
              <img src={`https://mukeshgems.idea2reality.tech/storage/app/public/banner/${item.photo}`} alt="ddcd"
                className='rounded-xl  dark:border-2 border-mainbutton p-2'
              />

            </div>
          ))

          : <p className='text-center'>No Banners found</p>
      }
    </div>
  )
}
