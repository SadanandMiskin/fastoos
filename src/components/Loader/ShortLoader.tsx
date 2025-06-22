import { motion } from 'framer-motion'
// import React from 'react'

const ShortLoader = () => {
  return (
<>

       <motion.div
                                   style={{
                                       width: 30,
                                       height: 30,
                                       borderRadius: "50%",
                                       border: "5px solid rgba(0, 0, 0, 0.1)",
                                       borderTopColor: "red",
                                   }}
                                   animate={{ rotate: 360 }}
                                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                               />
</>
  )

}

export default ShortLoader
