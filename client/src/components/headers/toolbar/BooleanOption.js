import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {updateTableCell} from "../../../store/actions/sheetActions";

const Bold = ({table, actualTableCell, updateTableCell, optionName, optionText}) => {
    const [selected, setSelected] = useState(false);
    const option = React.createRef();
    
    useEffect(() => {
        const {row, col} = actualTableCell;
        if(row === -1 && col === -1){
            option.current.classList.remove("selected");
            return;
        }

        const isSelected = table[row][col][optionName]
        if(isSelected) {
            option.current.classList.add("selected");
            setSelected(true);
        }else {
            option.current.classList.remove("selected");
            setSelected(false);
        }
    }, [actualTableCell]);

    const handleClick = () => {
        const {row, col} = actualTableCell
        if(row === -1 && col === -1) return;

        option.current.classList.toggle("selected");
        setSelected(!selected);
        const updateObject = {};
        updateObject[optionName] = !selected;
        updateTableCell(updateObject);
    };

    return (
        <div className="option" onClick={handleClick} ref={option}> 
            <h4>{optionText}</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bold);