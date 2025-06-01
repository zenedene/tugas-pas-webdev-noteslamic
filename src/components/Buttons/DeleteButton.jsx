import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteButton = ({ onDelete, itemId, confirmText = "Hapus" }) => {
  const [confirming, setConfirming] = useState(false);
  
  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      // Set timeout to reset the state after 3 seconds if no action
      setTimeout(() => setConfirming(false), 3000);
    } else {
      // Execute the delete function
      if (onDelete) onDelete(itemId);
      setConfirming(false);
    }
  };

  return (
        <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-3 py-2 min-h-9
        border rounded-md font-medium text-sm
        transition-all duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${
          confirming
            ? 'border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600 shadow-lg shadow-red-500/25 animate-pulse'
            : 'border-gray-300 bg-white text-gray-600 hover:border-red-400 hover:text-red-500 hover:bg-red-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-500/15'
        }
      `}
      aria-label="Delete"
    >
      <span className={`
        flex items-center justify-center transition-transform duration-200
        ${confirming ? 'rotate-3' : 'group-hover:scale-110'}
      `}>
        <Trash2 size={14} />
      </span>
      {confirming && (
        <span className="animate-in slide-in-from-left-2 fade-in duration-300 font-semibold tracking-wide">
          {confirmText}
        </span>
      )}
    </button>

  );
};
