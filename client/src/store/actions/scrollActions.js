import {ScrollAcions} from "./actionTypes";

export const setScrollData = data => {
    return {
        type: ScrollAcions.SET_SCROLL_DATA,
        payload: data
    };
};