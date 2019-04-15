import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {loadUser} from "./store/actions/authActions";
import PrivateRoute from "./components/other/PrivateRoute";
import Navbar from "./components/Navbar";
import SpreadsheetList from './components/sheet/SpreadsheetList';
import SpreadsheetCreateForm from "./components/sheet/SpreadsheetCreateForm";
import SpreadsheetInfoUpdateForm from "./components/sheet/SpreadsheetInfoUpdateForm";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./css/main/main.css"

const App = ({loadUser, firstChecked}) => {
  useEffect(() => {
    loadUser();
  }, [])
  if(!firstChecked){
      return null;
  }
  return (
    <div className="app">
        <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={SpreadsheetList}/>
                <PrivateRoute exact path="/new" component={SpreadsheetCreateForm} />
                <PrivateRoute exact path="/sheet/:id" component={SpreadsheetInfoUpdateForm}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
        </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    firstChecked: state.auth.firstChecked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
