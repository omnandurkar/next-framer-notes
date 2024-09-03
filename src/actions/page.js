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
    const link = formData.get("link");

    try {
        const newNote = new Notes({ title, desc, tag, link });
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



export const DeleteNoteAction = async (id) => {
    await connectDB();

    try {
        const deletedNote = await Notes.findByIdAndDelete(id);
        if (!deletedNote) {
            throw new Error("Note not found");
        }
        return deletedNote.toObject(); // Convert the deleted note to a plain object
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete note");
    }
};


export const EditNoteAction = async (id, formData) => {
    await connectDB();

    const title = formData.get("title");
    const desc = formData.get("desc");
    const tag = {
        isOpen: formData.get("isOpen") === "true",
        tagTitle: formData.get("tagTitle"),
        tagColor: formData.get("tagColor"),
    };
    const link = formData.get("link");

    try {
        const updatedNote = await Notes.findByIdAndUpdate(
            id,
            { title, desc, tag, link },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            throw new Error("Note not found");
        }

        return updatedNote.toObject(); // Convert the updated note to a plain object
    } catch (error) {
        console.log(error);
        throw new Error("Failed to edit note");
    }
};