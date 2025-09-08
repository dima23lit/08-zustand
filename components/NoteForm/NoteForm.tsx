import css from "@/components/NoteForm/NoteForm.module.css"
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type NewNote } from "../../types/note";
import { useRouter } from "next/navigation";

export default function NoteForm() {
    const router = useRouter();
    const QueryClient = useQueryClient();
    
    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess() {
            QueryClient.invalidateQueries({ queryKey: ['Note'] });
            router.push(`/notes/filter/All`);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const form: NewNote = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            tag: formData.get("tag") as NewNote["tag"],
            };

        mutate(form)
  };


    return (
        <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} />
            <span className={css.error} />
        </div>
        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
            />
            <span className={css.error} />
        </div>
        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select}>
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