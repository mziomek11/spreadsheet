import {SheetActions, AuthActions} from "../actions/actionTypes";

const initState = {
    sheets: [],
    actualSheet: null
}

const sheetReducer = (state=initState, action) => {
    switch(action.type){
        case SheetActions.GET_SHEETS:
            return {...state, sheets: action.payload, actualSheet: null};
        case SheetActions.GET_SHEET_DETAIL:
            return {...state, actualSheet: action.payload};
        case SheetActions.DELETE_SHEET:
            return {...state, sheets: state.sheets.filter(sheet => sheet._id !== action.payload)};
        case SheetActions.UPDATE_SHEET:
            const newSheets = [...state.sheets];
            const updateIndex = newSheets.findIndex(x => x._id === action.payload._id);
            newSheets[updateIndex] = {...newSheets[updateIndex], ...action.payload.data};
            return {...state, sheets: newSheets};
        case SheetActions.CREATE_SHEET:
            return {...state, sheets: [...state.sheets, action.payload], actualSheet: null};
        case AuthActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}

export default sheetReducer;