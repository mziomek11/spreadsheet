import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateSheet, getSheetDetail} from "../../store/actions/sheetActions";

const SpreadsheetInfoUpdateForm = ({match, updateSheet, getSheetDetail, actualSheet, history}) => {
    const [name, setName] = useState("");
    useEffect(() => {
        const {id} = match.params;
        getSheetDetail(id);
    }, []);
    useEffect(() => {
        if(actualSheet){
            setName(actualSheet.name);
        }
    }, [actualSheet])
    const handleSubmit = e => {
        e.preventDefault();
        const {id} = match.params;
        const data = {name};
        updateSheet(id, data);
        history.push("/");
    }
    if(!actualSheet){
        return null;
    }

    return (
        <div className="shh-form">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input placeholder="Name" value={name} name="name" type="text" onChange={e => setName(e.target.value)} />
                    <label htmlFor="name" className="active">Name</label>
                </div>
                <Link to="/" className="btn waves-effect waves-light blue" style={{marginRight: "10px"}}>Back
                    <i className="material-icons left">arrow_back</i>
                </Link>
                <button className="btn waves-effect waves-light blue" type="submit" name="action">Update
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        actualSheet: state.sheet.actualSheet
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSheet: (id, data) => dispatch(updateSheet(id, data)),
        getSheetDetail: id => dispatch(getSheetDetail(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpreadsheetInfoUpdateForm);