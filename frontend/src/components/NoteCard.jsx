import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils.js"
import toast from "react-hot-toast"


const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e, id) =>{
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete this note?")) return
        try {
            const res = await fetch(`http://localhost:5001/api/notes/${id}`, {
                method: "DELETE",
            });

            if(!res.ok){
                toast.error("Failed to delete note");
                return;
            }
            toast.success("Note deleted successfully");
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            
        } catch (error) {
            console.log("Error deleting note", error);
            toast.error("Network error: Could not connect to server")
            
        }
    }
  return (
    <Link to={`note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]" 
    >
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>

            <div className="card-actions  justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>

                <div className="flex items-center gap-1">
                    <PenSquareIcon  className="size-4"/>
                    <div className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon onClick={(e) => handleDelete(e, note._id)} className="size-4"/>
                    </div>
                </div>
            </div>

        </div>
    </Link>
  )
}

export default NoteCard