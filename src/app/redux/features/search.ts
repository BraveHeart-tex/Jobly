import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  companySearchTerm?: string;
  applicationStatus?: string;
  jobType?: string;
  citySearchTerm?: string;
  sortTerm?: 'asc' | 'desc';
}

const initialState: SearchState = {
  searchTerm: '',
  companySearchTerm: '',
  applicationStatus: '',
  jobType: '',
  citySearchTerm: '',
  sortTerm: 'desc',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCitySearchTerm(state, action) {
      state.citySearchTerm = action.payload;
    },
    setSortTerm(state, action) {
      state.sortTerm = action.payload;
    },
    setCompanySearchTerm(state, action) {
      state.companySearchTerm = action.payload;
    },
    setApplicationStatus(state, action) {
      state.applicationStatus = action.payload;
    },
    setJobType(state, action) {
      state.jobType = action.payload;
    },
    clearFilters(state) {
      state.searchTerm = '';
      state.citySearchTerm = '';
      state.sortTerm = 'desc';
      state.companySearchTerm = '';
      state.applicationStatus = '';
      state.jobType = '';
    },
  },
});

export const {
  setSearchTerm,
  setCitySearchTerm,
  setSortTerm,
  clearFilters,
  setCompanySearchTerm,
  setApplicationStatus,
  setJobType,
} = searchSlice.actions;
export default searchSlice.reducer;
