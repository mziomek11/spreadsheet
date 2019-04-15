import {combineReducers} from "redux";
import sheetReducer from "./sheetReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    sheet: sheetReducer,
    error: errorReducer,
    auth: authReducer
})

export default rootReducer;