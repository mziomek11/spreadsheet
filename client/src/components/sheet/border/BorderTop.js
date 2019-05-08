import React from "react";
import BorderTopElement from "./BorderTopElement";
import {connect} from "react-redux";
import {CORNER_SIZE} from "../../../config";

const BorderTop = ({startCol, endCol, borderWidths, scrollX, focusedColumn}) => {
    const elements = [];
    let startMouseX = CORNER_SIZE;
    for(let col = startCol; col < endCol; col++){
        const elementWidth = borderWidths[col];
        elements.push(<BorderTopElement 
            startMouseX={startMouseX}
            width={elementWidth} 
            index={col} 
            key={col}
            isFocused={col === focusedColumn}
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
        borderWidths: state.sheet.actualSheet.borderTop,
        focusedColumn: state.sheet.actualSheet.actualTableCell.col
    }
}

export default connect(mapStateToProps)(BorderTop);


