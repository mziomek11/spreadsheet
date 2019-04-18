import React from "react";
import BorderLeftElement from "./BorderLeftElement";
import {connect} from "react-redux";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

const BorderLeft = ({size, scrollLeft, startRow, endRow, borderHeigts}) => {
    const elements = [];
    let startMouseY = CORNER_SIZE + TOOLBAR_HEIGHT;
    //const elements = new Array(size).fill().map((x, i) => <BorderLeftElement index={i} key={i}/>);
    for(let row = startRow; row < endRow; row++){
        const elementHeight = borderHeigts[row];
        elements.push(<BorderLeftElement
            height={elementHeight}
            startMouseY={startMouseY}
            index={row} 
            key={row}
        />)
        startMouseY += elementHeight;
    }
    return (
        <div className="border-left" style={{
            top: TOOLBAR_HEIGHT + CORNER_SIZE
        }}>
            {elements}
        </div>
    );
    // return (
    //     <div className="border-left" style={{left: scrollLeft + "px"}}>
    //         {elements}
    //     </div>
    // );
};

const mapStateToProps = state => {
    return {
        borderHeigts: state.sheet.actualSheet.borderLeft
    }
}

export default connect(mapStateToProps)(BorderLeft);


