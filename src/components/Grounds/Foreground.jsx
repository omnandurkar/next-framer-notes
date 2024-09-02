'use client'

import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card'
import { FetchNoteAction } from '@/actions/page'
import AddNote from '../AddNote'

const Foreground = () => {
    const ref = useRef(null)

    const [notes, setNotes] = useState([]);
    const [notesIsLoading, setNotesIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await FetchNoteAction();
                setNotes(fetchedNotes);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            } finally {
                setNotesIsLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleDeleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    };

    const handleUpdateNotes = async () => {
        try {
            const updatedNotes = await FetchNoteAction();
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Failed to fetch updated notes:', error);
        }
    };

    return (
        <div ref={ref} className='fixed inset-0 md:overflow-hidden lg:overflow-hidden overflow-auto p-10 md:px-20 top-0 left-0 w-full h-full z-[3]'>

            <div className='mt-10'>
                {
                    notesIsLoading ?
                        <div className='flex gap-10 justify-center md:justify-normal flex-wrap'>
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className='w-60 h-72 rounded-[50px] bg-neutral-900/50 animate-pulse'></div>
                            ))}
                        </div>
                        :
                        <div className='flex gap-10 justify-center md:justify-normal flex-wrap'>
                            {
                                notes && notes.length > 0 ? notes.map((note) => (
                                    <Card
                                        key={note._id}
                                        data={note}
                                        reference={ref}
                                        onDelete={handleDeleteNote}
                                        onUpdate={handleUpdateNotes} // Add onUpdate handler
                                    />
                                )) : <div className='relative'> <div className='text-center text-lg font-bold fixed top-52 left-1/2 -translate-x-[50%] text-neutral-100'>No notes found</div>
                                    <div className=' fixed top-64 left-1/2 -translate-x-[50%] text-neutral-100'><AddNote onNoteAdded={handleUpdateNotes} /> </div>
                                </div>
                            }
                        </div>
                }
            </div>

            <div className="absolute top-5 right-5">
                {
                    notes && notes.length > 0 && <AddNote onNoteAdded={handleUpdateNotes} />
                }
            </div>
        </div>
    )
}

export default Foreground
