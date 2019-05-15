import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {updateTableCells} from "../../../store/actions/tableActions";

const BooleanOption = ({table, focusedTableCells, updateTableCells, cols, rows, optionName, optionText}) => {
    const [selected, setSelected] = useState(false);
    const option = React.createRef();
    
    useEffect(() => {
        if(focusedTableCells.length === 0){
            option.current.classList.remove("selected");
            return;
        }
        const {row, col} = focusedTableCells[0]
        if(row >= rows || col >= cols) return;

        const isSelected = table[focusedTableCells[0].row][focusedTableCells[0].col][optionName]
        if(isSelected) {
            option.current.classList.add("selected");
            setSelected(true);
        }else {
            option.current.classList.remove("selected");
            setSelected(false);
        }
    }, [focusedTableCells, cols, rows]);

    const handleClick = () => {
        if(focusedTableCells.length === 0) return;

        option.current.classList.toggle("selected");
        setSelected(!selected);
        const updateObject = {};
        updateObject[optionName] = !selected;
        updateTableCells(updateObject);
    };

    return (
        <div className="option" onClick={handleClick} ref={option}> 
            <h4>{optionText}</h4>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        table: state.table.table,
        focusedTableCells: state.focus.focusedTableCells,
        rows: state.display.rows,
        cols: state.display.cols
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCells: property => dispatch(updateTableCells([], property))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanOption);