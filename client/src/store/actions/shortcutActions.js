import {ShortcutActions} from "./actionTypes";
import {updateTableCells, resizeTable} from "./tableActions";
import {setDisplayData} from "./displayActions";

export const handleCopy = () => (dispatch, getState) => {
    const focusedData = [...getState().focus.focusedTableCells];
    const table = [...getState().table.table];
    const copyData = focusedData.map(cell => { return {
        ...cell,
        ...table[cell.row][cell.col]
    }});

    let copyStartCol = Infinity, copyStartRow = Infinity, copyEndCol = -1, copyEndRow = -1;
    focusedData.forEach(({col, row}) => {
        if(row > copyEndRow) copyEndRow = row;
        if(row < copyStartRow) copyStartRow = row
        if(col > copyEndCol) copyEndCol = col;
        if(col < copyStartCol) copyStartCol = col; 
    });

    for(let row = copyStartRow; row <= copyEndRow; row++){
        for(let col = copyStartCol; col <= copyEndCol; col++){
            let foundElement = false;
            focusedData.forEach((cell) => {
                if(cell.row === row && cell.col === col) foundElement = true;
            })
            if(!foundElement) return;
        }
    }
    dispatch({
        type: ShortcutActions.COPY,
        payload: {
            copiedData: copyData,
            copyStartCol, copyEndCol, copyStartRow, copyEndRow
        }
    });
};

export const handlePaste = () => (dispatch, getState) => {
    const {rows, cols} = getState().display;
    const {copiedData, copyStartCol, copyEndCol, copyStartRow, copyEndRow} = getState().shortcut;
    const {focusedTableCells} = getState().focus;
    if(copiedData.length === 0) return;

    //Finding min and max paste col and row 
    let pasteStartCol = Infinity, pasteStartRow = Infinity, pasteEndCol = -1, pasteEndRow = -1;
    focusedTableCells.forEach(({col, row}) => {
        if(row > pasteEndRow) pasteEndRow = row;
        if(row < pasteStartRow) pasteStartRow = row
        if(col > pasteEndCol) pasteEndCol = col;
        if(col < pasteStartCol) pasteStartCol = col; 
    });

    const copyWidth = copyEndCol - copyStartCol + 1;
    const copyHeight = copyEndRow - copyStartRow + 1;
    let pasteWidth = pasteEndCol - pasteStartCol + 1;
    let pasteHeight = pasteEndRow - pasteStartRow + 1;

    //Cheking if focus is rect
    for(let row = pasteStartRow; row <= pasteEndRow; row++){
        for(let col = pasteStartCol; col <= pasteEndCol; col++){
            let foundElement = false;
            focusedTableCells.forEach((cell) => {
                if(cell.row === row && cell.col === col) foundElement = true;
            })
            if(!foundElement) return;
        }
    }

    //Cheking if copy rect is bigger than paste rect
    if(copyWidth > pasteWidth) {
        pasteEndCol = pasteStartCol + copyWidth - 1;
        pasteWidth = pasteEndCol - pasteStartCol + 1;
    }
    if(copyHeight > pasteHeight){
        pasteEndRow = pasteStartRow + copyHeight - 1;
        pasteHeight = pasteEndRow - pasteStartRow + 1;
    }
    
    //Cheking if should resize
    const resizeCols = pasteEndCol > cols, resizeRows = pasteEndRow > rows;
    if(resizeCols || resizeRows){
        dispatch(resizeTable(resizeCols ? pasteEndCol + 1 : cols, resizeRows ? pasteEndRow + 1 : rows));
        dispatch(setDisplayData({
            cols: resizeCols ? pasteEndCol + 1 : cols,
            rows: resizeRows ? pasteEndRow + 1 : rows
        }));
    }

    //Updating elements
    for(let pasteRow = pasteStartRow; pasteRow <= pasteEndRow; pasteRow++){
        const nthPasteRow = pasteRow - pasteStartRow;
        let nthCopyRow = copyHeight >= pasteHeight ? nthPasteRow : nthPasteRow  % copyHeight;

        for(let pasteCol = pasteStartCol; pasteCol <= pasteEndCol; pasteCol++){
            const nthPasteCol = pasteCol - pasteStartCol;
            let nthCopyCol = copyWidth >= pasteWidth ? nthPasteCol : nthPasteCol  % copyWidth;

            const cellToUpdate = [{col: pasteCol, row: pasteRow}];
            const cellProps = copiedData.filter(cell => cell.row === copyStartRow + nthCopyRow && cell.col === copyStartCol + nthCopyCol)[0];
            const {col, row, ...propsToUpdate} = cellProps;
            dispatch(updateTableCells(cellToUpdate, propsToUpdate))
        }
    }

    dispatch({
        type: ShortcutActions.PASTE
    });
};