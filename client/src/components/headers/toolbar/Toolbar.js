import React from "react";
import {TOOLBAR_HEIGHT} from "../../../config";
import BooleanOption from "./BooleanOption";
import ColorOption from "./ColorOption";
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
            <ColorOption optionName="backgroundColor" optionText="BC" startColor="#ffffff"/>
            <ColorOption optionName="fontColor" optionText="FC" startColor="#000000"/>
        </div>
    )
}

export default Toolbar;