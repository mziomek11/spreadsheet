import React from "react";
import {connect} from "react-redux";
import {resizeSheetBorder} from "../../../store/actions/sheetActions";
import {CORNER_SIZE, MIN_CELL_SIZE} from "../../../config";

const BorderTopElement = ({index, startMouseX, isFocused, width, resizeSheetBorder}) => {
    const handleResizeClick = () => {
        window.addEventListener("mousemove", handleResizeMove);
        window.addEventListener("mouseup", handleMouseUp);
    };
    const handleResizeMove = e => {
        const wantedSize = e.clientX - startMouseX;
        const newSize = wantedSize > MIN_CELL_SIZE ? wantedSize : MIN_CELL_SIZE;
        resizeSheetBorder(index, newSize);
    };
    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };
    const toColumnName = num => {
        for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
          ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;
    };
    return (
        <div>
            <div 
                className={"border-top-element" + (isFocused ? " fucused" : "")} 
                style={{width, height: CORNER_SIZE}}
            >
                <h6>{toColumnName(index + 1)}</h6>
                <div className="resizer" onMouseDown={handleResizeClick}/>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        resizeSheetBorder: (i, width) => dispatch(resizeSheetBorder(i, width, true))
    }
}

export default connect(null, mapDispatchToProps)(BorderTopElement);