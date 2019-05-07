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
            text: ""
        }
    }
    componentDidMount(){
        this.setState({text: this.props.data.text});
        this.setupValign();
    }
    componentDidUpdate(){
        if(this.state.text !== this.props.data.text){
            this.setState({text: this.props.data.text});
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
            alignItems: valign
        };
        const textareaStyle = {
            textAlign: align,
            fontWeight: (bold? "bold" : "normal"),
            textDecoration: (underline ? "underline" : "none"),
            fontStyle: (italic ? "italic" : "normal"),
            backgroundColor: backgroundColor,
            color: fontColor
        };
        return (
            <div className={parentClass} onClick={handleClick} style={parentStyle}>
                <TextareaAutosize
                    ref={textarea}
                    onChange={handleChange}
                    value={text}
                    style={textareaStyle}
                />   
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