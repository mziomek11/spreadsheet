import React from "react";

const TableRow = ({elements, index}) => {
    return(
        <div className="table-row">
            {elements.map((col, colIndex) => (
                <div key={index + " " + colIndex}>{col}</div>
            ))}
        </div>
    )
}

export default TableRow;