"use client";
import { useState } from "react";
import { X, Plus, BookOpen, Calendar, Tag, FileText } from "lucide-react";

const kategoriList = [
  "Akidah", "Fiqh", "Doa", "Akhlak", "Sejarah", "Quran", "Hadits"
];

const AddNoteButton = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    judul: "",
    notes: "",
    tanggal: "",
    kategori: ""
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
 
    if (error) setError("");
  };

  const handleSubmit = async () => {
    const { judul, notes, tanggal, kategori } = form;
    if (!judul || !notes || !tanggal || !kategori) {
      setError("Semua field wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onAdd({
        ...form,
        tanggal: new Date(tanggal).toISOString()
      });

     
      setForm({ judul: "", notes: "", tanggal: "", kategori: "" });
      setShowForm(false);
      setError("");
      setIsSubmitting(false);
    }, 500);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm({ judul: "", notes: "", tanggal: "", kategori: "" });
    setError("");
  };

  return (
    <div>
      <button 
        onClick={() => setShowForm(true)} 
        className="
          inline-flex items-center gap-2 px-6 py-3 
          bg-gradient-to-r from-emerald-600 to-emerald-700 
          text-white font-medium rounded-lg shadow-lg
          hover:from-emerald-700 hover:to-emerald-800 
          hover:shadow-xl hover:-translate-y-0.5
          active:translate-y-0 active:shadow-lg
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
        "
      >
        <Plus size={18} />
        Tambah Catatan
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="
            bg-white rounded-2xl shadow-2xl w-full max-w-lg 
            transform transition-all duration-300 ease-out
            animate-in zoom-in-95 fade-in duration-300
          ">
       
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Tambah Catatan Baru</h2>
              </div>
              <button 
                onClick={closeForm}
                className="
                  w-8 h-8 flex items-center justify-center rounded-full 
                  text-gray-400 hover:text-gray-600 hover:bg-gray-100
                  transition-all duration-200
                "
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <div className="
                  bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg
                  animate-in slide-in-from-top-2 fade-in duration-300
                ">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText size={16} className="text-gray-500" />
                  Judul Catatan
                </label>
                <input 
                  name="judul"
                  type="text" 
                  placeholder="Masukkan judul catatan..." 
                  value={form.judul}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 border border-gray-200 rounded-lg
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    transition-all duration-200 outline-none
                    placeholder:text-gray-400
                    hover:border-gray-300
                  "
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <BookOpen size={16} className="text-gray-500" />
                  Isi Catatan
                </label>
                <textarea 
                  name="notes"
                  placeholder="Tulis catatan Anda di sini..." 
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 border border-gray-200 rounded-lg resize-none
                    focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                    transition-all duration-200 outline-none
                    placeholder:text-gray-400
                    hover:border-gray-300
                  "
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar size={16} className="text-gray-500" />
                    Tanggal
                  </label>
                  <input 
                    name="tanggal"
                    type="date" 
                    value={form.tanggal}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 border border-gray-200 rounded-lg
                      focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                      transition-all duration-200 outline-none
                      hover:border-gray-300
                    "
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Tag size={16} className="text-gray-500" />
                    Kategori
                  </label>
                  <select 
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 border border-gray-200 rounded-lg
                      focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                      transition-all duration-200 outline-none
                      hover:border-gray-300 bg-white
                    "
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    {kategoriList.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-100">
              <button 
                onClick={closeForm}
                disabled={isSubmitting}
                className="
                  px-6 py-2.5 text-gray-600 font-medium rounded-lg
                  hover:bg-gray-50 hover:text-gray-800
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                Batal
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="
                  inline-flex items-center gap-2 px-6 py-2.5
                  bg-gradient-to-r from-emerald-600 to-emerald-700 
                  text-white font-medium rounded-lg shadow-lg
                  hover:from-emerald-700 hover:to-emerald-800 
                  hover:shadow-xl
                  active:scale-95
                  transition-all duration-200 ease-out
                  disabled:opacity-70 disabled:cursor-not-allowed
                  disabled:hover:from-emerald-600 disabled:hover:to-emerald-700
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Simpan Catatan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNoteButton;