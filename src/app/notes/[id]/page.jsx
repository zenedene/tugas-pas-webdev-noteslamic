"use client";

import { notesData } from "@/libs/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Clock, BookOpen, Hash } from "lucide-react";

const Page = () => {
  const params = useParams();
  const noteId = params.id;

  const note = notesData.find((note) => note.id.toString() === noteId);

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Catatan Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Maaf, catatan yang Anda cari tidak dapat ditemukan atau mungkin telah dihapus.</p>
          <Link 
            href="/" 
            className="
              inline-flex items-center gap-2 px-6 py-3
              bg-gradient-to-r from-blue-600 to-blue-700 
              text-white font-medium rounded-xl shadow-lg
              hover:from-blue-700 hover:to-blue-800 
              hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-200 ease-out
            "
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Jakarta" };
    return new Date(dateStr).toLocaleDateString("id-ID", options);
  };

  const getTimeAgo = (dateStr) => {
    const now = new Date();
    const noteDate = new Date(dateStr);
    const diffTime = Math.abs(now - noteDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 hari yang lalu";
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} minggu yang lalu`;
    return `${Math.ceil(diffDays / 30)} bulan yang lalu`;
  };

  const getCategoryColor = (kategori) => {
    const colors = {
      "Akidah": "from-purple-500 to-purple-600 bg-purple-50 text-purple-700 border-purple-200",
      "Fiqh": "from-blue-500 to-blue-600 bg-blue-50 text-blue-700 border-blue-200",
      "Doa": "from-green-500 to-green-600 bg-green-50 text-green-700 border-green-200",
      "Akhlak": "from-yellow-500 to-yellow-600 bg-yellow-50 text-yellow-700 border-yellow-200",
      "Sejarah": "from-red-500 to-red-600 bg-red-50 text-red-700 border-red-200",
      "Quran": "from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-700 border-emerald-200",
      "Hadits": "from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-700 border-indigo-200"
    };
    return colors[kategori] || "from-gray-500 to-gray-600 bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header with breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="
              inline-flex items-center gap-2 text-gray-600 hover:text-gray-900
              font-medium transition-colors duration-200 group
            "
          >
            <ArrowLeft 
              size={18} 
              className="group-hover:-translate-x-1 transition-transform duration-200" 
            />
            Kembali ke Daftar Catatan
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-6 pt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          {/* Header section with gradient */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2 leading-tight">{note.judul}</h1>
                  <p className="text-gray-300 text-lg">Detail Catatan Pembelajaran</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>

          {/* Meta information */}
          <div className="p-8 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ID Card */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Hash className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">ID Catatan</p>
                    <p className="text-lg font-bold text-gray-800">#{note.id}</p>
                  </div>
                </div>
              </div>

              {/* Category Card */}
              <div className={`rounded-xl p-4 border ${getCategoryColor(note.kategori).split(' ').slice(2).join(' ')}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(note.kategori).split(' ').slice(0, 2).join(' ')} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-75">Kategori</p>
                    <p className="text-lg font-bold">{note.kategori}</p>
                  </div>
                </div>
              </div>

              {/* Date Card */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Tanggal</p>
                    <p className="text-lg font-bold text-blue-800">{formatDate(note.tanggal)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time ago indicator */}
            <div className="mt-4 flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">{getTimeAgo(note.tanggal)}</span>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-600" />
                Isi Catatan
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="
                bg-gradient-to-br from-gray-50 to-white 
                rounded-xl p-6 border border-gray-200
                text-gray-700 leading-relaxed 
                whitespace-pre-line text-base
                shadow-sm
              ">
                {note.notes}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Catatan ini dibuat pada {formatDate(note.tanggal)}
              </div>
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="
                    inline-flex items-center gap-2 px-4 py-2
                    text-gray-600 hover:text-gray-800 font-medium
                    hover:bg-white rounded-lg transition-all duration-200
                  "
                >
                  <ArrowLeft size={16} />
                  Kembali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;