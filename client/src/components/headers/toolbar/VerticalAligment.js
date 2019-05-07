import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateTableCell} from "../../../store/actions/sheetActions";

const VerticalAligmnent = ({table, actualTableCell, updateTableCell}) => {
    const container = React.createRef();
    
    useEffect(() => {
        const {row, col} = actualTableCell;
        if(row === -1 && col === -1){
            container.current.childNodes.forEach(option => option.classList.remove("selected"));
            return;
        }
        
        const {valign} = table[actualTableCell.row][actualTableCell.col];
        container.current.childNodes.forEach(option => {
            if(option.id !== `valign-${valign}`) option.classList.remove("selected");
            else option.classList.add("selected");
        });
    }, [actualTableCell]);

    const handleClick = ({currentTarget}) => {
        const {row, col} = actualTableCell
        if(row === -1 && col === -1) return;

        currentTarget.classList.add("selected");
        container.current.childNodes.forEach(option => {
            if(option.id !== currentTarget.id)
            option.classList.remove("selected");
        });
        const valign = currentTarget.id.substring(7, currentTarget.id.length);
        updateTableCell({valign});
    };

    return (
        <div className="options" ref={container}>
            <div className="option" id="valign-flex-start" onClick={handleClick}>
                <h4>T</h4>
            </div>
            <div className="option" id="valign-center" onClick={handleClick}>
                <h4>C</h4>
            </div>
            <div className="option" id="valign-flex-end" onClick={handleClick}> 
                <h4>B</h4>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        table: state.sheet.actualSheet.table,
        actualTableCell: state.sheet.actualSheet.actualTableCell
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCell: property => dispatch(updateTableCell(null, null, property))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalAligmnent);