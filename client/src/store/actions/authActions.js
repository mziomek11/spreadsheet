import axios from "axios";
import {AuthActions} from "./actionTypes";

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: AuthActions.USER_LOADING});
    const config = tokenConfig(getState);

    axios.get("/api/auth/user", config)
    .then(res => dispatch({
        type: AuthActions.USER_LOADED,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: AuthActions.AUTH_ERROR
    }));
};

export const register = ({username, email, password}) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const data = JSON.stringify({username, password, email});
    axios.post("http://localhost:5000/api/users", data, config)
    .then(res => dispatch({
        type: AuthActions.REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: AuthActions.REGISTER_FAIL
    }));
};

export const login = (email, password) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const data = JSON.stringify({email, password});
    axios.post("/api/auth", data, config)
    .then(res => dispatch({
        type: AuthActions.LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: AuthActions.LOGIN_FAIL
    }));
};

export const logout = () => {
    return {
      type: AuthActions.LOGOUT_SUCCESS
    };
  };

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if(token){
        config.headers["x-auth-token"] = token;
    }
    return config;
};
