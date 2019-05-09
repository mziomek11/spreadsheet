import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateTableCells} from "../../../store/actions/sheetActions";

const VerticalAligmnent = ({table, focusedTableCells, updateTableCells}) => {
    const container = React.createRef();
    
    useEffect(() => {
        if(focusedTableCells.length === 0){
            container.current.childNodes.forEach(option => option.classList.remove("selected"));
            return;
        }
        
        const {valign} = table[focusedTableCells[0].row][focusedTableCells[0].col];
        container.current.childNodes.forEach(option => {
            if(option.id !== `valign-${valign}`) option.classList.remove("selected");
            else option.classList.add("selected");
        });
    }, [focusedTableCells]);

    const handleClick = ({currentTarget}) => {
        if(focusedTableCells.length === 0) return;

        currentTarget.classList.add("selected");
        container.current.childNodes.forEach(option => {
            if(option.id !== currentTarget.id)
            option.classList.remove("selected");
        });
        const valign = currentTarget.id.substring(7, currentTarget.id.length);
        updateTableCells({valign});
    };

    return (
        <div className="options" ref={container}>
            <div className="option" id="valign-flex-start" onClick={handleClick}>
                <h4>VT</h4>
            </div>
            <div className="option" id="valign-center" onClick={handleClick}>
                <h4>VC</h4>
            </div>
            <div className="option" id="valign-flex-end" onClick={handleClick}> 
                <h4>VB</h4>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        table: state.sheet.actualSheet.table,
        focusedTableCells: state.sheet.actualSheet.focusedTableCells
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCells: property => dispatch(updateTableCells([], property))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalAligmnent);