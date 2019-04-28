import React from "react";
import TableRow from "./TableRow";
import TableElement from "./TableElement";
import {connect} from "react-redux";
import {CORNER_SIZE} from "../../../config";

const Table = ({startRow, endRow, startCol, endCol, actualTable, borderHeigts, borderWidths, scrollX}) => {
    const table = [];
    try {
        for(let row = 0; row < endRow - startRow; row++){
            table.push([])
            for(let col = 0; col < endCol - startCol; col++){
                table[row].push(
                    <TableElement 
                        col={startCol + col} 
                        row={startRow + row}
                        width={borderWidths[startCol + col]}
                        height={borderHeigts[startRow + row]}
                        data={actualTable[startRow + row][startCol + col]}
                    />
                )
            }
        }
    }catch(e){
        console.log("table err")
    }

    return (
        <div>
            <div className="table" style={{
                marginTop: CORNER_SIZE,
                marginLeft: CORNER_SIZE + scrollX
            }}>
                {table.map((row, rowIndex) => (
                    <TableRow key={rowIndex} elements={table[rowIndex]} index={rowIndex} />
                ))}
            </div>
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