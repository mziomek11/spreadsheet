import React from "react";
import TableRow from "./TableRow";
import TableElement from "./TableElement";
import {connect} from "react-redux";
import {CORNER_SIZE} from "../../../config";

const Table = ({startRow, endRow, startCol, endCol, scrollX, focus, borderLeft, borderTop, table}) => {
    const {rectFocusData, focusedTableCells} = focus;
    const startFocusCol = Math.min(rectFocusData.start.col, rectFocusData.end.col);
    const endFocusCol = Math.max(rectFocusData.start.col, rectFocusData.end.col);
    const startFocusRow = Math.min(rectFocusData.start.row, rectFocusData.end.row);
    const endFocusRow = Math.max(rectFocusData.start.row, rectFocusData.end.row);
    const jsxTable = [];
    try {
        for(let row = 0; row < endRow - startRow; row++){
            jsxTable.push([])
            for(let col = 0; col < endCol - startCol; col++){
                const elementCol = startCol + col;
                const elementRow = startRow + row;
                let isFocused = false, pseudoFocused = false;
                if(focusedTableCells.length > 0){
                    isFocused = focusedTableCells.filter(cell => cell.row === elementRow && cell.col === elementCol).length > 0;             
                }
                if(startFocusRow >= 0){
                    const rowOk = elementCol >= startFocusCol && elementCol <= endFocusCol;
                    const colOk = elementRow >= startFocusRow && elementRow <= endFocusRow;
                    pseudoFocused = rowOk && colOk;
                }                 
                jsxTable[row].push(
                    <TableElement 
                        col={elementCol} 
                        row={elementRow}
                        width={borderTop[elementCol]}
                        height={borderLeft[elementRow]}
                        data={table[elementRow][elementCol]}
                        isFocused={isFocused}
                        isPseudoFocused={pseudoFocused}
                    />
                )
            }
        }
    }catch(e){
        console.log("table err")
        console.log(e)
    }
    return (
        <div>
            <div className="table" style={{
                marginTop: CORNER_SIZE,
                marginLeft: CORNER_SIZE + scrollX
            }}>
                {jsxTable.map((row, rowIndex) => (
                    <TableRow key={rowIndex} elements={jsxTable[rowIndex]} index={rowIndex} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        table: state.table.table,
        focus: state.focus,
        startRow: state.display.startRow,
        endRow: state.display.endRow,
        startCol: state.display.startCol,
        endCol: state.display.endCol,
        scrollX: state.scroll.lastScrollX,
        borderLeft: state.border.borderLeft,
        borderTop: state.border.borderTop
    };
};

export default connect(mapStateToProps)(Table);