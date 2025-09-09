import { fetchNoteById } from "@/lib/api"
import NoteDetails from "./NoteDetails.client"
import { Note } from "@/types/note";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  return {
    title: `Note about ${note.title}`,
    description: `Note about ${note.content.slice(0, 100)}`,
    openGraph: {
    title: `Notes with ${note.title} category`,
    description: `Note about ${note.content.slice(0, 100)}`,
    url: `https://08-zustand-aiv1.vercel.app/notes/${id}`,
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
}

export const dynamic = "force-dynamic";

export default async function NotesDetailsPage({ params }: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', { tag: id }],
          queryFn: () => fetchNoteById(id),
      });

    return (
        <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetails tag={id} />
             </HydrationBoundary>
        </div>
    )
}