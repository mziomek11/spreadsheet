import {FocusActions} from "./actionTypes";

export const setFocusedTableCells = (focusedCellsArray) => {
    return {
        type: FocusActions.SET_FOCUSED_TABLE_CELLS,
        payload: [...focusedCellsArray]
    };
};

export const setFocusRectData = focusRectData => {
    return {
        type: FocusActions.SET_FOCUS_RECT_DATA,
        payload: focusRectData
    };
};