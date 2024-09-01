'use client'

import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card'
import { FetchNoteAction } from '@/actions/page'
import AddNote from '../AddNote'
// import AddNote from '../AddNote'
// import Card from './Card'


const Foreground = () => {

    const ref = useRef(null)

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const fetchedNotes = await FetchNoteAction();
            setNotes(fetchedNotes);
        };
        fetchNotes();
    }, []);


    return (
        <div ref={ref} className='fixed p-5 top-0 left-0 w-full h-full  z-[3] flex gap-10  flex-wrap'>

            {
                notes.map((note, index) => {
                    return (
                        <Card key={index} data={note} reference={ref} />
                    )
                })
            }

            <AddNote />




        </div>

    )
}

export default Foreground