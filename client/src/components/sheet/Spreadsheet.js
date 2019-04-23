import React, {Component} from "react";
import {connect} from "react-redux";
import {setIsInSheet, resizeSheet} from "../../store/actions/sheetActions";
import {sumElements} from "../../helpers/arrayHelpers";
import {DEFAUTLT_CELL_WIDTH, DEFAUTLT_CELL_HEIGHT, TOOLBAR_HEIGHT, CELLS_PER_WHEEL, CORNER_SIZE} from "../../config";
import Toolbar from "../headers/Toolbar";
import Border from "./border/Border";
import Table from "./table/Table";
import "../../css/spreadsheet/spreadsheet.css";

class Spreadsheet extends Component{
    state = {
        rows: 0,
        cols: 0,
        startRow: 0,
        endRow: 0,
        startCol: 0,
        endCol: 0,
        lastScrollY: 0,
        lastScrollX: 0
    }
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
        window.scrollTo(0, 0);
        this.calculateRowsAndCols();
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.handleWheel);
        this.props.setIsInSheet(false);
    }
    calculateRowsAndCols(){
        const rowsInWindow = Math.ceil((window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE) / DEFAUTLT_CELL_HEIGHT);
        const colsInWindow = Math.ceil((window.innerWidth - CORNER_SIZE) / DEFAUTLT_CELL_WIDTH);
        this.setState({
            endRow: rowsInWindow,
            endCol: colsInWindow,
            rows: rowsInWindow,
            cols: colsInWindow
        });
        this.props.resizeSheet(colsInWindow, rowsInWindow, true);
        this.props.setIsInSheet(true);
    }
    handleWheel = e => {
        e.preventDefault();
        const {rows, startRow, endRow, cols, lastScrollY, lastScrollX} = this.state;
        const {borderLeft, resizeSheet} = this.props;
        let newRows = rows, newStartRow = startRow, newEndRow = endRow;
        let scrollAmout = 0;

        if(e.deltaY < 0){
            if(startRow >= CELLS_PER_WHEEL){
                scrollAmout = -sumElements(borderLeft, startRow, CELLS_PER_WHEEL);
                newStartRow -= CELLS_PER_WHEEL;
                newEndRow -= CELLS_PER_WHEEL;
            }
        } else{
            scrollAmout = sumElements(borderLeft, endRow - CELLS_PER_WHEEL, CELLS_PER_WHEEL)
            newStartRow += CELLS_PER_WHEEL;
            newEndRow += CELLS_PER_WHEEL;
            if(newEndRow > rows){
                newRows += CELLS_PER_WHEEL;
                resizeSheet(cols, newEndRow);
            }
        }
        window.scrollTo(lastScrollX, lastScrollY + scrollAmout);
        this.setState({
            rows: newRows,
            startRow: newStartRow,
            endRow: newEndRow,
            lastScrollY: window.scrollY,
        });
    }
    handleScroll = e => {
        // const {rows, cols, startRow, startCol, endRow, endCol, lastScrollY, lastScrollX, lastScrollAmout} = this.state;
        // let newRows = rows;
        // let newCols = cols;
        // let newStartRow = startRow, newStartCol = startCol, newEndRow = endRow, newEndCol = endCol;

        // const {borderLeft} = this.props;
        // let scrollAmout = 0;
        // if(window.scrollY < lastScrollY){
        //     scrollAmout = -(borderLeft[startRow] + borderLeft[startRow + 1] + borderLeft[startRow + 2]);
        //     newStartRow -= 3;
        //     newEndRow -= 3;
        // }else if (window.scrollY  > lastScrollY){
        //     newStartRow += 3;
        //     newEndRow += 3;
        //     scrollAmout = borderLeft[endRow - 1] + borderLeft[endRow - 2] + borderLeft[endRow - 3];
        //     if(newEndRow > rows){
        //         newRows += 3;
        //         this.props.resizeSheet(cols, newEndRow);
        //     }
        // }
        // if(scrollAmout !== 0){
        //     console.log(lastScrollY + scrollAmout)
        //     window.scrollTo(lastScrollX, Math.max(0, lastScrollY + scrollAmout));
        //     this.setState({
        //         rows: newRows,
        //         cols: newCols,
        //         startRow: newStartRow,
        //         endRow: newEndRow,
        //         lastScrollY: window.scrollY,
        //         lastScrollX: window.scrollX,
        //         lastScrollAmout: scrollAmout
        //     });
        // }
    }
    render(){
        if(!this.props.isInSheet){
            return null;
        }

        return (
            <div className="spreadsheet" style={{
                top: this.state.lastScrollY + TOOLBAR_HEIGHT,
                height: window.innerHeight + 100
            }}>
                <Toolbar />
                <Border 
                    startRow={this.state.startRow} 
                    endRow={this.state.endRow} 
                    startCol={this.state.startCol} 
                    endCol={this.state.endCol}
                />
                <Table
                    startRow={this.state.startRow} 
                    endRow={this.state.endRow} 
                    startCol={this.state.startCol} 
                    endCol={this.state.endCol} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isInSheet: state.sheet.isInSheet,
        borderTop: state.sheet.actualSheet.borderTop,
        borderLeft: state.sheet.actualSheet.borderLeft
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIsInSheet: isInSheet => dispatch(setIsInSheet(isInSheet)),
        resizeSheet: (cols, rows, makeBigger) => dispatch(resizeSheet(cols, rows))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);