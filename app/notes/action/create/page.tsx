import CreateNote from "@/components/CreateNote/CreateNote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create Note",
  openGraph: {
    title: "NoteHab",
    description: "Welcome to NoteHab",
    url: "https://08-zustand-aiv1.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub Logo",
      },
    ],
  },
};


export default function CreateNotePage() {
  return (
    <div>
      <CreateNote />
    </div>
  );
}