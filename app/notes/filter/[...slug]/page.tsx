import { fetchNotes } from "@/lib/api"
import NotesPage from '@/app/notes/filter/[...slug]/Notes.client'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};


export default async function Notes({ params }: Props) {

  const { slug } = await params;
  // const [params1, params2, params3] = slug; 
    const tag = slug?.[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['Note', tag || 'All'],
        queryFn: () => fetchNotes(1, 12, "", tag || 'All'),
    })

    return (
        <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesPage tag={tag} />
        </HydrationBoundary>
        </div>
    )
}

// notes/filter/work/service

// const params = {
// slug: [work, service]
// }

// [work, service]
// [afsasfasf, afsasfafs]