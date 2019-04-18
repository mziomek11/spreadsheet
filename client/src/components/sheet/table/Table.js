import React from "react";
import TableElement from "./TableElement";
import {connect} from "react-redux";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

const Table = ({rows, cols, startRow, endRow, startCol, endCol, actualTable, borderHeigts, borderWidths}) => {
    const table = [];
    for(let row = 0; row < endRow - startRow; row++){
        table.push([])
        for(let col = 0; col < endCol - startCol; col++){
            table[row].push(
                <TableElement 
                    col={startCol + col} 
                    row={startRow + row}
                    width={borderWidths[startCol + col]}
                    height={borderHeigts[startRow + row]}
                    text={actualTable[startRow + row][startCol + col]}
                />
            )
        }
    }
    const jsxDivTable = (
        <div className="table" style={{
            marginTop: CORNER_SIZE + TOOLBAR_HEIGHT,
            marginLeft: CORNER_SIZE
        }}>
            {table.map((row, rowIndex) => (
                <div key={rowIndex} className="table-row">
                    {table[rowIndex].map((col, colIndex) => (
                        <div key={rowIndex + " " + colIndex}>{col}</div>
                    ))}
                </div>
            ))}
        </div>
    )
    return (
        <div>
            {jsxDivTable}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        actualTable: state.sheet.actualSheet.table,
        borderHeigts: state.sheet.actualSheet.borderLeft,
        borderWidths: state.sheet.actualSheet.borderTop
    }
}

export default connect(mapStateToProps)(Table);