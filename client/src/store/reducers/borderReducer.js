import {BorderActions} from "../actions/actionTypes";

const initState = {
    borderTop: [],
    borderLeft: [],
    borderResized: false,
    topResized: false,
    leftResized: false
};

const borderReducer = (state=initState, action) => {
    switch(action.type){
        case BorderActions.RESIZE_BORDER:
            return {
                ...state, 
                ...action.payload
            };
        case BorderActions.MAKE_BORDER_RESIZED_FALSE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };
};

export default borderReducer;