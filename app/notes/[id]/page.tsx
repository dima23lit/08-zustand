import { fetchNoteById } from "@/lib/api"
import NoteDetails from "./NoteDetails.client"

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

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