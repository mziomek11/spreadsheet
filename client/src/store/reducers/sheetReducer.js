import {SheetActions, AuthActions} from "../actions/actionTypes";

const initState = {
    sheets: [],
    actualSheetInfo: null,
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
            return {...state, sheets: action.payload};
        case SheetActions.CREATE_SHEET:
            return {...state, sheets: [...state.sheets, action.payload], actualSheetInfo: null};
        case SheetActions.SET_IS_IN_SHEET:
            return {...state, isInSheet: true};
        case AuthActions.LOGOUT_SUCCESS:
            return {...initState};
        default:
            return {...state};
    }
}

export default sheetReducer;