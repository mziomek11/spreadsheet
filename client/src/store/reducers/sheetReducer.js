import {SheetActions, AuthActions} from "../actions/actionTypes";

const initState = {
    sheets: [],
    actualSheetInfo: null,
    actualSheet: [],
    isInSheet: false
}

const sheetReducer = (state=initState, action) => {
    switch(action.type){
        case SheetActions.GET_SHEETS:
            return {...state, sheets: action.payload, actualSheetInfo: null};
        case SheetActions.GET_SHEET_DETAIL:
            return {...state, actualSheetInfo: action.payload};
        case SheetActions.DELETE_SHEET:
            return {...state, sheets: state.sheets.filter(sheet => sheet._id !== action.payload)};
        case SheetActions.UPDATE_SHEET_INFO:
            const newSheets = [...state.sheets];
            const updateIndex = newSheets.findIndex(x => x._id === action.payload._id);
            newSheets[updateIndex] = {...newSheets[updateIndex], ...action.payload.data};
            return {...state, sheets: newSheets};
        case SheetActions.CREATE_SHEET:
            return {...state, sheets: [...state.sheets, action.payload], actualSheetInfo: null};
        case SheetActions.SET_IS_IN_SHEET:
            return {...state, isInSheet: true};
        case SheetActions.RESIZE_SHEET:
            return {...state, actualSheet: action.payload};
        case SheetActions.UPDATE_SHEET_CELL:
            const updatedActualSheet = [...state.actualSheet];
            updatedActualSheet[action.payload.row] = updatedActualSheet[action.payload.row].map((x, index) => index === action.payload.col ? action.payload.text : x);
            return {...state, actualSheet: updatedActualSheet};
        case AuthActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}

export default sheetReducer;