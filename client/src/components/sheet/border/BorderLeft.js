import React from "react";
import BorderLeftElement from "./BorderLeftElement";
import {connect} from "react-redux";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

const BorderLeft = ({startRow, endRow, borderHeigts, scrollX, focusedTableCells}) => {
    const focusedRows = focusedTableCells.map(cell => cell.row);
    const elements = [];
    let startMouseY = CORNER_SIZE + TOOLBAR_HEIGHT;
    for(let row = startRow; row < endRow; row++){
        const elementHeight = borderHeigts[row];
        elements.push(<BorderLeftElement
            height={borderHeigts[row]}
            startMouseY={startMouseY}
            index={row} 
            key={row}
            isFocused={focusedRows.includes(row)}
        />)
        startMouseY += elementHeight;
    }
    return (
        <div className="border-left" style={{
            top: CORNER_SIZE,
            left: scrollX
        }}>
            {elements}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        startRow: state.display.startRow,
        endRow: state.display.endRow,
        scrollX: state.scroll.lastScrollX,
        borderHeigts: state.border.borderLeft,
        focusedTableCells: state.focus.focusedTableCells
    };
};

export default connect(mapStateToProps)(BorderLeft);


