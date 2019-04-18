import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {loadUser} from "./store/actions/authActions";
import PrivateRoute from "./components/other/PrivateRoute";
import Navbar from "./components/headers/Navbar";
import Spreadsheet from "./components/sheet/Spreadsheet";
import SpreadsheetList from './components/sheet/SpreadsheetList';
import SpreadsheetCreateForm from "./components/sheet/SpreadsheetCreateForm";
import SpreadsheetInfoUpdateForm from "./components/sheet/SpreadsheetInfoUpdateForm";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./css/main/main.css"

const App = ({loadUser, firstChecked, isInSheet}) => {
  useEffect(() => {
    loadUser();
  }, [])
  if(!firstChecked){
      return null;
  }
  return (
    <div className="app">
        <BrowserRouter>
          {isInSheet ? null : <Navbar />}
          <Switch>
            <PrivateRoute exact path="/" component={SpreadsheetList}/>
            <PrivateRoute exact path="/create" component={SpreadsheetCreateForm} />
            <PrivateRoute exact path="/sheet/:id/info/update" component={SpreadsheetInfoUpdateForm}/>
            <Route exact path="/sheet/:id" component={Spreadsheet} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    firstChecked: state.auth.firstChecked,
    isInSheet: state.sheet.isInSheet
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
