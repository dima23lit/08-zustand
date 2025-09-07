'use client'

import css from "@/components/NoteList/NoteList.module.css"
import { type Note } from "../../types/note"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
    notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {

    const QueryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess() {
            QueryClient.invalidateQueries({queryKey: ['Note']})
        }
    },
)
    
    return (
        <ul className={css.list}>
            {notes.map((note) => 
                <li key={ note.id } className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content }</p>
                    <div className={css.footer}>
                        <span className={css.linkTag}>{note.tag}</span>
                        <Link className={css.link} href={`/notes/${note.id}`}>View details</Link>
                        <button className={css.button} onClick={() => mutate(note.id)}>Delete</button>
                    </div>
                </li>
            )
            }
        </ul>
    )
}