import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../store/actions/authActions";

const Login = ({login, isAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        login(email, password);
    }
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input placeholder="Email" value={email} type="email" onChange={e => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>
                <div className="input-field">
                    <input placeholder="Password" value={password} type="password" onChange={e => setPassword(e.target.value)}/>
                    <label>Pasword</label>
                </div>
                <button className="btn waves-effect waves-light indigo darken-4" type="submit" name="action">Login
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);