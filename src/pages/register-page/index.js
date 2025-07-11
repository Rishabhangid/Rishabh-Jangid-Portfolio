// import
import React from 'react'

// component
import { AuthSidebarIamge } from '../../features/common/components/auth-sidebar-image'
import { RegisterForm } from '../../features/auth/components/register-form'

export const RegsiterPage = () => {

    return (

        <div className='grid grid-cols-1 md:grid-cols-[60%_40%] h-[100vh]'>

            {/* registration form */}
            <RegisterForm />

            {/* side image */}
            <div className='hidden md:block'>
                <AuthSidebarIamge />
            </div>

        </div>

    )
}
