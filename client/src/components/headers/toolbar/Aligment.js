import React, {useEffect} from "react";
import {connect} from "react-redux";
import {updateTableCells} from "../../../store/actions/tableActions";

const Aligment = ({table, focusedTableCells, updateTableCells, cols, rows}) => {
    const container = React.createRef();
    
    useEffect(() => {
        if(focusedTableCells.length === 0){
            container.current.childNodes.forEach(option => option.classList.remove("selected"));
            return;
        }
        const {row, col} = focusedTableCells[0]
        if(row >= rows || col >= cols) return;
        
        const {align} = table[row][col];
        container.current.childNodes.forEach(option => {
            if(option.id !== `align-${align}`) option.classList.remove("selected");
            else option.classList.add("selected");
        });
    }, [focusedTableCells, rows, cols]);

    const handleClick = ({currentTarget}) => {
        if(focusedTableCells.length === 0) return;

        currentTarget.classList.add("selected");
        container.current.childNodes.forEach(option => {
            if(option.id !== currentTarget.id)
            option.classList.remove("selected");
        });
        const align = currentTarget.id.substring(6, currentTarget.id.length);
        updateTableCells({align});
    };

    return (
        <div className="options" ref={container}>
            <div className="option" id="align-left" onClick={handleClick}>
                <h4>AL</h4>
            </div>
            <div className="option" id="align-center" onClick={handleClick}>
                <h4>AC</h4>
            </div>
            <div className="option" id="align-right" onClick={handleClick}> 
                <h4>AR</h4>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Aligment);