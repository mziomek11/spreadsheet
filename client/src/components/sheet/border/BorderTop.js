import React from "react";
import BorderTopElement from "./BorderTopElement";
import {connect} from "react-redux";
import {CORNER_SIZE} from "../../../config";

const BorderTop = ({startCol, endCol, borderWidths, scrollX, focusedTableCells}) => {
    const focusedColumns = focusedTableCells.map(cell => cell.col);
    const elements = [];
    let startMouseX = CORNER_SIZE;
    for(let col = startCol; col < endCol; col++){
        const elementWidth = borderWidths[col];
        elements.push(<BorderTopElement 
            startMouseX={startMouseX}
            width={elementWidth} 
            index={col} 
            key={col}
            isFocused={focusedColumns.includes(col)}
        />)
        startMouseX += elementWidth;
    }
    return (
        <div className="table-row border-top" style={{
            left: CORNER_SIZE + scrollX
        }}>
            {elements}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        borderWidths: state.border.borderTop,
        focusedTableCells: state.focus.focusedTableCells
    }
}

export default connect(mapStateToProps)(BorderTop);


