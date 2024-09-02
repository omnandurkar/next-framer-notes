'use client'

import { AddNoteAction } from "@/actions/page";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const AddNote = ({ onNoteAdded }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tagTitle, setTagTitle] = useState("");
    const [tagColor, setTagColor] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("isOpen", isOpen.toString());
        formData.append("tagTitle", tagTitle);
        formData.append("tagColor", tagColor);

        try {
            await AddNoteAction(formData);
            onNoteAdded(); // Notify the parent component that a note has been added

            // Optionally reset the form
            setTitle("");
            setDesc("");
            setTagTitle("");
            setTagColor("");
            setIsOpen(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>Add Note</Button>

            <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
                <form onSubmit={handleSubmit}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Note</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to create a new note. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Note Title"
                                    required
                                />
                            </div>
                            <div className="items-center gap-4">
                                <Label htmlFor="desc" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="desc"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Note Description"
                                    required
                                />
                            </div>
                            <div className="ms-1 flex items-center gap-2">
                                <Checkbox
                                    id="isOpen"
                                    checked={isOpen}
                                    onCheckedChange={(checked) => setIsOpen(checked)}
                                    required
                                />
                                <Label htmlFor="isOpen">Open Tag</Label>
                            </div>

                            {isOpen && (
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="items-center gap-4">
                                        <Label htmlFor="tagTitle" className="text-right">
                                            Tag Title
                                        </Label>
                                        <Input
                                            id="tagTitle"
                                            value={tagTitle}
                                            onChange={(e) => setTagTitle(e.target.value)}
                                            className="col-span-3"
                                            placeholder="Tag Title"
                                        />
                                    </div>
                                    <div className="items-center gap-4">
                                        <Label htmlFor="tagColor" className="text-right">
                                            Tag Color
                                        </Label>
                                        <select
                                            id="tagColor"
                                            value={tagColor}
                                            onChange={(e) => setTagColor(e.target.value)}
                                            className="col-span-3 border rounded-md p-2"
                                        >
                                            <option value="" disabled>
                                                Select Tag Color
                                            </option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue</option>
                                            <option value="yellow">Yellow</option>
                                            <option value="red">Red</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSubmit} type="submit">
                                Save Note
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default AddNote;
