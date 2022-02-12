import {FETCH_USER, REGISTER_USER} from "../actions/types";
import User from "../models/user";

export default function (state = null, action: { type: string; payload:User | boolean; }) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case REGISTER_USER:
            return action.payload || false
        default:
            return state;
    }
}
