// import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"

import AddNote from "@/components/AddNote";
import Background from "@/components/Grounds/Background";
import Foreground from "@/components/Grounds/Foreground";
import NotesList from "@/components/NoteList";

export default function Home() {
  return (
    <>
      <div className='relative w-full h-screen bg-zinc-800'>
        <Background />
        <Foreground />
        <Toaster />

        {/* <AddNote/> */}
        {/* <NotesList/> */}

      </div>

    </>
  );
}
