// import Image from "next/image";

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

{/* <AddNote/> */}
{/* <NotesList/> */}

      </div>

    </>
  );
}
