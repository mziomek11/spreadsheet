import React from "react";
import BorderCorner from "./BorderCorner";
import BorderTop from "./BorderTop";
import BorderLeft from "./BorderLeft";

const Border = ({rows, cols, startRow, endRow, startCol, endCol}) => {
    return (    
        <div className="border">
            <BorderCorner />
            <BorderTop size={cols} startCol={startCol} endCol={endCol}/>
            <BorderLeft size={rows} startRow={startRow} endRow={endRow}/>
        </div>
    );
};

export default Border;