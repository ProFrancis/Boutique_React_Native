import { configureStore } from "@reduxjs/toolkit";

import ArticleSlice from "./articles.slice";
import AdminUserSlice from "./adminUser.slice"


export default configureStore({
  reducer: {
    articles: ArticleSlice,
    adminUser: AdminUserSlice
  }
})