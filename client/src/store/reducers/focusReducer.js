import {FocusActions} from "../actions/actionTypes";

const initState = {
    focusedTableCells: [],
    rectFocusData: {
        adding: true,
        start: {
            row: -1,
            col: -1,
        },
        end: {
            row: -1,
            col: -1
        }
    }
};

const focusReducer = (state=initState, action) => {
    switch(action.type){
        case FocusActions.SET_FOCUSED_TABLE_CELLS: 
            return {
                ...state,
                focusedTableCells: action.payload
            };
        case FocusActions.SET_FOCUS_RECT_DATA:
            return {
                ...state,
                rectFocusData: {
                    ...state.rectFocusData,
                    ...action.payload
                }
            };
        default:
            return state;
    };
};

export default focusReducer;