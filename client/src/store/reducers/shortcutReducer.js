import {ShortcutActions} from "../actions/actionTypes";

const initState = {
    copiedData: [],
    copyStartCol: 0,
    copyEndCol: 0,
    copyStartRow: 0,
    copyEndRow: 0
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
        default:
            return state;
    };
};

export default shortcutReducer;