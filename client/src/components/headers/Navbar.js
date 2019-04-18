import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../store/actions/authActions";

const Navbar = ({auth, logout}) => {
    const {isAuthenticated, user} = auth;
    const handleLogout = () => {
        logout();
    }
    const authLinks = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                <span style={{marginRight: "10px"}}>Logged as {user ? user.username : ""}</span>
            </li>
            <li><Link to="/new">Create</Link></li>
            <li><Link to="/login" onClick={handleLogout}>Log out</Link></li>
        </ul>
    )
    const guestLinks = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>  
    )
    return(
        <nav className="indigo darken-3">
            <div className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Spreadsheet</Link>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);