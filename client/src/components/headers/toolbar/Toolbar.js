import React from "react";
import {TOOLBAR_HEIGHT} from "../../../config";
import Aligment from "./Aligment";

const Toolbar = () => {
    return (
        <div className="toolbar" style={{height: TOOLBAR_HEIGHT}}>
            <Aligment />
        </div>
    )
}

export default Toolbar;