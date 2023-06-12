import { createSlice } from '@reduxjs/toolkit';

interface JobsState {
  isEditJobModalOpen: boolean;
  isDeleteJobModalOpen: boolean;
  selectedJobId?: number;
}

const initialState: JobsState = {
  isEditJobModalOpen: false,
  isDeleteJobModalOpen: false,
  selectedJobId: 0,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    toggleEditJobModal(state, action) {
      state.isEditJobModalOpen = !state.isEditJobModalOpen;
      state.selectedJobId = action.payload;
    },
    toggleDeleteJobModal(state, action) {
      state.isDeleteJobModalOpen = !state.isDeleteJobModalOpen;
      state.selectedJobId = action.payload;
    },
  },
});

export const { toggleEditJobModal, toggleDeleteJobModal } = jobsSlice.actions;
export default jobsSlice.reducer;
