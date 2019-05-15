import {TableActions} from "../actions/actionTypes";

const initState = {
    table: []
};

const tableReducer = (state=initState, action) => {
    switch(action.type){
        case TableActions.RESIZE_TABLE:
            return {
                ...state, 
                table: action.payload
            };
        case TableActions.UPDATE_TABLE_CELL:
            return {
                ...state, 
                table: action.payload
            };
        default:
            return state;
    };
};

export default tableReducer;