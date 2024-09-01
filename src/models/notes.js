import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tag: {
        isOpen: { type: Boolean, default: false },
        tagTitle: String,
        tagColor: String,
    },
});

const Notes = mongoose.models.Notes || mongoose.model('Notes', notesSchema);

export default Notes;
