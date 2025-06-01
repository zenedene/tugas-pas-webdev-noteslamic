"use client";
import NoteBox from "../BoxNotes";
import { notesData as initialNotes } from "../../libs/data";
import { useState } from "react";
import AddNoteButton from "../Buttons/AddNoteButton";

const NotesGrid = () => {
  const [notes, setNotes] = useState(initialNotes);

  const handleDelete = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const handleAddNote = (newNote) => {
  const uniqueId = Date.now(); // atau pakai nanoid/uuid
  const noteWithId = { ...newNote, id: uniqueId };
  setNotes((prev) => [...prev, noteWithId]);
};

  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        {/* Tombol Tambah Catatan */}
        <div className="mb-6">
          <AddNoteButton onAdd={handleAddNote} />
        </div>

        {/* Notes Grid */}
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteBox
                key={note.id}
                id={note.id}
                note={note}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum Ada Catatan
            </h3>
            <p className="text-gray-500">
              Mulai tambahkan catatan Islamic pertama Anda!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotesGrid;
