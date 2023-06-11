import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  citySearchTerm?: string;
  sortTerm?: 'asc' | 'desc';
}

const initialState: SearchState = {
  searchTerm: '',
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
    clearFilters(state) {
      state.searchTerm = '';
      state.citySearchTerm = '';
      state.sortTerm = 'desc';
    },
  },
});

export const { setSearchTerm, setCitySearchTerm, setSortTerm, clearFilters } =
  searchSlice.actions;
export default searchSlice.reducer;
