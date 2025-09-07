import css from "@/components/NoteForm/NoteForm.module.css"
import { Formik, Form, Field, ErrorMessage, type FormikHelpers} from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type NewNote } from "../../types/note";

const initialValues: NewNote = {
    title: "",
    content: "",
    tag: "Todo",
}

interface NoteFormProps {
    onClose: () => void,
    onSuccess: () => void
}

const NoteSchema = Yup.object().shape({
    content: Yup.string().max(500, "Too long"),
    title: Yup.string().min(3, "Too short").max(50, "Too long").required("Required"),
    tag: Yup.string().oneOf(["Todo", "Work",  "Personal", "Meeting", "Shopping"]).required("Required")
});

export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
    const QueryClient = useQueryClient();
    
    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess() {
            QueryClient.invalidateQueries({ queryKey: ['Note'] });
            onSuccess()
        }
    })

    const handleSubmit = (values: NewNote, formikHelpers: FormikHelpers<NewNote>) => {
        mutate({
            title: values.title,
            content: values.content,
            tag: values.tag
        })
        formikHelpers.resetForm()
  };


    return (<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NoteSchema}>
        <Form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <Field id="title" type="text" name="title" className={css.input} />
                <ErrorMessage name="title" component="span" className={css.error} />
            </div>
            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <Field
                    as="textarea"
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
                <ErrorMessage name="content" component="span" className={css.error} />
            </div>
            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <Field as="select" id="tag" name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="tag" component="span" className={css.error} />
            </div>
            <div className={css.actions}><button type="button" className={css.cancelButton} onClick={onClose}>
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
            </Form>
    </Formik>
    )
}