import React, { useEffect} from "react";
import BorderCorner from "./BorderCorner";
import BorderTop from "./BorderTop";
import BorderLeft from "./BorderLeft";

const Border = ({rows, cols, scrollTop, scrollLeft, startRow, endRow, startCol, endCol}) => {
    // const [scrollTop, setScrollTop] = useState(0);
    // const [scrollLeft, setScrollLeft] = useState(0);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
    const handleScroll = e => {
        // setScrollTop(e.target.scrollingElement.scrollTop);
        // setScrollLeft(e.target.scrollingElement.scrollLeft);
    }
    return (    
        <div className="border">
            <BorderCorner />
            <BorderTop size={cols} scrollTop={scrollTop} startCol={startCol} endCol={endCol}/>
            <BorderLeft size={rows} scrollLeft={scrollLeft} startRow={startRow} endRow={endRow}/>
        </div>
    );
};

export default Border;