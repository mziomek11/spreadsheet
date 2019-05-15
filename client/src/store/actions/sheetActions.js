import axios from "axios";
import {SheetActions, ErrorActions} from "./actionTypes";
import {tokenConfig} from "./authActions";

export const getSheets = () => (dispatch, getState) => {
    axios.get("/api/spreadsheet", tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.GET_SHEETS,
        payload: res.data
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const getSheetDetail = id => (dispatch, getState) => {
    axios.get(`/api/spreadsheet/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.GET_SHEET_DETAIL,
        payload: res.data
    }))
};

export const createSheet = data => (dispatch, getState) => {
    axios.post("/api/spreadsheet", data, tokenConfig(getState))
    .then(res => dispatch({
        type: SheetActions.CREATE_SHEET,
        payload: res.data
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const updateSheetInfo = (id, data) => (dispatch, getState) => {
    axios.put(`/api/spreadsheet/${id}/update`, data, tokenConfig(getState))
    .then(res => {
        const newSheets = [...getState().sheet.sheets];
        const updateIndex = newSheets.findIndex(x => x._id === id);
        newSheets[updateIndex] = {...newSheets[updateIndex], ...data};
        dispatch({
            type: SheetActions.UPDATE_SHEET_INFO,
            payload: newSheets
        });
    })
    .catch(err => dispatch(errorAction(err)));
};

export const deleteSheet = id => (dispatch, getState) => {
    axios.delete(`/api/spreadsheet/${id}/delete`, tokenConfig(getState))
    .then(() => dispatch({
        type: SheetActions.DELETE_SHEET,
        payload: id
    }))
    .catch(err => dispatch(errorAction(err)));
};

export const setIsInSheet = isInSheet => {
    return {
        type: SheetActions.SET_IS_IN_SHEET,
        payload: isInSheet
    };
};

const errorAction = err => {
    return {
        type: ErrorActions.GET_ERRORS,
        payload: {
            messages: err.response.data,
            status: err.response.status
        }
    };
};

