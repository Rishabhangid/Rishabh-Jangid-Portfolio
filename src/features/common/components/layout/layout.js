import React from 'react'
import { Header } from '../header'
import { Footer } from '../footer/footer'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
    return (
        <div>
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
