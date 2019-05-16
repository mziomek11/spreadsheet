import React, {Component} from "react";
import {connect} from "react-redux";
import {isLetter, isArrowKey, isEnter} from "../../../helpers/inputHelpers";
import {getEndRow, getEndCol, getStartRow, getStartCol, getScrollHeight, getScrollWidth} from "../../../helpers/sheetHelpers";
import {setDisplayData} from "../../../store/actions/displayActions";
import {updateTableCells, resizeTable} from "../../../store/actions/tableActions";
import {setFocusRectData, setFocusedTableCells} from "../../../store/actions/focusActions";
import {removeDuplicates, filterObjects} from "../../../helpers/arrayHelpers";
import TextareaAutosize from 'react-autosize-textarea';

class TableElement extends Component{
    constructor(props){
        super(props);
        this.elementDiv = React.createRef();
        this.textContainer = React.createRef();
        this.state = {
            valign: "",
            text: ""
        }
    }
    componentDidMount(){
        const {text, backgroundColor} = this.props.data;
        this.setState({text, backgroundColor});
        this.setupValign();
    }
    componentDidUpdate(){
        const {focusedTableCells, col, row} = this.props;
        const {text} = this.props.data;
        if(this.state.text !== text){
            this.setState({text});
        };
        if(focusedTableCells.length === 1){
            if(focusedTableCells[0].col === col && focusedTableCells[0].row === row){
                const {endRow} = this.props.displayData;
                if(!this.elementDiv.current.matches(":focus") && !this.textContainer.current.matches(":focus") && row !== endRow - 1){
                    this.elementDiv.current.focus({
                        preventScroll: true
                    });
                }
                if(row === endRow - 1){
                    this.props.setDisplayData({endRow: endRow + 1})
                }
            }
        }
        this.setupValign();
    };
    handleChange = ({target}) => {
        const {updateTableCells, col, row} = this.props;
        updateTableCells([{col, row}], {text: target.value});
    };
    handleMouseDown = e => {
        const {setFocusedTableCells, focusedTableCells, col, row} = this.props;
        if(!e.ctrlKey && focusedTableCells.length === 1){
            if(row === focusedTableCells[0].row && col === focusedTableCells[0].col) return;
        }
        const adding = !this.props.isFocused || !e.ctrlKey
        this.props.setFocusRectData({...this.createFocusRectObj(true, true, true), adding});
        if(!e.ctrlKey){
            setFocusedTableCells([{col, row}]);
        }else {
            const filtered = focusedTableCells.filter((cell) => !(cell.row === row && cell.col === col));
            setFocusedTableCells([...filtered]);
        };
        if(this.selectedEndCol() && this.selectedEndRow()){
            this.increaseColsAndRows(1);
        }else {
            if(this.selectedEndCol()) this.increaseCols(1);
            if(this.selectedEndRow()) this.increaseRows(1);
        }
    };
    selectedEndCol = () => this.props.col === this.props.displayData.endCol - 1;
    selectedEndRow = () => this.props.row === this.props.displayData.endRow - 1;
    increaseCols = amount => {
        const {borderTop, displayData, resizeTable} = this.props;
        const {rows, endCol, cols, spreadsheetTop} = displayData;

        let newEndCol = endCol + amount;
        const newStartCol = getStartCol(newEndCol, borderTop);
        newEndCol = getEndCol(newStartCol, borderTop);
        const width = getScrollWidth(newStartCol, borderTop);

        let newCols = cols;
        if(newEndCol > cols){
            resizeTable(newEndCol, rows);
            newCols = newEndCol;
        } 
        this.props.setDisplayData({
            abandonScrollEvent: true
        });

        this.props.setDisplayData({
            startCol: newStartCol,
            cols: newCols,
            endCol: newEndCol,
            lastScrollX: width
        });                

        window.scrollTo(width, spreadsheetTop);
    };
    decreaseCols = amount => {
        const {borderTop, displayData} = this.props;
        const {startCol, spreadsheetTop} = displayData;
        const newStartCol = startCol < amount ? 0 : startCol - amount;
        const newEndCol = getEndCol(newStartCol, borderTop);
        const width = getScrollWidth(newStartCol, borderTop);
        this.props.setDisplayData({
            abandonScrollEvent: true
        });

        window.scrollTo(width, spreadsheetTop);
        this.props.setDisplayData({
            startCol: newStartCol,
            endCol: newEndCol,
            lastScrollX: width
        });
    }
    increaseRows = amount => {
        const {borderLeft, resizeTable} = this.props;
        const {rows, cols, lastScrollX, endRow} = this.props.displayData;
        let newEndRow = endRow + amount;
        const newStartRow = getStartRow(newEndRow, borderLeft);
        newEndRow = getEndRow(newStartRow, borderLeft);
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
    descreaseRows = amount => {
        const {borderLeft, displayData} = this.props;
        const {startRow, lastScrollX} = displayData;
        const newStartRow = startRow < amount ? 0 : startRow - amount;
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
    increaseColsAndRows = amount => {
        const {borderTop, borderLeft, displayData, resizeTable} = this.props;
        const {startRow, rows, startCol, cols} = displayData;

        const newStartCol = startCol + amount;
        const newEndCol = getEndCol(newStartCol, borderTop)
        const width = getScrollWidth(newStartCol, borderTop);

        const newStartRow = startRow + amount;
        const newEndRow = getEndRow(newStartRow, borderLeft)
        const height = getScrollHeight(newStartRow, borderLeft);

        let newCols = cols;
        let newRows = rows;

        if(newEndCol > cols || newEndRow > rows){

            resizeTable(newEndCol, newEndRow);
            newCols = newEndCol;
            newRows = newEndRow;
        } 
        this.props.setDisplayData({
            abandonScrollEvent: true
        });

        this.props.setDisplayData({
            startCol: newStartCol,
            endCol: newEndCol,
            cols: newCols,
            startRow: newStartRow,
            endRow: newEndRow,
            rows: newRows,
            lastScrollX: width,
            spreadsheetTop: height,
            startSpreadsheetTop: height,
            spreadsheetHeight: 0
        });                
        
        window.scrollTo(width, height);
    }
    handleMouseEnter = e => {
        const {start} = this.props.rectFocusData;
        if(start.row !== -1){
            this.props.setFocusRectData(this.createFocusRectObj(false, true, true));
            if(this.selectedEndCol() && this.selectedEndRow()){
                this.increaseColsAndRows(1);
            }else {
                if(this.selectedEndCol()) this.increaseCols(1);
                if(this.selectedEndRow()) this.increaseRows(1);
            }
        };
    };
    handleMouseUp = e => {
        const {start, end, adding} = this.props.rectFocusData;
        if(start.row !== -1 && end.row !== -1){
            const focusArray = this.createFocusArray(start, end);
            this.setFocusRect(focusArray, e.ctrlKey, adding);
        };
        this.props.setFocusRectData(this.createFocusRectObj(true, true, false));
    };
    createFocusRectObj = (useStart, useEnd, useActualData) => {
        const col = useActualData ? this.props.col : -1;
        const row = useActualData ? this.props.row : -1;
        const focusObj = {};
        if(useStart){
            focusObj["start"] = {col, row};
        }
        if(useEnd){
            focusObj["end"] = {col, row};
        }
        return focusObj;
    }
    setFocusRect = (focusArray, ctrlKey, adding) => {
        if(ctrlKey){
            if(adding){
                const cellsWithDuplicates = [...this.props.focusedTableCells, ...focusArray];
                const cellWithoutDuplicates = removeDuplicates(cellsWithDuplicates);
                this.props.setFocusedTableCells(cellWithoutDuplicates);
            }else {
                const filteredCells = filterObjects(this.props.focusedTableCells, focusArray);
                this.props.setFocusedTableCells(filteredCells);
            }
        }else this.props.setFocusedTableCells(focusArray)
    }
    createFocusArray = (start, end) => {
        const startFocusCol = Math.min(start.col, end.col);
        const endFocusCol = Math.max(start.col, end.col);
        const startFocusRow = Math.min(start.row, end.row);
        const endFocusRow = Math.max(start.row, end.row);
        const focusArray = [];
        for(let row = startFocusRow; row <= endFocusRow; row++){
            for(let col = startFocusCol; col <= endFocusCol; col++){
                focusArray.push({col, row})
            }
        }
        return focusArray;
    };
    setupValign = () => {
        if(this.textContainer.current.tagName !== "TEXTAREA") return;

        let newValign = this.props.data.valign;
        const textHeight = this.textContainer.current.offsetHeight;
        if  (textHeight > this.props.height && this.props.data.text) {
            newValign = "flex-start";
        }
        if(newValign !== this.state.valign){
            this.setState({valign: newValign});
        }
    };
    handleKeyDown = e => {
        const {row, col, focusedTableCells, updateTableCells, setFocusedTableCells} = this.props;
        if(e.ctrlKey) return;
        if(this.shouldMoveFocus(e)){
            e.preventDefault();
            setFocusedTableCells([this.getFocusPosition(e.key)]);
        }
        else if(focusedTableCells.length !== 1) return;
        else if(this.textContainer.current.matches(":focus")){
            if(isEnter(e)){
                setFocusedTableCells([this.getFocusPosition("ArrowDown")]);
            }
        }
        else if(!isLetter(e)) return;
        else {
            updateTableCells([{col, row}], {text: this.props.data.text});
            this.textContainer.current.focus();
        }
    };
    shouldMoveFocus = e => {
        const isTextContainerFocused = this.textContainer.current.matches(":focus");
        const isFocusListEmpty = this.props.focusedTableCells.length === 0;
        return isArrowKey(e) && !isTextContainerFocused && !isFocusListEmpty;
    };
    moveFocusRight = () => {
        const {col, row, displayData} = this.props;
        if(col === displayData.endCol - 2) this.increaseCols(1);
        return  {col: col + 1, row};
    };
    moveFocusLeft = () => {
        const {col, row, displayData} = this.props;
        if (col <= 0) return {col, row};
        if(col === displayData.startCol) this.decreaseCols(1);
        return  {col: col - 1, row};
    };
    moveFocusDown = () => {
        const {row, col, displayData} = this.props;
        if(row === displayData.endRow - 2) this.increaseRows(1);
        return {col, row: row + 1}
    };
    moveFocusUp = () => {
        const {row, col, displayData} = this.props;
        if (row <= 0) return {col, row};
        if(row === displayData.startRow) this.descreaseRows(1);
        return  {col, row: row - 1};
    };
    getFocusPosition = arrowPressed => {
        switch(arrowPressed){
            case "ArrowRight":
                return this.moveFocusRight();
            case "ArrowLeft":
                return this.moveFocusLeft();
            case "ArrowDown":
                return this.moveFocusDown();
            case "ArrowUp":
                return this.moveFocusUp();
            default:
                return {col: this.props.col, row: this.props.row};
        }
    };
    shouldShowTextarea = () => {
        const {isFocused, focusedTableCells, rectFocusData} = this.props;
        const shouldShow = isFocused && focusedTableCells.length === 1 && rectFocusData.start.row === -1;
        return shouldShow;
    };
    getParentClass = () => {
        const {isFocused, isPseudoFocused, rectFocusData} = this.props;
        let shouldHaveFocusStyle = false;
        if((isFocused && !isPseudoFocused) || (isPseudoFocused && rectFocusData.adding)){
            shouldHaveFocusStyle = true;
        }
        return "table-element" + (shouldHaveFocusStyle ? " focused" : "");
    }
    getCursor = () => {
        const {isFocused, focusedTableCells} = this.props;
        return isFocused && focusedTableCells.length === 1 ? "text" : "default"
    };
    render(){
        const {handleMouseEnter, handleMouseUp, handleMouseDown, handleChange, textContainer} = this;
        const {data, width, height, isFocused} = this.props;
        const {valign, text} = this.state;
        const {align, bold, underline, italic, backgroundColor, fontColor} = data;
        const showTextArea = this.shouldShowTextarea();

        const parentClass = this.getParentClass();
        const parentStyle = {
            cursor: this.getCursor(),
            width: width, 
            height: height,
            alignItems: valign,
            backgroundColor: backgroundColor,
        };
        const textareaStyle = {
            textAlign: align,
            fontWeight: (bold? "bold" : "normal"),
            textDecoration: (underline ? "underline" : "none"),
            fontStyle: (italic ? "italic" : "normal"),
            color: fontColor
        };
        const areaProps = {
            ref: textContainer,
            onChange: handleChange,
            value: text,
            style: textareaStyle,
            spellCheck: false,
            disabled: !isFocused
        };
        const paragraphProps = {
            ref: textContainer, 
            style: textareaStyle,
        };
        return (
            <div 
                className={parentClass} 
                style={parentStyle} 
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
                tabIndex={-1}
                onKeyDown={this.handleKeyDown}
                ref={this.elementDiv}
            >
                {showTextArea ? 
                    <TextareaAutosize {...areaProps}/> : 
                    <p {...paragraphProps}>{text}</p>
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        focusedTableCells: state.focus.focusedTableCells,
        rectFocusData: state.focus.rectFocusData,
        displayData: state.display,
        borderLeft: state.border.borderLeft,
        borderTop: state.border.borderTop
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCells: (cellArray, property) => dispatch(updateTableCells(cellArray, property)),
        setFocusedTableCells: cellsArray => dispatch(setFocusedTableCells(cellsArray)),
        setFocusRectData: (focusRectData, adding) => dispatch(setFocusRectData(focusRectData, adding)),
        setDisplayData: data => dispatch(setDisplayData(data)),
        resizeTable: (cols, rows) => dispatch(resizeTable(cols, rows))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableElement);