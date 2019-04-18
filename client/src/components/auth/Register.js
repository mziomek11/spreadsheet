import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {register} from "../../store/actions/authActions";

const Register = ({register, isAuthenticated}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if(password !== password2){
            console.log("Passwords do not match");
        }else {
            register({username, email, password});
        }
    }
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    return (
        <div className="register container">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input placeholder="Username" value={username} type="text" onChange={e => setUsername(e.target.value)} />
                    <label>Username</label>
                </div>
                <div className="input-field">
                    <input placeholder="Email" value={email} type="email" onChange={e => setEmail(e.target.value)}/>
                    <label>Email</label>
                </div>
                <div className="input-field">
                    <input placeholder="Password" value={password} type="password" onChange={e => setPassword(e.target.value)}/>
                    <label>Pasword</label>
                </div>
                <div className="input-field">
                    <input placeholder="Password" value={password2} type="password" onChange={e => setPassword2(e.target.value)}/>
                    <label>Confirm Password</label>
                </div>
                <button className="btn waves-effect waves-light indigo darken-4" type="submit" name="action">Register
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
        register: userData => dispatch(register(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);