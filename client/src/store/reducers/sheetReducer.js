import {SheetActions, AuthActions} from "../actions/actionTypes";

const initState = {
    sheets: [],
    actualSheetInfo: null,
    actualSheet: {
        borderTop: [],
        borderLeft: [],
        table: []
    },
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
        case SheetActions.UPDATE_TABLE_CELL:
            const updatedTable = [...state.actualSheet.table];
            updatedTable[action.payload.row] = updatedTable[action.payload.row].map((x, index) => index === action.payload.col ? action.payload.text : x);
            return {...state, actualSheet: {
                ...state.actualSheet,
                table: updatedTable
            }};
        case SheetActions.RESIZE_SHEET_BORDER:
            if(action.payload.isCol)
                return {
                    ...state, 
                    actualSheet: {
                        ...state.actualSheet, 
                        borderTop: action.payload.border
                    }
                }
            return {
                ...state, 
                actualSheet: {
                    ...state.actualSheet, 
                    borderLeft: action.payload.border
                }
            }
        case AuthActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}

export default sheetReducer;