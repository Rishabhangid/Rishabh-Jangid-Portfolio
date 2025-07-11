// import
import React from 'react'
import { motion } from "framer-motion";

// components
import { MainHeading, SubHeading } from '../../../../shared'
import { CatagoryCard } from '../../../cards/catagory-card'

export const ProductCatagory = () => {

  return (

    <motion.div className=' text-center p-6 p pt-10 pb-10 md:pt-16 '
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}  >

      <MainHeading name="Shop By Catagory" />
      <SubHeading name="Explore our top selling catagories" />
      <CatagoryCard />

    </motion.div>

  )
}
