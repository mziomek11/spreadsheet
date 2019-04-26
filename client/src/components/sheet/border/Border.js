import React from "react";
import BorderCorner from "./BorderCorner";
import BorderTop from "./BorderTop";
import BorderLeft from "./BorderLeft";

const Border = ({rows, cols, startRow, endRow, startCol, endCol, scrollX}) => {
    return (    
        <div className="border">
            <BorderCorner />
            <BorderTop size={cols} startCol={startCol} endCol={endCol} scrollX={scrollX}/>
            <BorderLeft size={rows} startRow={startRow} endRow={endRow} scrollX={scrollX}/>
        </div>
    );
};

export default Border;