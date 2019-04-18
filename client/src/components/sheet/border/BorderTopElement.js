import React from "react";
import {connect} from "react-redux";
import {resizeSheetBorder} from "../../../store/actions/sheetActions";
import {CORNER_SIZE, MIN_CELL_SIZE} from "../../../config";

const BorderTopElement = ({index, startMouseX, width, resizeSheetBorder}) => {
    const handleResizeClick = () => {
        window.addEventListener("mousemove", handleResizeMove);
        window.addEventListener("mouseup", handleMouseUp);
    }
    const handleResizeMove = e => {
        if(e.clientX - startMouseX > MIN_CELL_SIZE)
            resizeSheetBorder(index, e.clientX - startMouseX);
    }
    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }
    return (
        <div>
            <div className="border-top-element" style={{width, height: CORNER_SIZE}}>
                <h6>{index}</h6>
                <div className="resizer" onMouseDown={handleResizeClick}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        resizeSheetBorder: (i, width) => dispatch(resizeSheetBorder(i, width, true))
    }
}

export default connect(null, mapDispatchToProps)(BorderTopElement);