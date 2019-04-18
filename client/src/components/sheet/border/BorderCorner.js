import React from "react";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

const Corner = () => {
    return (
        <div className="border-corner" style={{
            width: CORNER_SIZE,
            height: CORNER_SIZE,
            top: TOOLBAR_HEIGHT
        }} />
    )
}

export default Corner;