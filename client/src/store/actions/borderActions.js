import {BorderActions} from "./actionTypes";

export const resizeSheetBorder = (index, size, isCol) => (dispatch, getState) => {
    const newBorder = [...getState().border[isCol ? "borderTop" : "borderLeft"]]
    const secondBorder = [...getState().border[!isCol ? "borderTop" : "borderLeft"]]
    newBorder[index] = size;
    dispatch({
        type: BorderActions.RESIZE_BORDER,
        payload: {
            borderTop: isCol ? newBorder : secondBorder,
            borderLeft: isCol ? secondBorder : newBorder,
            borderResized: true,
            topResized: isCol,
            leftResized: !isCol
        }
    });
};

export const makeBorderResizedFalse = () => {
    return {
        type: BorderActions.MAKE_BORDER_RESIZED_FALSE,
        payload: {
            borderResized: false,
            topResized: false,
            leftResized: false
        }
    };
};