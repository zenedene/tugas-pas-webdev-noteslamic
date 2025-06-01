"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="group flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white group-hover:text-emerald-100 transition-colors duration-300">
            Noteslamic
          </h1>
          <p className="text-emerald-100 text-sm font-medium -mt-1">
            Islamic Notes & Knowledge
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
