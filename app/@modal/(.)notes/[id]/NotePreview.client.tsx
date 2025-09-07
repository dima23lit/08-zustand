"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from '@/app/@modal/(.)notes/[id]/NotePreview.module.css'
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

type Props = {
  id?: string;
};

export default function NotePreview({}:Props) {
  const router = useRouter();
  const params = useParams();
  console.log(params.id);
  const idParam = params?.id;

  const closeModal = () => {
    router.back();
  };

  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (!id) {
    return <p>Note ID is missing.</p>;
  }

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  if (!data) return null;

    return (
        <Modal onClose={closeModal}><div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
              <span className={css.tag}>{data.tag}</span> 
            </div>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.createdAt}</p>
          <button onClick={closeModal} className={css.backBtn}>
          Close
        </button>
          </div>
        </div>
        </Modal>
  );
}