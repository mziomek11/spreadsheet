import {DisplayActions} from "./actionTypes";

export const setDisplayData = data => {
    return {
        type: DisplayActions.SET_DISPLAY_DATA,
        payload: data
    };
};