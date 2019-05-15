import {combineReducers} from "redux";
import sheetReducer from "./sheetReducer";
import displayReducer from "./displayReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import focusReducer from "./focusReducer";
import borderReducer from "./borderReducer";
import tableReducer from "./tableReducer";

const rootReducer = combineReducers({
    sheet: sheetReducer,
    display: displayReducer,
    border: borderReducer,
    table: tableReducer,
    focus: focusReducer,
    error: errorReducer,
    auth: authReducer
})

export default rootReducer;