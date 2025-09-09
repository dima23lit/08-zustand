import css from "@/components/NoteForm/NoteForm.module.css"
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type NewNote } from "../../types/note";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
    const router = useRouter();
    const QueryClient = useQueryClient();

    const { draft, clearDraft, updateForm } = useNoteStore();
    
    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess() {
            QueryClient.invalidateQueries({ queryKey: ['Note'] });
            router.back();
            clearDraft();
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault(); 

        const formData = new FormData(e.currentTarget);

        const form: NewNote = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            tag: formData.get("tag") as NewNote["tag"],
            };

        mutate(form)
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        updateForm(
            e.target.name === "title" ? e.target.value : draft.title,
            e.target.name === "content" ? e.target.value : draft.content,
            e.target.name === "tag" ? e.target.value as NewNote["tag"] : draft.tag
        );
    };


    return (
        <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} onChange={handleInputChange} value={draft.title}/>
            <span className={css.error} />
        </div>
        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
                onChange={handleInputChange}
                value={draft.content}
            />
            <span className={css.error} />
        </div>
        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select} onChange={handleInputChange} value={draft.tag}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
            </select>
            <span className={css.error} />
        </div>
        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={() => router.push("/notes/filter/All")}>
                Cancel
            </button>
            <button
                type="submit"
                className={css.submitButton}
                disabled={false}
            >
                Create note
            </button>
        </div>
    </form>
    )
}