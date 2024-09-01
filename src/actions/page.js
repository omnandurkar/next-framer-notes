"use server";

import { connectDB } from "@/database";
import Notes from "@/models/notes";



export const AddNoteAction = async (formData) => {
    await connectDB();

    const title = formData.get("title");
    const desc = formData.get("desc");
    const tag = {
        isOpen: formData.get("isOpen") === "true",
        tagTitle: formData.get("tagTitle"),
        tagColor: formData.get("tagColor"),
    };

    try {
        const newNote = new Notes({ title, desc, tag });
        await newNote.save();

        return newNote.toObject(); // Convert the Mongoose document to a plain object
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add note");
    }
};






export const FetchNoteAction = async () => {
    await connectDB();

    try {
        const notes = await Notes.find({});
        return notes.map(note => note.toObject()); // Convert each note to a plain object
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch notes");
    }
};
