import React from "react";
import {connect} from "react-redux";
import {updateTableCell, setTableCell} from "../../../store/actions/sheetActions";

const TableElement = ({col, row, data, width, height, setTableCell, updateTableCell}) => {
    const handleClick = () => setTableCell(col, row);
    const handleChange = e => updateTableCell(col, row, {text: e.target.value});
    return (
       <div className="table-element" style={{width, height}}>
            <textarea 
                value={data.text} 
                onChange={handleChange} 
                onClick={handleClick}
                style={{
                    textAlign: data.align
                }}
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateTableCell: (col, row, text) => dispatch(updateTableCell(col, row, text)),
        setTableCell: (col, row) => dispatch(setTableCell(col, row))
    }
}

export default connect(null, mapDispatchToProps)(TableElement);