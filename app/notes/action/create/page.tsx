import CreateNote from "@/components/CreateNote/CreateNote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "You can create your note",
  openGraph: {
    title: "Create Note",
    description: "You can create your note",
    url: "https://08-zustand-aiv1.vercel.app/notes/action/create",
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