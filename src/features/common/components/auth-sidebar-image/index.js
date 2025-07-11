// import
import React from 'react'

// assests
import SIDEIMAGE from "../../../../assets/images/authpage/auth-cover.jpg"
import LOGO from "../../../../assets/images/logo/logo-auth.png"


export const AuthSidebarIamge = () => {
    return (

        <div className='bg-slate-500 relative hidden md:block'>
            <img src={SIDEIMAGE} alt="ddvvd" className='w-full md:h-[150px] lg:h-[100vh]' />
            <img src={LOGO} alt="ddvvd" className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[250px] ' />
        </div>
        
    )
}
