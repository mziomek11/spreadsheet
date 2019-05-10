import React, {Component} from "react";
import {connect} from "react-redux";
import {updateTableCells, setTableCells, setFocusRectData} from "../../../store/actions/sheetActions";
import TextareaAutosize from 'react-autosize-textarea';

class TableElement extends Component{
    constructor(props){
        super(props);
        this.textarea = React.createRef();
        this.state = {
            valign: "",
            text: "",
            textareaChanged: false
        }
    }
    componentDidMount(){
        const {text, backgroundColor} = this.props.data;
        this.setState({text, backgroundColor});
        this.setupValign();
    }
    componentDidUpdate(){
        const {text} = this.props.data;
        if(this.state.text !== text){
            if(this.state.textareaChanged){
                this.setState({textareaChanged: false});
                setTimeout(() => {
                    this.textarea.current.focus();
                }, 50)
            }
            this.setState({text});
        }
        this.setupValign();
    };
    setupValign = () => {
        let newValign = this.props.data.valign;
        const textHeight = this.textarea.current.offsetHeight;
        if  (textHeight > this.props.height && this.props.data.text) {
            newValign = "flex-start";
        }
        if(newValign !== this.state.valign){
            this.setState({valign: newValign});
        }
    };
    handleClick = e => {
        const {setTableCells, focusedTableCells, col, row} = this.props;
        if(e.ctrlKey) {
            const removing = focusedTableCells.filter(cell => cell.row === row && cell.col === col).length > 0; 

            if(removing){
                const newTableCells = focusedTableCells.filter((cell) => !(cell.row === row && cell.col === col));
                setTableCells(newTableCells);
            }else {
                setTableCells([...focusedTableCells, {col, row}]);
            }
        } else {
            this.textarea.current.focus();
            setTableCells([{col, row}]);
        }
    };
    handleChange = ({target}) => {
        if(target.className === "no-resize" || !target.value){
            this.setState({textareaChanged: true});
        }

        const {updateTableCells, col, row} = this.props;
        updateTableCells([{col, row}], {text: target.value});
    };
    handleMouseDown = e => {
        if(!this.props.isFocused){
            this.handleClick(e);
            this.props.setFocusRectData({start: {
                row: this.props.row,
                col: this.props.col
            }});
        };
    };
    handleMouseEnter = e => {
        if(this.props.rectFocusData.start.row !== -1){
            this.props.setFocusRectData({end: {
                row: this.props.row,
                col: this.props.col
            }});
        };
    };
    handleMouseUp = e => {
        const {start, end} = this.props.rectFocusData;
        if(start.row !== -1 && end.row !== -1){
            const startFocusCol = Math.min(start.col, end.col);
            const endFocusCol = Math.max(start.col, end.col);
            const startFocusRow = Math.min(start.row, end.row);
            const endFocusRow = Math.max(start.row, end.row);
            const focusArray = [];
            for(let row = startFocusRow; row <= endFocusRow; row++){
                for(let col = startFocusCol; col <= endFocusCol; col++){
                    focusArray.push({row, col})
                }
            }
            if(e.ctrlKey){
                this.props.setTableCells([...this.props.focusedTableCells, ...focusArray])
            }else{
                this.props.setTableCells(focusArray)
            }
        };
        this.props.setFocusRectData({
            start: {
                row: -1,
                col: -1
            },
            end: {
                row: -1,
                col: -1
            }
        });
    }
    render(){
        const {handleClick, handleMouseEnter, handleMouseUp, handleMouseDown, handleChange, textarea, props, state} = this;
        const {data, width, height, isFocused, isPseudoFocused} = props;
        const {valign, text} = state;
        const {align, bold, underline, italic, backgroundColor, fontColor} = data;

        const parentClass = "table-element" + (isFocused || isPseudoFocused ? " focused" : "");
        const parentStyle = {
            cursor: this.props.isFocused ? "text" : "default",
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
            ref:textarea,
            onChange:handleChange,
            value:text,
            style:textareaStyle,
            spellCheck:false,
            disabled: !this.props.isFocused
        }
        return (
            <div 
                className={parentClass} 
                style={parentStyle} 
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
            >
                {isFocused ? <TextareaAutosize {...areaProps}/> : <textarea className="no-resize" {...areaProps}/>}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        focusedTableCells: state.sheet.actualSheet.focusedTableCells,
        rectFocusData: state.sheet.actualSheet.rectFocusData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTableCells: (cellArray, text) => dispatch(updateTableCells(cellArray, text)),
        setTableCells: cellsArray => dispatch(setTableCells(cellsArray)),
        setFocusRectData: focusRectData => dispatch(setFocusRectData(focusRectData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableElement);