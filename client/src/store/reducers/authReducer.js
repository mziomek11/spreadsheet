import {AuthActions} from "../actions/actionTypes";

const initState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    firstChecked: false
}

const authReducer = (state=initState, action) => {
    switch(action.type){
        case AuthActions.USER_LOADING:
            return {...state, isLoading: true};
        case AuthActions.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                firstChecked: true
            };
        case AuthActions.LOGIN_SUCCESS:
        case AuthActions.REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {...state, ...action.payload, isAuthenticated: true, isLoading: false};
        case AuthActions.AUTH_ERROR:
        case AuthActions.LOGOUT_SUCCESS:
        case AuthActions.LOGIN_FAIL:
        case AuthActions.REGISTER_FAIL:
            console.log(action.type);
            localStorage.removeItem("token");
            return {initState, firstChecked: true};
        default:
            return state;
    }
}

export default authReducer;