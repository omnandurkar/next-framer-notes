import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { LuDownload } from 'react-icons/lu'
import { motion } from 'framer-motion'

const Card = ({ data, reference }) => {
    return (
        <motion.div
            drag dragConstraints={reference}
            whileDrag={{ scale: 1.1 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
            className=' flex-shrink-0 relative w-60 h-72 rounded-[50px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden' >
            <FaRegFileAlt />
            <p className='text-sm leading-tight mt-5 font-semibold'>{data.desc}</p>
            <div className='footer  absolute bottom-0  w-full left-0 '>
                <div className='flex justify-between px-8 py-3 items-center mb-5'>
                    <h5>{data.filesize}</h5>
                    <span className='w-7 h-7 bg-zinc-600 rounded-full  flex items-center justify-center '>
                        {
                            data.close ? <IoClose /> : <LuDownload />
                        }
                    </span>
                </div>
                {
                    data.tag.isOpen ? <div className={`tag flex justify-center items-center w-full py-4 ${"bg-"+ data.tag.tagColor + "-600"}`} >
                        <h2 className='font-semibold text-sm'>{data.tag.tagTitle}</h2>
                    </div> : null
                }
            </div>
        </motion.div>
    )
}

export default Card