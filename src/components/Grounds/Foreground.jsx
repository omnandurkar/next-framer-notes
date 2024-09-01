'use client'

import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card'
import { FetchNoteAction } from '@/actions/page'
import AddNote from '../AddNote'
import { set } from 'mongoose'
// import AddNote from '../AddNote'
// import Card from './Card'


const Foreground = () => {

    const ref = useRef(null)

    const [notes, setNotes] = useState([]);
    const [notesIsLoading, setNotesIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await FetchNoteAction();
            setNotes(fetchedNotes);
        };
        fetchNotes();
        setNotesIsLoading(false);
    }, []);


    return (
        <div ref={ref} className='fixed p-5 top-0 left-0 w-full h-full  z-[3] '>

            <div className=' mt-10'>

                {
                    notesIsLoading ?
                        <div className='flex gap-10  flex-wrap mx-auto'>

                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>
                            <div className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'>
                            </div>


                        </div>
                        :
                        <div className='flex gap-10  flex-wrap'>

                            {
                                notes.map((note, index) => {
                                    return (
                                        <Card key={index} data={note} reference={ref} />
                                    )
                                })
                            }
                        </div>
                }


            </div>

            <div className="absolute top-5 right-5">
                <AddNote />
            </div>





        </div>

    )
}

export default Foreground