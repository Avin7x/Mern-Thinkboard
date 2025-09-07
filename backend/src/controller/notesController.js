import Note from "../models/notes.model.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found!"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById", error);
        res.status(500).json({message: "Internal server error"});
    }
}
export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json({message: "Note created successfully"});
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body;

        if(!title && !content){
            return res.status(400).json({message:"Send at least one field to update: title or content"})
        }

        //create and initialize an object with the updated fields
        const updateFields = {};
        if(title) updateFields.title = title;
        if(content) updateFields.content = content;
        
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {$set: updateFields},
            {new:true} //returns updated document
        );

        if(!note){
            return res.status(404).json({message: "Note not found"});
            
        }
        
        res.status(200).json({
            message: "Note updated successfully!",
            updatedNote: note,
        });
        
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
            
        }

        res.status(200).json({message: "Note deleted successfully!"});
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}