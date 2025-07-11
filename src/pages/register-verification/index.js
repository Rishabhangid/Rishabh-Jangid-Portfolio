import React from 'react'
import { AuthSidebarIamge } from '../../features/common/components/auth-sidebar-image'
import { LoginForm } from '../../features/auth/components/login-form'
import { ForgotPasswordForm } from '../../features/auth/components/forgotPassword'
import { VerifyPhoneNumber } from '../../features/auth/components/verify-number'

export const VerifyNumber = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-[60%_40%] h-[100vh]'>
            <div className='order-2 lg:order-1 '>
                <VerifyPhoneNumber />
            </div>
            <div className='order-1 lg:order-2 sm:h-[10%] md:h-[100%] lg:w-[100%] '>
                <AuthSidebarIamge />
            </div>
        </div>
    )
}
