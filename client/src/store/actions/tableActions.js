import {TableActions, BorderActions, ShortcutActions} from "./actionTypes";
import {getFilledArray, getNestedFilledArray} from "../../helpers/arrayHelpers";
import {DEFAUTLT_CELL_WIDTH, DEFAUTLT_CELL_HEIGHT, DEFAULT_CELL_DATA} from "../../config";

export const resizeTable = (cols, rows) => (dispatch, getState) => {
    const {table} = getState().table;
    const {borderTop, borderLeft} = getState().border;
    let newTable, newBorderTop, newBorderLeft;

    if(table.length === 0){
        newTable = getNestedFilledArray(rows, cols, DEFAULT_CELL_DATA);
        newBorderTop = getFilledArray(cols, DEFAUTLT_CELL_WIDTH);
        newBorderLeft = getFilledArray(rows, DEFAUTLT_CELL_HEIGHT);

        dispatch({
            type: ShortcutActions.ADD_TABLE,
            payload: [newTable]
        });        
    }else{
        const newRows = rows - table.length;
        const newCols = cols - table[0].length;
        newTable = table.map(row => [...row, ...getFilledArray(newCols, DEFAULT_CELL_DATA)]);
        newTable = [...newTable, ...getNestedFilledArray(newRows, cols, DEFAULT_CELL_DATA)];
        newBorderTop = [...borderTop, ...getFilledArray(newCols, DEFAUTLT_CELL_WIDTH)];
        newBorderLeft = [...borderLeft, ...getFilledArray(newRows, DEFAUTLT_CELL_HEIGHT)];
    }
    dispatch({
        type: TableActions.RESIZE_TABLE,
        payload: newTable
    });
    dispatch({
        type: BorderActions.RESIZE_BORDER,
        payload: {
            borderTop: newBorderTop,
            borderLeft: newBorderLeft
        }
    });
};

export const updateTableCells = (cellArray, property) => (dispatch, getState) => {
    if(cellArray.length === 0){
        cellArray = [...getState().focus.focusedTableCells];
    }
    if(cellArray.length === 0) return;

    const newTable = [...getState().table.table];
    cellArray.forEach(cell => {
        newTable[cell.row] = newTable[cell.row].map((element, index) => {
            if(index === cell.col){
                return {
                    ...element,
                    ...property
                };
            }
            return element;
        })
    });

    const {tables, actualTableIndex} = getState().shortcut;
    dispatch({
        type: ShortcutActions.ADD_TABLE,
        payload: [...tables.slice(0, actualTableIndex + 1), newTable]
    });

    dispatch({
        type: TableActions.UPDATE_TABLE_CELL,
        payload: newTable
    });
};

export const updateTableCellsDiffProps = (cellArray, propertyArray) => (dispatch, getState) => {
    if(cellArray.length === 0 || cellArray.length !== propertyArray.length) return;
    const newTable = [...getState().table.table];
    
    for(let i = 0; i < cellArray.length; i++){
        const {col, row} = cellArray[i];
        newTable[row] = newTable[row].map((value, index) => {
            if(index === col) {
                return {...propertyArray[i]}
            };
            return value;
        });
    }

    const {tables, actualTableIndex} = getState().shortcut;
    dispatch({
        type: ShortcutActions.ADD_TABLE,
        payload: [...tables.slice(0, actualTableIndex + 1), newTable]
    });
    dispatch({
        type: TableActions.UPDATE_TABLE_CELL,
        payload: newTable
    });
};

export const setTable = table => (dispatch, getState) => {
    let newTable = [...table];
    const {cols, rows} = getState().display;
    if(table.length !== rows || table[0].length !== cols){
        const newRows = rows - table.length;
        const newCols = cols - table[0].length;
        newTable = table.map(row => [...row, ...getFilledArray(newCols, DEFAULT_CELL_DATA)]);
        newTable = [...newTable, ...getNestedFilledArray(newRows, cols, DEFAULT_CELL_DATA)];
    }
    dispatch({
        type: TableActions.SET_TABLE,
        payload: newTable
    });
};
