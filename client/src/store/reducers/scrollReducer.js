import {ScrollAcions} from "../actions/actionTypes";

const initState = {
    lastScrollX: 0,
    spreadsheetTop: 0,
    startSpreadsheetTop: 0,
    spreadsheetHeight: 0,
    abandonScrollEvent: true
};

const scrollReducer = (state=initState, action) => {
    switch(action.type){
        case ScrollAcions.SET_SCROLL_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };
};

export default scrollReducer;