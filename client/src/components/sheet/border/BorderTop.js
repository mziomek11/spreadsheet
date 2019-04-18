import React from "react";
import BorderTopElement from "./BorderTopElement";
import {connect} from "react-redux";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

const BorderTop = ({size, scrollTop, startCol, endCol, borderWidths}) => {
    const elements = [];
    let startMouseX = CORNER_SIZE;
    //const elements = new Array(size).fill().map((x, i) => <BorderTopElement index={i} key={i}/>);
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
            top: TOOLBAR_HEIGHT,
            left: CORNER_SIZE
        }}>
            {elements}
        </div>
    );
    // return (
    //     <div className="table-row border-top" style={{top: (64 + scrollTop) + "px" }}>
    //         {elements}
    //     </div>
    // );
};

const mapStateToProps = state => {
    return {
        borderWidths: state.sheet.actualSheet.borderTop
    }
}

export default connect(mapStateToProps)(BorderTop);


