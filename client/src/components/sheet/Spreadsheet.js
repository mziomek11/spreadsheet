import React, {Component} from "react";
import {connect} from "react-redux";
import {setIsInSheet, resizeSheet} from "../../store/actions/sheetActions";
import {DEFAUTLT_CELL_WIDTH, DEFAUTLT_CELL_HEIGHT} from "../../config";
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
        lastScrollY: 0
    }
    componentDidMount(){
        //window.addEventListener("scroll", this.handleScroll);
        const rowsInWindow = Math.ceil((window.innerHeight - 64 - 30) / DEFAUTLT_CELL_HEIGHT);
        const colsInWindow = Math.ceil((window.innerWidth - 30) / DEFAUTLT_CELL_WIDTH);
        this.setState({
            endRow: rowsInWindow,
            endCol: colsInWindow,
            rows: rowsInWindow,
            cols: colsInWindow
        });
        this.props.resizeSheet(colsInWindow, rowsInWindow, true);
        this.props.setIsInSheet(true);
    }
    componentWillUnmount(){
        //window.removeEventListener("scroll", this.handleScroll);
        this.props.setIsInSheet(false);
    }
    handleUpButton = () => {
        if(this.state.startRow >= 3){
            this.setState({
                startRow: this.state.startRow - 3,
                endRow: this.state.endRow - 3,
            });
        }
    }
    handleDownButton = () => {
        this.setState({
            startRow: this.state.startRow + 3,
            endRow: this.state.endRow + 3,
            rows: (this.state.endRow + 3 > this.state.rows ? this.state.endRow + 3 : this.state.rows)
        })
        if(this.state.endRow + 3 > this.state.rows){
            this.props.resizeSheet(this.state.cols, this.state.endRow + 3);
        }
    }
    handleLeftButton = () => {
        if(this.state.startCol >= 3){
            this.setState({
                startCol: this.state.startCol - 3,
                endCol: this.state.endCol - 3,
            })
        }
    }
    handleRightButton = () => {
        this.setState({
            startCol: this.state.startCol + 3,
            endCol: this.state.endCol + 3,
            cols: (this.state.endCol + 3 > this.state.cols ? this.state.endCol + 3 : this.state.cols)
        });
        if(this.state.endCol + 3 > this.state.cols){
            this.props.resizeSheet(this.state.endCol + 3, this.state.rows);
        }
    }
    handleScroll = e => {
        // const addAmout = 20;
        // const D = document;
        // const height = Math.max(
        //     D.body.scrollHeight, D.documentElement.scrollHeight,
        //     D.body.offsetHeight, D.documentElement.offsetHeight,
        //     D.body.clientHeight, D.documentElement.clientHeight
        // );
        // const width = Math.max(
        //     D.body.scrollWidth, D.documentElement.scrollWidth,
        //     D.body.offsetWidth, D.documentElement.offsetWidth,
        //     D.body.clientWidth, D.documentElement.clientWidth
        // )
        // const {scrollTop, scrollLeft} = e.target.scrollingElement;
        // const {rows, cols, startRow, startCol, endRow, endCol, lastScrollY} = this.state;
        // let setRows = false, setCols = false, scrolledDown = true;
        // const newRows = (scrollTop + window.innerHeight + 300 > height ? rows + addAmout : rows);
        // const newCols = (scrollTop + window.innerWidth + 300 > width ? cols + addAmout : cols);
        // let newStartRow = startRow, newStartCol = startCol, newEndRow = endRow, newEndCol = endCol;
        // if(window.scrollY < lastScrollY){
        //     console.log("gora")
        //     if(startRow >= 3){
        //         newStartRow -= 3;
        //         newEndRow -= 3;
        //     }
        // } else if (window.scrollY > lastScrollY){
        //     console.log("dol")
        //     newStartRow += 3;
        //     newEndRow += 3;
        // }
        // console.log(newStartRow);
        // console.log(newEndRow);
        // this.setState({
        //     rows: newRows,
        //     cols: newCols,
        //     startRow: newStartRow,
        //     endRow: newEndRow,
        //     lastScrollY: window.scrollY
        // });
    }
    render(){
        if(!this.props.isInSheet){
            return null;
        }

        return (
            <div className="spreadsheet">
                <Toolbar />
                {/* <Border cols={this.state.cols} rows={this.state.rows} />
                <Table cols={this.state.cols} rows={this.state.rows} /> */}
                <Border startRow={this.state.startRow} endRow={this.state.endRow} startCol={this.state.startCol} endCol={this.state.endCol} />
                <Table startRow={this.state.startRow} endRow={this.state.endRow} startCol={this.state.startCol} endCol={this.state.endCol} />
                <button className="up" onClick={this.handleUpButton}>
                    <i className="small material-icons">arrow_upward</i>
                </button>
                <button className="down" onClick={this.handleDownButton}>
                    <i className="small material-icons">arrow_downward</i>
                </button>
                <button className="left" onClick={this.handleLeftButton}>
                    <i className="small material-icons">arrow_back</i>
                </button>
                <button className="right" onClick={this.handleRightButton}>
                    <i className="small material-icons">arrow_forward</i>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isInSheet: state.sheet.isInSheet
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIsInSheet: isInSheet => dispatch(setIsInSheet(isInSheet)),
        resizeSheet: (cols, rows, makeBigger) => dispatch(resizeSheet(cols, rows))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);