import React, { Component } from "react";
import {Link,NavLink} from "react-router-dom";
import logo from '../logo.png';
import ReactSearchBox from 'react-search-box'
import './Navbar.css';
import axios from 'axios';




export default class Navbar extends Component{

  constructor(props) {
    super(props);
    this.state = {
     loggedIn: false,
     uid:this.props.id
    }
   };

   componentDidUpdate(prevProps) {
    if(prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({uid:this.props.id,loggedIn: this.props.loggedIn});
      
    }
  }


    render(){
        const path="/MyAccount/"+this.state.uid;
        const link1 = this.state.loggedIn ? path : '/register';
        const link2 = this.state.loggedIn ? '/' : '/login';
        const name1=this.state.loggedIn ? 'My account' : 'Register';
        const name2=this.state.loggedIn ? 'Logout' : 'Login';
        return (
            <div className="container" style={{margin:0,padding:0}}>
              <nav className="navbar navbar-expand-lg xrwmanav headers" style={{"width" : "100vw"}}>
                <a className="navbar-brand">
                  <img style={{"color":"black"}} src={logo} width="30" height="30"/>
                </a>
              <Link to="/" style={{"color":"rgb(87, 33, 33)","fontWeight":"bold"}} className="navbar-brand">Citebook</Link>
              <div className="collpase navbar-collapse options">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <NavLink className="nav-link nav-link1 mr-3 headers" to={link1}>{name1}</NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink className="nav-link nav-link1 mr-3 headers" to={link2}>{name2}</NavLink>
                  </li>
               
                </ul>
              </div>
              </nav>
          </div>
        )
    }
}