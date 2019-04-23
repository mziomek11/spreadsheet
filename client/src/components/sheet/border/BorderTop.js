import React from "react";
import BorderTopElement from "./BorderTopElement";
import {connect} from "react-redux";
import {CORNER_SIZE} from "../../../config";

const BorderTop = ({startCol, endCol, borderWidths}) => {
    const elements = [];
    let startMouseX = CORNER_SIZE;
    for(let col = startCol; col < endCol; col++){
        const elementWidth = borderWidths[col];
        elements.push(<BorderTopElement 
            startMouseX={startMouseX}
            width={elementWidth} 
            index={col} 
            key={col}
        />)
        startMouseX += elementWidth;
    }
    return (
        <div className="table-row border-top" style={{
            left: CORNER_SIZE
        }}>
            {elements}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        borderWidths: state.sheet.actualSheet.borderTop
    }
}

export default connect(mapStateToProps)(BorderTop);

