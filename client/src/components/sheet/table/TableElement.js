import React from "react";
import {connect} from "react-redux";
import {updateSheetCell} from "../../../store/actions/sheetActions";

const FirstRow = ({col, row, text, updateSheetCell}) => {
    const handleChange = e => updateSheetCell(col, row, e.target.value);
    return (
       <div className="table-element">
            <textarea value={text} onChange={handleChange}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateSheetCell: (col, row, text) => dispatch(updateSheetCell(col, row, text))
    }
}

export default connect(null, mapDispatchToProps)(FirstRow);