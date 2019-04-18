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
    .then(res => dispatch({
        type: SheetActions.UPDATE_SHEET_INFO,
        payload: { data, _id: id }
    }))
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

export const resizeSheet = (cols, rows) => (dispatch, getState) => {
    const actualSheet = getState().sheet.actualSheet;
    let newSheet;
    if(actualSheet.length === 0){
        newSheet = new Array(rows).fill(new Array(cols).fill(""));
    }else{
        const actualRows = actualSheet.length;
        const actualCols = actualSheet[0].length;
        newSheet = actualSheet.map(row => [...row, ...new Array(cols - actualCols).fill("")]);
        newSheet = [...newSheet, ...new Array(rows - actualRows).fill(new Array(cols).fill(""))];
    }
    dispatch({
        type: SheetActions.RESIZE_SHEET,
        payload: newSheet
    });
};

export const updateSheetCell = (col, row, text) => {
    return {
        type: SheetActions.UPDATE_SHEET_CELL,
        payload: {
            col, row, text
        }
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
