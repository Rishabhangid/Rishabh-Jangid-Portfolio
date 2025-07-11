// import
import React from 'react'

// components
import { AuthSidebarIamge } from '../../features/common/components/auth-sidebar-image'
import { LoginForm } from '../../features/auth/components/login-form'

export const LoginPage = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-[60%_40%] h-[100vh]'>

            {/* lofin form */}
            <div className='order-2 lg:order-1 '>
                <LoginForm />
            </div>

            {/* side image */}
            <div className='order-1 hidden md:block lg:order-2 sm:h-[10%] md:h-[100%] lg:w-[100%] '>
                <AuthSidebarIamge />
            </div>

        </div>
    )
}
