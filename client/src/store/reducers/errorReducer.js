import {ErrorActions} from "../actions/actionTypes";

const initState = {
    messages: {},
    status: null
}

const errorReducer = (state=initState, action) => {
    switch(action.type){
        case ErrorActions.GET_ERRORS:
            console.log(action.payload.messages)
            return {
                messages: action.payload.messages, 
                status: action.payload.status
            };
        case ErrorActions.CLEAR_ERRORS:
            return initState;
        default:
            return state;
    };
};

export default errorReducer;