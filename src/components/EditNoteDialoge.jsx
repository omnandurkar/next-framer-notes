// components/EditNoteDialog.js

"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { EditNoteAction } from '@/actions/page';
import { Label } from './ui/label';

const EditNoteDialog = ({ open, onClose, noteData, onUpdate }) => {
    const [title, setTitle] = useState(noteData.title);
    const [desc, setDesc] = useState(noteData.desc);
    const [tagTitle, setTagTitle] = useState(noteData.tag.tagTitle);
    const [tagColor, setTagColor] = useState(noteData.tag.tagColor);
    const [isTagOpen, setIsTagOpen] = useState(noteData.tag.isOpen);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("isOpen", isTagOpen.toString());
        formData.append("tagTitle", tagTitle);
        formData.append("tagColor", tagColor);

        try {
            await EditNoteAction(noteData._id, formData);
            onUpdate(); // Notify parent component of the update
            onClose(); // Close the dialog
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <form action={handleEditSubmit}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Note</DialogTitle>
                        <DialogDescription>
                            Update the details of the note below and click save when done.
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
                                checked={isTagOpen}
                                onCheckedChange={(checked) => setIsTagOpen(checked)}
                            />
                            <Label htmlFor="isOpen">Open Tag</Label>
                        </div>
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
                                <Input
                                    id="tagColor"
                                    value={tagColor}
                                    onChange={(e) => setTagColor(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Tag Color"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={onClose} variant="outline">Cancel</Button>
                        <Button onClick={handleEditSubmit} type="submit">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditNoteDialog;
