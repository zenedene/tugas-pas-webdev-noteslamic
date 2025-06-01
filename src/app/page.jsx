import Image from "next/image";
import Header from "@/components/Header";
import NotesGrid from "@/components/NotesGrid";
import notesData from "@/libs/data";

export default function Home() {
  return (
    <>
      <NotesGrid/>
    </>
  );
}
