import { fetchNoteById } from "@/lib/api"
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client"

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
        queryKey: ['note', { id: id }],
          queryFn: () => fetchNoteById(id),
      });

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotePreview />
             </HydrationBoundary>
        </div>
    )
}