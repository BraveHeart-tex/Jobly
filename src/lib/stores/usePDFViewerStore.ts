import { create } from "zustand";

type PDFViewerStore = {
  numberOfPages: number;
  setNumberOfPages: (numberOfPages: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  previousRenderValue: string | null;
  setPreviousRenderValue: (previousRenderValue: string | null) => void;
};

export const usePDFViewerStore = create<PDFViewerStore>((set) => ({
  currentPage: 1,
  numberOfPages: 0,
  previousRenderValue: null,
  setCurrentPage: (currentPage) => {
    set({ currentPage });
  },
  setNumberOfPages: (numberOfPages) => {
    set({ numberOfPages });
  },
  setPreviousRenderValue: (previousRenderValue) => {
    set({ previousRenderValue });
  },
}));
