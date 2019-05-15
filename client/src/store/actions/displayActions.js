import {DisplayAction} from "./actionTypes";

export const setDisplayData = data => {
    return {
        type: DisplayAction.SET_DISPLAY_DATA,
        payload: data
    };
};