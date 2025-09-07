import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");

        if(res.status==429){
          setIsRateLimited(true);
          return;
        }

        if(!res.ok){
          toast.error("Failed to load notes");
          return;
        }

        const data = await res.json();
        console.log(data);
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes", error);
        
      }finally{
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUi />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && <div className="text-center text-primary py-10">loading notes...</div>  }

        {notes.length === 0 && !isLoading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited  && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>

        )}
      </div>
      
    </div>
  );
};

export default HomePage;
