import {TableActions} from "../actions/actionTypes";

const initState = {
    table: []
};

const tableReducer = (state=initState, action) => {
    switch(action.type){
        case TableActions.RESIZE_TABLE:
        case TableActions.UPDATE_TABLE_CELL:
        case TableActions.SET_TABLE:
            return {
                ...state, 
                table: action.payload
            };
        default:
            return state;
    };
};

export default tableReducer;