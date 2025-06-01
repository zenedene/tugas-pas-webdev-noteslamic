"use client";
import Link from "next/link";
import { useState } from "react";
import { DeleteButton } from "../Buttons/DeleteButton";

const NoteBox = ({ note, onDelete, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Akidah: "bg-blue-100 text-blue-800 border-blue-200",
      Fiqh: "bg-green-100 text-green-800 border-green-200",
      Doa: "bg-purple-100 text-purple-800 border-purple-200",
      Akhlak: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Sejarah: "bg-red-100 text-red-800 border-red-200",
      Quran: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Hadits: "bg-orange-100 text-orange-800 border-orange-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[category] || colors.default;
  };
  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

 return (
    <div 
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/notes/${note.id}`}>
        <div className="cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
                {note.judul}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(note.kategori)}`}>
                  {note.kategori}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  {/* Icon kalender */}
                  {formatDate(note.tanggal)}
                </span>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="flex-1">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
              {truncateText(note.notes)}
            </p>
          </div>
        </div>
      </Link>

      <DeleteButton itemId={id} onDelete={onDelete} confirmText="Hapus" />
    </div>
  );};

export default NoteBox;
