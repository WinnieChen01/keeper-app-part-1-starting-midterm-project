import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notesData from "../notes";

function App() {
  const [notes, setNotes] = useState(notesData); //initial state
  const [newNote, setNewNote] = useState({
    title: "",
    content: ""
  });

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote() {
    if (newNote.title.trim() !== "" || newNote.content.trim() !== "") {
      addNote(newNote);
      setNewNote({
        title: "",
        content: ""
      });
    }
  }

  return (
    <div>
      <Header />
      <div>
        <form>
          <input
            name="title"
            value={newNote.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <textarea
            name="content"
            value={newNote.content}
            placeholder="Take a note..."
            rows="3"
            onChange={handleChange}
          />
          <button type="button" onClick={submitNote}>
            Add
          </button>
        </form>
      </div>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={() => deleteNote(index)}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
