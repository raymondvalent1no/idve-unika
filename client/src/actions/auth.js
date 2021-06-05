import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const signin = (formData, history) => async (dispatch) => {
  try {
    //log in kan user nya (formData)
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, router) => async (dispatch) => {
  try {
    //sign up kan user nya (formData)
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
