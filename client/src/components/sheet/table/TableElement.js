import React, {Component} from "react";
import {connect} from "react-redux";
import {updateTableCell, setTableCell} from "../../../store/actions/sheetActions";
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
    }
    setupValign = () => {
        let newValign = this.props.data.valign;
        const textHeight = this.textarea.current.offsetHeight;
        if  (textHeight > this.props.height && this.props.data.text) {
            newValign = "flex-start";
        }
        if(newValign !== this.state.valign){
            this.setState({valign: newValign});
        }
    }
    handleClick = () => {
        const {setTableCell, col, row} = this.props;
        this.textarea.current.focus();
        setTableCell(col, row);
    };
    handleChange = ({target}) => {
        if(target.className === "no-resize" || !target.value){
            this.setState({textareaChanged: true});
        }

        const {updateTableCell, col, row} = this.props;
        updateTableCell(col, row, {text: target.value});
    };
    render(){
        const {handleClick, handleChange, textarea, props, state} = this;
        const {data, width, height, isFocused} = props;
        const {valign, text} = state;
        const {align, bold, underline, italic, backgroundColor, fontColor} = data;

        const parentClass = "table-element" + (isFocused ? " focused" : "");
        const parentStyle = {
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
            spellCheck:false
        }
        return (
            <div className={parentClass} onClick={handleClick} style={parentStyle}>
                {text ? <TextareaAutosize {...areaProps}/> : <textarea className="no-resize" {...areaProps}/>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTableCell: (col, row, text) => dispatch(updateTableCell(col, row, text)),
        setTableCell: (col, row) => dispatch(setTableCell(col, row))
    }
}

export default connect(null, mapDispatchToProps)(TableElement);