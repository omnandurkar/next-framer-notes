'use client'
import React from 'react'

const Background = () => {
    return (
        <>

            <div className='fixed h-screen w-full z-[2]' >
                <div className='absolute top-[5%]  w-full justify-center text-zinc-600 flex py-10 font-semibold text-xl' >Documents</div>
                <h1 className='text-[13vw] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold text-zinc-900 absolute leading-none tracking-tighter'>Docs.</h1>


            </div>
        </>
    )
}

export default Background