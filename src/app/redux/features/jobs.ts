import { createSlice } from '@reduxjs/toolkit';

interface JobsState {
  isDeleteJobModalOpen: boolean;
  selectedJobId?: number | null;
}

const initialState: JobsState = {
  isDeleteJobModalOpen: false,
  selectedJobId: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setIsDeleteJobModalOpen(state, action) {
      state.isDeleteJobModalOpen = action.payload.isOpen;
      state.selectedJobId = action.payload.jobId;
    },
    setIsDeleteJobModalClose(state) {
      state.isDeleteJobModalOpen = false;
    },
  },
});

export const { setIsDeleteJobModalOpen, setIsDeleteJobModalClose } =
  jobsSlice.actions;
export default jobsSlice.reducer;
