import { create } from "zustand"
import { persist } from "zustand/middleware"

type NoteFormData = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

type NoteStore = {
  draft: NoteFormData;
  updateForm: (title: string, content: string, tag: NoteFormData["tag"]) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: {
        title: "",
        content: "",
        tag: "Todo",
      },
      updateForm: (title, content, tag) =>
        set({ draft: { title, content, tag } }),
      clearDraft: () =>
        set({ draft: { title: "", content: "", tag: "Todo" } }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);