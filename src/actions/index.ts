import axios, {AxiosRequestConfig} from "axios";
import {FETCH_USER, REGISTER_USER} from "./types";
import User from "../models/user"


 export const fetchUser = () => async (dispatch: (arg0: { type: string; payload: User; }) => void) => {
    const res = await axios.get("/api/current_user")

    dispatch({type: FETCH_USER, payload: res.data});
};

export const updateProfile = (data: Object) => async (dispatch: (arg0: { type: string; payload: User; }) => void) => {
    const res = await axios.post("api/update_profile", data)

    dispatch({type: FETCH_USER, payload: res.data});
}

export const handleToken = (token: Object) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    const res = await axios.post('/api/stripe', token);

    dispatch({type: FETCH_USER, payload: res.data})
}

export const registerUser = (data: Object) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    try {
        const res = await axios({
            method: "POST",
            url: '/api/register',
            headers: {"Content-Type": "application/json"},
            data: data,
        })
        dispatch({type: REGISTER_USER, payload: res.data.user})
    } catch (err) {
        throw new Error(err);
    }
}

export const loginUser = (data: Object) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    try {
        const res = await axios({
            method: "POST",
            url: '/api/login',
            headers: {"Content-Type": "application/json"},
            data: data,
        })
        dispatch({type: REGISTER_USER, payload: res.data.user})
    } catch (err) {
        throw new Error(err.response.data.error);
    }
}
