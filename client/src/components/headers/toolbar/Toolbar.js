import React from "react";
import {TOOLBAR_HEIGHT} from "../../../config";
import BooleanOption from "./BooleanOption";
import Aligment from "./Aligment";
import VerticalAligment from "./VerticalAligment";

const Toolbar = () => {
    return (
        <div className="toolbar" style={{height: TOOLBAR_HEIGHT}}>
            <Aligment />
            <VerticalAligment />
            <BooleanOption optionName="bold" optionText="B"/>
            <BooleanOption optionName="italic" optionText="I"/>
            <BooleanOption optionName="underline" optionText="U"/>
        </div>
    )
}

export default Toolbar;