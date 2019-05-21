import React, {Component} from "react";
import {CORNER_SIZE, TOOLBAR_HEIGHT} from "../../../config";

class Corner extends Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return (
            <div className="border-corner" style={{
                width: CORNER_SIZE,
                height: CORNER_SIZE,
                top: TOOLBAR_HEIGHT
            }} />
        );
    };
};

export default Corner;