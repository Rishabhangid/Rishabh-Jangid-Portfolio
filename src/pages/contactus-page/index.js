import React, { useEffect } from 'react'
import { MainHeading, SubHeading } from '../../shared'
import { ContactUsFormSection } from '../../features/contactus-page'

export const ContactUsPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=' dark:bg-[#121212]'>
      <div className='max-w-[1400px] m-auto  pt-10 pb-10'>
        {/* <MainHeading name="CONTACT US" />
        <SubHeading name="GET IN TOUCH WITH US TODAY!" /> */}
        <ContactUsFormSection />
      </div>
    </div>
  )
}
