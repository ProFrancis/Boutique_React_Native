import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  loading: false,
  error: false
}

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchStart: (draft) => {
      draft.loading = true
    },
    fetchSuccess: (draft, actions) => {
      draft.loading = false
      draft.data = actions.payload
    },
    fetchArticleDetail: (draft, actions) => {
      draft.loading = false
      draft.data = actions.payload
    },
    fetchArticleUpdate: (draft, actions) => {
      const { field, value } = actions.payload
      draft.data[field] = value
    }
  }
});

export const { fetchStart, fetchSuccess, fetchArticleDetail, fetchArticleUpdate } = articleSlice.actions;
export default articleSlice.reducer;
