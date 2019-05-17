import {ShortcutActions} from "../actions/actionTypes";

const initState = {
    copiedData: [],
    copyStartCol: 0,
    copyEndCol: 0,
    copyStartRow: 0,
    copyEndRow: 0,
    tables: [],
    actualTableIndex: 0
};

const shortcutReducer = (state=initState, action) => {
    switch(action.type){
        case ShortcutActions.COPY:
            return {
                ...state, 
                ...action.payload
            };
        case ShortcutActions.PASTE:
            return state;
        case ShortcutActions.ADD_TABLE:
            return {
                ...state,
                tables: action.payload,
                actualTableIndex: action.payload.length - 1
            };
        case ShortcutActions.UNDO:
            return {
                ...state,
                actualTableIndex: action.payload
            };
        case ShortcutActions.REDO:
            return {
                ...state,
                actualTableIndex: action.payload
            };
        default:
            return state;
    };
};

export default shortcutReducer;