import React from "react";
import TableElement from "./TableElement";
import {connect} from "react-redux";

const Table = ({rows, cols, startRow, endRow, startCol, endCol, actualSheet}) => {
    const table = [];
    for(let row = 0; row < endRow - startRow; row++){
        table.push([])
        for(let col = 0; col < endCol - startCol; col++){
            table[row].push(
                <TableElement 
                    col={startCol + col} 
                    row={startRow + row} 
                    text={actualSheet[startRow + row][startCol + col]}/>
            )
        }
    }
    const jsxDivTable = (
        <div className="table">
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
        actualSheet: state.sheet.actualSheet
    }
}

export default connect(mapStateToProps)(Table);