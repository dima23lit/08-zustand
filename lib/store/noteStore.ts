import { create } from "zustand"
import { persist } from "zustand/middleware"

type NoteFormData = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

type NoteStore = {
  noteForm: NoteFormData;
  updateForm: (title: string, content: string, tag: NoteFormData["tag"]) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      noteForm: {
        title: "",
        content: "",
        tag: "Todo",
      },
      updateForm: (title, content, tag) =>
        set({ noteForm: { title, content, tag } }),
      clearDraft: () =>
        set({ noteForm: { title: "", content: "", tag: "Todo" } }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ noteForm: state.noteForm }),
    }
  )
);