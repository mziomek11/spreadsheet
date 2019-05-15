import React from "react";
import {connect} from "react-redux";
import {resizeSheetBorder} from "../../../store/actions/borderActions";
import {CORNER_SIZE, MIN_CELL_SIZE} from "../../../config";

const BorderLeftElement = ({index, height, isFocused, startMouseY, resizeSheetBorder}) => {
    const handleResizeClick = () => {
        window.addEventListener("mousemove", handleResizeMove);
        window.addEventListener("mouseup", handleMouseUp);
    };
    const handleResizeMove = e => {
        const wantedSize = e.clientY - startMouseY;
        const newSize = wantedSize > MIN_CELL_SIZE ? wantedSize : MIN_CELL_SIZE;
        resizeSheetBorder(index, newSize);
    };
    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };
    return (
        <div>
            <div 
                className={"border-left-element" + (isFocused ? " focused" : "")} 
                style={{height, width: CORNER_SIZE}}
            >
                <h6>{index + 1}</h6>
                <div className="resizer" onMouseDown={handleResizeClick}/>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        resizeSheetBorder: (i, height) => dispatch(resizeSheetBorder(i, height, false))
    }
}

export default connect(null, mapDispatchToProps)(BorderLeftElement);