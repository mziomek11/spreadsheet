import React, {Component} from "react";
import {connect} from "react-redux";
import {setIsInSheet, resizeSheet, makeBorderResizedFalse} from "../../store/actions/sheetActions";
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
        lastScrollX: 0,
        spreadsheetTop: 0,
        startSpreadsheetTop: 0,
        spreadsheetHeight: 0,
        abandonScrollEvent: true,
        loading: true
    };
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
        window.addEventListener("keydown", this.handleKeyDown);
        window.scrollTo(0, 0);
        this.calculateRowsAndCols();
        this.setState({loading: false});
    };
    
    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.handleWheel);
        window.removeEventListener("keydown", this.handleKeyDown);
        this.props.setIsInSheet(false);
    };
    calculateRowsAndCols = () => {
        const rowsInWindow = Math.ceil((window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE) / DEFAUTLT_CELL_HEIGHT);
        const colsInWindow = Math.ceil((window.innerWidth - CORNER_SIZE) / DEFAUTLT_CELL_WIDTH);
        this.setState({
            endRow: rowsInWindow,
            endCol: colsInWindow,
            rows: rowsInWindow,
            cols: colsInWindow,
        });
        this.props.resizeSheet(colsInWindow, rowsInWindow, true);
        this.props.setIsInSheet(true);
    };
    componentDidUpdate(){
        if(this.props.borderResized){
            const {topResized, makeBorderResizedFalse, resizeSheet, borderLeft, borderTop} = this.props;
            const {startRow, rows, startCol, cols} = this.state;
            if(topResized){
                let space = window.innerWidth - CORNER_SIZE;
                let newEndCol = startCol;
                let newCols = cols;
                while(space > 0){
                    space -= borderTop[newEndCol];
                    newEndCol++;
                }
                if(newEndCol > cols){
                    resizeSheet(newEndCol, rows);
                    newCols = newEndCol;
                }
                this.setState({
                    cols: newCols,
                    endCol: newEndCol
                });
            }else {
                let space = window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE;
                let newEndRow = startRow;
                let newRows = rows;
                while(space > 0){
                    space -= borderLeft[newEndRow];
                    newEndRow++;
                }
                if(newEndRow > rows){
                    resizeSheet(cols, newEndRow);
                    newRows = newEndRow;
                }
                this.setState({
                    rows: newRows,
                    endRow: newEndRow
                });
            }
            makeBorderResizedFalse();
        }
    };
    handleKeyDown = e => {
        if(e.keyCode < 37 || e.keyCode > 40 || document.activeElement.tagName !== "BODY") 
            return;

        e.preventDefault();
    };
    handleWheel = e => {
        e.preventDefault();
        if(e.deltaY < 0){
            if(this.state.startRow > 0)
                this.wheelUp();
        }
        else 
            this.wheelDown();
    };
    wheelUp = () => {
        const {startRow, lastScrollX} = this.state;
        const {borderLeft} = this.props;
        const newStartRow = startRow < CELLS_PER_WHEEL ? 0 : startRow - CELLS_PER_WHEEL;

        let space = window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE;
        let newEndRow = newStartRow;
        while(space > 0){
            space -= borderLeft[newEndRow];
            newEndRow++;
        };

        this.setState({
            abandonScrollEvent: true
        });

        let height = 0;
        for(let i = 0; i < newStartRow; i++){
            height += borderLeft[i];
        }

        window.scrollTo(lastScrollX, height);
        this.setState({
            startRow: newStartRow,
            endRow: newEndRow,
            spreadsheetTop: height,
            startSpreadsheetTop: height,
            spreadsheetHeight: 0
        });
    };
    wheelDown = () => {
        const {rows, startRow, cols, lastScrollX} = this.state;
        const {borderLeft, resizeSheet} = this.props;
        const newStartRow = startRow + CELLS_PER_WHEEL;

        let space = window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE;
        let newEndRow = newStartRow;
        let newRows = rows;
        while(space > 0){
            space -= borderLeft[newEndRow] ? borderLeft[newEndRow] : DEFAUTLT_CELL_HEIGHT;
            newEndRow++;
        }

        if(newEndRow > rows){
            resizeSheet(cols, newEndRow);
            newRows = newEndRow;
        } 

        this.setState({
            abandonScrollEvent: true
        });
        
        let height = 0;
        for(let i = 0; i < newStartRow; i++){
            height += borderLeft[i];
        }

        this.setState({
            rows: newRows,
            startRow: newStartRow,
            endRow: newEndRow,
            spreadsheetTop: height,
            startSpreadsheetTop: height,
            spreadsheetHeight: 0
        });
        window.scrollTo(lastScrollX, height);
    };
    handleScroll = e => {
        if(this.state.abandonScrollEvent){
            this.setState({abandonScrollEvent: false});
            return;
        }

        const {rows, startSpreadsheetTop, cols} = this.state;
        const {borderLeft, borderTop, resizeSheet} = this.props;

        //VERTICAL
        let newStartRow = 0, nearestRowValue = 999999, height = 0, addRow = false;
        for(let i = 0; i < borderLeft.length; i++){
            const value = Math.abs(height - window.scrollY);
            if(value < nearestRowValue){
                newStartRow = i;
                nearestRowValue = value;
            }else break;
            height += borderLeft[i];
        }

        let spaceY = window.innerHeight - TOOLBAR_HEIGHT - CORNER_SIZE;
        let newEndRow = newStartRow;
        let newRows = rows;
        while(spaceY > 0){
            spaceY -= borderLeft[newEndRow] ? borderLeft[newEndRow] : DEFAUTLT_CELL_HEIGHT;
            newEndRow++;
        }
        if(newEndRow > rows){
            addRow = true;
            newRows = newEndRow;
        }

        //  HORIZONTAL
        let newStartCol = 0, nearestColValue = 999999, width = 0, addCol = false;
        for(let i = 0; i < borderTop.length; i++){
            const value = Math.abs(width - window.scrollX);
            if(value <= nearestColValue){
                newStartCol = i;
                nearestColValue = value;
            }else break;
            width += borderTop[i];
        };

        let spaceX = window.innerWidth - CORNER_SIZE;
        let newEndCol = newStartCol;
        let newCols = cols;
        while(spaceX > 0){
            spaceX -= borderTop[newEndCol] ? borderTop[newEndCol] : DEFAUTLT_CELL_WIDTH;
            newEndCol++;
        }
        if(newEndCol > cols){
            addCol = true;
            newCols = newEndCol;
        }

        if(addRow || addCol){
            resizeSheet(newCols, newRows);
        }

        this.setState({
            rows: newRows,
            startRow: newStartRow,
            endRow: newEndRow,
            cols: newCols,
            startCol: newStartCol,
            endCol: newEndCol,
            lastScrollX: window.scrollX,
            spreadsheetTop: window.scrollY,
            spreadsheetHeight: startSpreadsheetTop -  window.scrollY
        });
    }
    render(){
        if(!this.props.isInSheet || this.state.loading){
            return null;
        }

        return (
            <div className="spreadsheet" style={{
                top: this.state.spreadsheetTop + TOOLBAR_HEIGHT,
                height: window.innerHeight + 20 + this.state.spreadsheetHeight
            }}>
                <Toolbar />
                <Border 
                    startRow={this.state.startRow} 
                    endRow={this.state.endRow} 
                    startCol={this.state.startCol} 
                    endCol={this.state.endCol}
                    scrollX={this.state.lastScrollX}
                />
                <Table
                    startRow={this.state.startRow} 
                    endRow={this.state.endRow} 
                    startCol={this.state.startCol} 
                    endCol={this.state.endCol} 
                    scrollX={this.state.lastScrollX}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isInSheet: state.sheet.isInSheet,
        borderTop: state.sheet.actualSheet.borderTop,
        borderLeft: state.sheet.actualSheet.borderLeft,
        borderResized: state.sheet.actualSheet.borderResized,
        topResized: state.sheet.actualSheet.topResized,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIsInSheet: isInSheet => dispatch(setIsInSheet(isInSheet)),
        resizeSheet: (cols, rows, makeBigger) => dispatch(resizeSheet(cols, rows)),
        makeBorderResizedFalse: () => dispatch(makeBorderResizedFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);