import { create } from 'zustand';
import type { FullResponseType } from './schema';

type AppStatus = 'idle' | 'uploading' | 'processing-ocr' | 'processing-graph' | 'success' | 'error';

type AppState = {
  status: AppStatus;
  uploadedFileId: string | null;
  ocrProgress: number;
  graphData: FullResponseType | null;
  errorMessage: string | null;
  selectedStepId: string | null;
  selectedNodeId: string | null;

  // Actions
  setUploadedFile: (id: string) => void;
  setStatus: (status: AppStatus) => void;
  setOcrProgress: (progress: number) => void;
  setGraphData: (data: FullResponseType) => void;
  setError: (message: string) => void;
  setSelectedStepId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  reset: () => void;
};

const initialState: Omit<AppState, 'setUploadedFile' | 'setStatus' | 'setOcrProgress' | 'setGraphData' | 'setError' | 'setSelectedStepId' | 'setSelectedNodeId' | 'reset'> = {
    status: 'idle' as AppStatus,
    uploadedFileId: null,
    ocrProgress: 0,
    graphData: null,
    errorMessage: null,
    selectedStepId: null,
    selectedNodeId: null,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setUploadedFile: (id) => set({ uploadedFileId: id, status: 'processing-ocr' }),
  setStatus: (status) => set({ status }),
  setOcrProgress: (progress) => set({ ocrProgress: progress }),
  setGraphData: (data) => {
    const firstStepId = data?.roadmap?.steps[0]?.id || null;
    set({ graphData: data, status: 'success', selectedStepId: firstStepId });
  },
  setError: (message) => set({ status: 'error', errorMessage: message, uploadedFileId: null }),
  setSelectedStepId: (id) => set({ selectedStepId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  reset: () => set(initialState),
}));
