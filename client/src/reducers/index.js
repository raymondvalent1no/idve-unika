import { combineReducers } from "redux";

import posts from "./posts";
import auth from "./auth";
export const reducers = combineReducers({ posts, auth });
/* sbg key names -> define top level state object keys, jika tidak ada value, 
artinya value nya SAMA dengan keys nya, yaitu "posts" */
