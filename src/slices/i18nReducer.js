import { createSlice } from "@reduxjs/toolkit";

// Get language from localStorage or default to 'en'
const defaultLang = localStorage.getItem("language");
export const initialState = {
  language: ['en', 'mr', 'hi', 'ta'].includes(defaultLang) ? defaultLang : 'en',
  loading: false,
  error: false
};

const i18LangSlice = createSlice({
  name: 'i18Lang',
  initialState,
  reducers: {
    seti18Lang: (state, { payload }) => {
      state.language = payload;
      localStorage.setItem("language", payload); // Persist in localStorage
      state.loading = false;
      state.error = false;
    },
    loading: (state) => {
      state.loading = true;
      state.error = false;
    },
    loadingFailure: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});

export const {
  seti18Lang,
  loading,
  loadingFailure
} = i18LangSlice.actions;

export const i18LangSelector = state => state.i18Lang;

export default i18LangSlice.reducer;

// Thunk action to update language
export function fetchLanguage(lang) {
  return async (dispatch) => {
    dispatch(loading());
    dispatch(seti18Lang(lang));
  };
}
