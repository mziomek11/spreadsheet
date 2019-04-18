import React from "react";
import BorderLeftElement from "./BorderLeftElement";

const BorderLeft = ({size, scrollLeft, startRow, endRow}) => {
    const elements = [];
    //const elements = new Array(size).fill().map((x, i) => <BorderLeftElement index={i} key={i}/>);
    for(let row = startRow; row < endRow; row++){
        elements.push(<BorderLeftElement index={row} key={row}/>)
    }
    return (
        <div className="border-left" style={{left: scrollLeft + "px"}}>
            {elements}
        </div>
    );
};

export default BorderLeft;


