import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from "./components/Homepage.component";
import LoginPage from "./components/Loginpage.component";
import RegisterPage from "./components/Registerpage.component";
import Navbar from "./components/Navbar.component";
import UserProfile from "./UserProfile";
import Dashboard from './components/Dashboard.component';
import Friends from './components/Friends.component';
import MyAccount from './components/MyAccount.component';
import UploadedPapers from './components/UploadPapers.component';
import PaperDetails from './components/PaperDetails.component';
import FriendPage from './components/FriendPage.component';
import PendingPapers from './components/PendingPapers.component';
import ArchivedCitations from './components/ArchivedCitations.component';
import PaperSearch from './components/PaperSearch.component';
import PeopleSearch from './components/PeopleSearch.component';










export default class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
         loggedIn: '',
         email:"",
         password:"",
         uid:""
        }
       };

    handler=(id) => {
        this.setState({
          uid:id
        },function () {
            console.log("Handler changed loggedIn to"+this.state.loggedIn)
        }) 
    }

    idchange=(id) => {
        this.setState({
           uid:id
        })
    }

    render() {
        return (
            <Router>
                <Route path="/" exact component={HomePage} />
                <Route path="/dashboard/:id" id={this.state.uid} component={Dashboard} />
                <Route path="/login" idchange={this.idchange} handler={this.handler} render={(props) => <LoginPage {...props} idchange={this.idchange} handler={this.handler} />} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/friends/:id" component={Friends}/>
                <Route path="/MyAccount/:id" id={this.state.uid} component={MyAccount} />
                <Route path="/uploadedpapers/:id" id={this.state.uid} component={UploadedPapers} />
                <Route path="/pendingpapers/:id" component={PendingPapers} />
                <Route path="/Paperdetails/:id" id={this.state.uid} component={PaperDetails} />
                <Route path="/FriendPage/:id" id={this.state.uid} component={FriendPage} />
                <Route path="/rejectedcitations/:id" id={this.state.uid} component={ArchivedCitations} />
                <Route path="/PaperSearch/:id" id={this.state.uid} component={PaperSearch} />
                <Route path="/PeopleSearch/:id" id={this.state.uid} component={PeopleSearch} />
            </Router>
        )
    }
}