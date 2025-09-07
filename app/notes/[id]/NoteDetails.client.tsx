"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from "@/app/notes/[id]/NoteDetails.module.css"

type Props = {
  tag: string;
};

export default function NoteDetails({ tag }: Props) {

  const { data, isLoading, isError } = useQuery({
      queryKey: ['note', { tag: tag }],
      queryFn: () => fetchNoteById(tag as string),
    refetchOnMount: false,
  });

    return (
    <div>
            {isLoading && <p>Loading, please wait...</p>}
            {isError && <p>Something went wrong.</p>}
            {data && <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data?.title}</h2>
                    </div>
                    <p className={css.content}>{data?.content}</p>
                    <p className={css.date}>{data?.createdAt}</p>
                </div>
            </div>}
        </div>
  );
}