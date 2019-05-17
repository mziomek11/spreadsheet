import {DisplayActions} from "../actions/actionTypes";

const initState = {
    rows: 0,
    cols: 0,
    startRow: 0,
    endRow: 0,
    startCol: 0,
    endCol: 0
};

const displayReducer = (state=initState, action) => {
    switch(action.type){
        case DisplayActions.SET_DISPLAY_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };
};

export default displayReducer;