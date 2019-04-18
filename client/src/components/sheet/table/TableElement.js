import React from "react";
import {connect} from "react-redux";
import {updateTableCell} from "../../../store/actions/sheetActions";

const TableElement = ({col, row, text, width, height, updateTableCell}) => {
    const handleChange = e => updateTableCell(col, row, e.target.value);
    return (
       <div className="table-element" style={{width, height}}>
            <textarea value={text} onChange={handleChange}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateTableCell: (col, row, text) => dispatch(updateTableCell(col, row, text))
    }
}

export default connect(null, mapDispatchToProps)(TableElement);