import React, {Component} from "react";
import {connect} from "react-redux";
import {resizeSheetBorder} from "../../../store/actions/borderActions";
import {CORNER_SIZE, MIN_CELL_SIZE} from "../../../config";

class BorderTopElement extends Component{
    shouldComponentUpdate(nextProps){
        const propsPropertiesToCheck = ["isFocused", "width", "index"];

        for(let property of propsPropertiesToCheck){
            if(nextProps[property] !== this.props[property]) return true;
        }
        return false;
    };
    handleResizeClick = () => {
        window.addEventListener("mousemove", this.handleResizeMove);
        window.addEventListener("mouseup", this.handleMouseUp);
    };
    handleResizeMove = e => {
        const wantedSize = e.clientX - this.props.startMouseX;
        const newSize = wantedSize > MIN_CELL_SIZE ? wantedSize : MIN_CELL_SIZE;
        this.props.resizeSheetBorder(this.props.index, newSize);
    };
    handleMouseUp = () => {
        window.removeEventListener("mousemove", this.handleResizeMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    };
    toColumnName = num => {
        for (var ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
          ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;
    };
    render(){
        const {isFocused, width, index} = this.props;
        return (
            <div>
                <div 
                    className={"border-top-element" + (isFocused ? " fucused" : "")} 
                    style={{width, height: CORNER_SIZE}}
                >
                    <h6>{this.toColumnName(index + 1)}</h6>
                    <div className="resizer" onMouseDown={this.handleResizeClick}/>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resizeSheetBorder: (i, width) => dispatch(resizeSheetBorder(i, width, true))
    }
}

export default connect(null, mapDispatchToProps)(BorderTopElement);