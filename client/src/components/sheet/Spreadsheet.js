import React, {Component} from "react";
import {connect} from "react-redux";
import {setDisplayData} from "../../store/actions/displayActions";
import {setFocusedTableCells} from "../../store/actions/focusActions";
import {makeBorderResizedFalse} from "../../store/actions/borderActions";
import {setIsInSheet} from "../../store/actions/sheetActions";
import {handleCopy, handlePaste} from "../../store/actions/shortcutActions";
import {resizeTable, updateTableCells} from "../../store/actions/tableActions";
import {isArrowKey, isLetter} from "../../helpers/inputHelpers";
import {getEndRow, getScrollHeight} from "../../helpers/sheetHelpers";
import {DEFAUTLT_CELL_WIDTH, DEFAUTLT_CELL_HEIGHT, TOOLBAR_HEIGHT, CELLS_PER_WHEEL, CORNER_SIZE} from "../../config";
import Toolbar from "../headers/toolbar/Toolbar";
import Border from "./border/Border";
import Table from "./table/Table";
import "../../css/spreadsheet/spreadsheet.css";

class Spreadsheet extends Component{
    state = {
        loading: true
    };
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
        window.addEventListener("keydown", this.handleKeyDown);
        window.scrollTo(0, 0);
        this.calculateRowsAndCols();
        this.props.setDisplayData({loading: false});
        console.log("poprawic performance wklejania");
        console.log("poprawic performace scroloowania/wheelowania");
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
        this.props.setDisplayData({
            endRow: rowsInWindow,
            endCol: colsInWindow,
            rows: rowsInWindow,
            cols: colsInWindow,
        });
        this.props.resizeTable(colsInWindow, rowsInWindow, true);
        this.props.setIsInSheet(true);
    };
    componentDidUpdate(){
        if(this.props.borderResized){
            const {topResized, makeBorderResizedFalse, resizeTable, borderLeft, borderTop} = this.props;
            const {startRow, rows, startCol, cols} = this.props.displayData;
            if(topResized){
                let space = window.innerWidth - CORNER_SIZE;
                let newEndCol = startCol;
                let newCols = cols;
                while(space > 0){
                    space -= borderTop[newEndCol];
                    newEndCol++;
                }
                if(newEndCol > cols){
                    resizeTable(newEndCol, rows);
                    newCols = newEndCol;
                }
                this.props.setDisplayData({
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
                    resizeTable(cols, newEndRow);
                    newRows = newEndRow;
                }
                this.props.setDisplayData({
                    rows: newRows,
                    endRow: newEndRow
                });
            }
            makeBorderResizedFalse();
        }
    };
    handleKeyDown = e => {
        const {tagName} = document.activeElement;
        if(isArrowKey(e) && tagName === "BODY"){
            e.preventDefault();
        };
        if(e.ctrlKey && isLetter(e) && tagName !== "TEXTAREA" && this.props.focusedTableCells.length > 0) 
            this.handleShorcut(e.key.toUpperCase());
    };
    handleShorcut = key => {
        const {handleCopy, handlePaste} = this.props;
        switch(key){
            case "C": 
                handleCopy();
                break;
            case "V":
                handlePaste();
                break;
            default:
                break;
        }
    };
    handleWheel = e => {
        e.preventDefault();
        if(e.deltaY < 0){
            if(this.props.displayData.startRow > 0)
                this.wheelUp();
        }
        else 
            this.wheelDown();
    };
    wheelUp = () => {
        const {startRow, lastScrollX} = this.props.displayData;
        const {borderLeft} = this.props;

        const newStartRow = startRow < CELLS_PER_WHEEL ? 0 : startRow - CELLS_PER_WHEEL;
        const newEndRow = getEndRow(newStartRow, borderLeft);
        const height = getScrollHeight(newStartRow, borderLeft);

        this.props.setDisplayData({
            abandonScrollEvent: true
        });

        window.scrollTo(lastScrollX, height);
        this.props.setDisplayData({
            startRow: newStartRow,
            endRow: newEndRow,
            spreadsheetTop: height,
            startSpreadsheetTop: height,
            spreadsheetHeight: 0
        });
    };
    wheelDown = () => {
        const {rows, startRow, cols, lastScrollX} = this.props.displayData;
        const {borderLeft, resizeTable} = this.props;

        const newStartRow = startRow + CELLS_PER_WHEEL;
        const newEndRow = getEndRow(newStartRow, borderLeft)
        const height = getScrollHeight(newStartRow, borderLeft);

        let newRows = rows;
        if(newEndRow > rows){
            resizeTable(cols, newEndRow);
            newRows = newEndRow;
        } 

        this.props.setDisplayData({
            abandonScrollEvent: true
        });

        this.props.setDisplayData({
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
        //document.activeElement.blur();
        if(this.props.displayData.abandonScrollEvent){
            this.props.setDisplayData({abandonScrollEvent: false});
            return;
        }
        const {rows, startSpreadsheetTop, cols} = this.props.displayData;
        const {borderLeft, borderTop, resizeTable} = this.props;

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
            resizeTable(newCols, newRows);
        }

        this.props.setDisplayData({
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
        const {isInSheet, loading} = this.props;
        if(!isInSheet || loading){
            return null;
        }
        const {startRow, endRow, startCol, endCol, lastScrollX, spreadsheetHeight, spreadsheetTop, } = this.props.displayData;

        const rowColProps = {startRow, endRow, startCol, endCol};
        return (
            <div className="spreadsheet" style={{
                top: spreadsheetTop + TOOLBAR_HEIGHT,
                height: (window.innerHeight * 2 + spreadsheetHeight) + "px",
                width: (window.innerWidth * 2 + lastScrollX).toString() + "px"
            }}>
                <Toolbar />
                <Border {...rowColProps} scrollX={lastScrollX} />
                <Table {...rowColProps} scrollX={lastScrollX} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isInSheet: state.sheet.isInSheet,
        displayData: state.display,
        borderTop: state.border.borderTop,
        borderLeft: state.border.borderLeft,
        borderResized: state.border.borderResized,
        topResized: state.border.topResized,
        focusedTableCells: state.focus.focusedTableCells
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIsInSheet: isInSheet => dispatch(setIsInSheet(isInSheet)),
        resizeTable: (cols, rows, makeBigger) => dispatch(resizeTable(cols, rows)),
        makeBorderResizedFalse: () => dispatch(makeBorderResizedFalse()),
        setFocusedTableCells: cellsArray => dispatch(setFocusedTableCells(cellsArray)),
        updateTableCells: (cellArray, property) => dispatch(updateTableCells(cellArray, property)),
        setDisplayData: data => dispatch(setDisplayData(data)),
        handleCopy: () => dispatch(handleCopy()),
        handlePaste: () => dispatch(handlePaste())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);