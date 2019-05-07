import React from "react";
import TableRow from "./TableRow";
import TableElement from "./TableElement";
import {connect} from "react-redux";
import {CORNER_SIZE} from "../../../config";

const Table = ({startRow, endRow, startCol, endCol, actualSheet, scrollX}) => {
    const {borderLeft, borderTop, table, actualTableCell} = actualSheet
    const jsxTable = [];
    try {
        for(let row = 0; row < endRow - startRow; row++){
            jsxTable.push([])
            for(let col = 0; col < endCol - startCol; col++){
                const elementCol = startCol + col;
                const elementRow = startRow + row;
                const isFocused = elementCol === actualTableCell.col 
                                && elementRow === actualTableCell.row;                    
                jsxTable[row].push(
                    <TableElement 
                        col={elementCol} 
                        row={elementRow}
                        width={borderTop[elementCol]}
                        height={borderLeft[elementRow]}
                        data={table[elementRow][elementCol]}
                        isFocused={isFocused}
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
        actualSheet: state.sheet.actualSheet,
        actualTable: state.sheet.actualSheet.table,
        borderHeigts: state.sheet.actualSheet.borderLeft,
        borderWidths: state.sheet.actualSheet.borderTop
    }
}

export default connect(mapStateToProps)(Table);