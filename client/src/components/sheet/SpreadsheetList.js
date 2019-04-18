import React, {useEffect} from "react"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getSheets, deleteSheet} from "../../store/actions/sheetActions";

const SpreadsheetList = ({getSheets, deleteSheet, sheets}) => {
    useEffect(() => {
        getSheets();
    }, []);
    return (
        <div className="ssh-list container">
            <ul className="collection with-header">
                <li className="collection-header">Your sheets</li>
                {sheets.map(({_id, name, date}) => (
                    <li className="collection-item" key={_id}>
                        <Link to={`/sheet/${_id}`}>{name}</Link>
                        <button className="secondary-content btn btn-small red" onClick={() => deleteSheet(_id)}>Delete</button>
                        <Link to={`/sheet/${_id}/info/update`} className="secondary-content btn btn-small blue" style={{marginRight: "7px"}}>Update</Link>
                        <p>Created at {date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        sheets: state.sheet.sheets
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSheets: () => dispatch(getSheets()),
        deleteSheet: id => dispatch(deleteSheet(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpreadsheetList);

