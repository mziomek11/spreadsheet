import {DisplayAction} from "../actions/actionTypes";

const initState = {
    rows: 0,
    cols: 0,
    startRow: 0,
    endRow: 0,
    startCol: 0,
    endCol: 0,
    lastScrollX: 0,
    spreadsheetTop: 0,
    startSpreadsheetTop: 0,
    spreadsheetHeight: 0,
    abandonScrollEvent: true,
};

const displayReducer = (state=initState, action) => {
    switch(action.type){
        case DisplayAction.SET_DISPLAY_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };
};

export default displayReducer;