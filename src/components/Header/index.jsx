"use client";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg border-b border-emerald-400">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <Navbar />
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
