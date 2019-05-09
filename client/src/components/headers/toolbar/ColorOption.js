import React, {useState} from "react";
import {connect} from "react-redux";
import {updateTableCells} from "../../../store/actions/sheetActions";
import {GithubPicker} from 'react-color'

const ColorOption = ({focusedTableCells, updateTableCells, optionName, optionText, startColor}) => {
    let option = React.createRef();
    const [showPicker, setShowPicker] = useState(false);
    const [color, setColor] = useState(startColor);
    const handleColorClick = () => {
        if(isCellSelected()) updateColor(color);
    };
    const handleArrowClick = () => {
        if(isCellSelected()) {
            setShowPicker(!showPicker);
            document.addEventListener("click", handleDocumentClick);
        };
    };
    const handleChangeComplete = ({hex}) => {
        if(!isCellSelected()) return;
        setShowPicker(false);
        setColor(hex);
        updateColor(hex);
    };
    const handleDocumentClick = e => {
        if(e.target.className !== "github-picker"){
            setShowPicker(false);
            document.removeEventListener("click", handleDocumentClick);
        }
    };
    const isCellSelected = () => {
        return focusedTableCells.length > 0;
    };
    const updateColor = newColor => {
        const updateObject = {};
        updateObject[optionName] = newColor;
        updateTableCells(updateObject);
    };
    return(
        <div className="option" ref={option}> 
            <div className="icon-container" onClick={handleColorClick}>
                <h4 style={{backgroundColor: color}}>{optionText}</h4>
            </div>
            <div className="arrow-container" onClick={handleArrowClick}>
                <i className="material-icons">arrow_downward</i>
            </div>
            {showPicker ? 
            <GithubPicker
                onChangeComplete={handleChangeComplete}
            /> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        focusedTableCells: state.sheet.actualSheet.focusedTableCells
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCells: property => dispatch(updateTableCells([], property))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorOption);

