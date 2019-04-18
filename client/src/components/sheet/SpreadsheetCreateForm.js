import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createSheet} from "../../store/actions/sheetActions";

const SpreadsheetCreateForm = ({history, createSheet}) => {
    const [name, setName] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        createSheet({name});
        history.push("/");
    }
    return (
        <div className="shh-form container">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input placeholder="Name" value={name} name="name" type="text" onChange={e => setName(e.target.value)} />
                    <label htmlFor="name" className="active">Name</label>
                </div>
                <Link to="/" className="btn waves-effect waves-light indigo darken-4" style={{marginRight: "10px"}}>Back
                    <i className="material-icons left">arrow_back</i>
                </Link>
                <button className="btn waves-effect waves-light indigo darken-4" type="submit" name="action">Create
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createSheet: data => dispatch(createSheet(data))
    };
};

export default connect(null, mapDispatchToProps)(SpreadsheetCreateForm);