import { fetchNotes } from "@/lib/api"
import NotesPage from '@/app/notes/filter/[...slug]/Notes.client'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = slug?.[0];

  return {
    title: `Notes with ${note} category`,
    description: `Notes with ${note} category`,
    openGraph: {
    title: `Notes with ${note} category`,
    description: `Notes with ${note} category`,
    url: `https://08-zustand-aiv1.vercel.app/notes/filter/${note}`,
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