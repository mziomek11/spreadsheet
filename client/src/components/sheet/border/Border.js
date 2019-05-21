import React, {Component} from "react";
import BorderCorner from "./BorderCorner";
import BorderTop from "./BorderTop";
import BorderLeft from "./BorderLeft";

class Border extends Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return (    
            <div className="border">
                <BorderCorner />
                <BorderTop />
                <BorderLeft />
            </div>
        );
    };
};

export default Border;