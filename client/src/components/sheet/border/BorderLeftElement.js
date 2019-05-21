import React, {Component} from "react";
import {connect} from "react-redux";
import {resizeSheetBorder} from "../../../store/actions/borderActions";
import {CORNER_SIZE, MIN_CELL_SIZE} from "../../../config";

class BorderLeftElement extends Component{
    shouldComponentUpdate(nextProps){
        const propsPropertiesToCheck = ["isFocused", "height", "index"];

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
        const wantedSize = e.clientY - this.props.startMouseY;
        const newSize = wantedSize > MIN_CELL_SIZE ? wantedSize : MIN_CELL_SIZE;
        this.props.resizeSheetBorder(this.props.index, newSize);
    };
    handleMouseUp = () => {
        window.removeEventListener("mousemove", this.handleResizeMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    };
    render(){
        const {isFocused, height, index} = this.props;
        return (
            <div>
                <div 
                    className={"border-left-element" + (isFocused ? " focused" : "")} 
                    style={{height, width: CORNER_SIZE}}
                >
                    <h6>{index + 1}</h6>
                    <div className="resizer" onMouseDown={this.handleResizeClick}/>
                </div>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resizeSheetBorder: (i, height) => dispatch(resizeSheetBorder(i, height, false))
    };
};

export default connect(null, mapDispatchToProps)(BorderLeftElement);