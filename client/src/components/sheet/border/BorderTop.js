import React from "react";
import BorderTopElement from "./BorderTopElement";

const BorderTop = ({size, scrollTop, startCol, endCol}) => {
    const elements = [];
    //const elements = new Array(size).fill().map((x, i) => <BorderTopElement index={i} key={i}/>);
    for(let col = startCol; col < endCol; col++){
        elements.push(<BorderTopElement index={col} key={col}/>)
    }
    return (
        <div className="table-row border-top" style={{top: (64 + scrollTop) + "px" }}>
            {elements}
        </div>
    );
};

export default BorderTop;


