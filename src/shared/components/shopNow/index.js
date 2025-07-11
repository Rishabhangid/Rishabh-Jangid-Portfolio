import React from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom'

export const ShopNowButton = () => {
    const navigate = useNavigate()
    return (

        // <button className='font-heading font-light text-2xl md:text-2xl w-[250px] md:w-[300px] button-effect'>
        //     <span class="span-mother">
        //         <span>S</span>
        //         <span>H</span>
        //         <span>O</span>
        //         <span>P</span>
        //         <span className='pl-2'> </span>
        //         <span>N</span>
        //         <span>O</span>
        //         <span>W</span>
        //     </span>
        //     <span class="span-mother2">
        //     <span>S</span>
        //         <span>H</span>
        //         <span>O</span>
        //         <span>P</span>
        //         <span className='pl-2'> </span>
        //         <span>N</span>
        //         <span>O</span>
        //         <span>W</span>
        //     </span>
        // </button>
        <button onClick={()=>navigate("/")} class="bg-[#D4AF37] hover:bg-[#b59934] text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-200 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
        Shop Now
    </button>

    )
}
