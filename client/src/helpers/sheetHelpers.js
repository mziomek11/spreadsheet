import {TOOLBAR_HEIGHT, CORNER_SIZE, DEFAUTLT_CELL_HEIGHT, DEFAUTLT_CELL_WIDTH} from "../config";

export const getEndRow = (startRow, borderLeft) => {
    let space = window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE;
    let endRow = startRow;
    while(space > 0){
        space -= borderLeft[endRow] ? borderLeft[endRow] : DEFAUTLT_CELL_HEIGHT;
        endRow++;
    }
    return endRow;
};

export const getStartRow = (endRow, borderLeft) => {
    let space = window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE;
    let startRow = endRow;

    while(space > 0){
        space -= borderLeft[startRow - 1] ? borderLeft[startRow - 1] : DEFAUTLT_CELL_HEIGHT;
        if(-space < (borderLeft[startRow] ? borderLeft[startRow] : DEFAUTLT_CELL_HEIGHT)){
            startRow--;
        }else break;
        if(startRow === 0) break;
    }
    return startRow;
};

export const getEndCol = (startCol, borderTop) => {
    let space = window.innerWidth  - CORNER_SIZE;
    let endCol = startCol;
    while(space > 0){
        space -= borderTop[endCol] ? borderTop[endCol] : DEFAUTLT_CELL_WIDTH;
        endCol++;
    }
    return endCol;
};

export const getStartCol = (endCol, borderTop) => {
    let space = window.innerWidth  - CORNER_SIZE;
    let startCol = endCol;

    while(space > 0){
        space -= borderTop[startCol - 1] ? borderTop[startCol - 1] : DEFAUTLT_CELL_WIDTH;
        if(-space < (borderTop[startCol] ? borderTop[startCol] : DEFAUTLT_CELL_WIDTH)){
            startCol--;
        }else break;
        if(startCol === 0) break;
    }
    return startCol;
};

export const getScrollHeight = (startRow, borderLeft) => {
    let height = 0;
    for(let i = 0; i < startRow; i++){
        height += borderLeft[i];
    }
    return height;
};

export const getScrollWidth = (startCol, borderTop) => {
    let width = 0;
    for(let i = 0; i < startCol; i++){
        width += borderTop[i];
    }
    return width;
};
