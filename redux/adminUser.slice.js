import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  loading: false,
  error: false
}

export const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    FETCH_START: (draft) => {
      draft.loading = true
    },
    FETCH_ALL_USERS: (draft, actions) => {
      draft.loading = false
      draft.data = actions.payload
    },
    FETCH_USER: (draft, actions) => {
      draft.loading = false
      draft.data = actions.payload
    },
    UPDATE_USER: (draft, actions) => {
      const { field, value } = actions.payload
      draft.data[field] = value
    }
  }
});

export const { FETCH_START, FETCH_ALL_USERS, FETCH_USER, UPDATE_USER } = adminUserSlice.actions;
export default adminUserSlice.reducer;
