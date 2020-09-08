import React, { Component } from "react";
import {Link,NavLink} from "react-router-dom";
import logo from '../logo.png';
import './Navbar.css';




export default class NavbarLogged extends Component{

  constructor(props) {
    super(props);
    this.state = {
     uid:this.props.id
    }

   };

   componentWillMount() {  
    this.setState({
      uid: this.props.id
    })
   }
    render(){
       
        const path="/MyAccount/"+this.state.uid;

        return (
            <div className="container" style={{margin:0,padding:0}}>
              <nav className="navbar navbar-expand-lg xrwmanav headers" style={{"width" : "100vw"}}>
                <a className="navbar-brand">
                  <img style={{"color":"black"}} src={logo} width="30" height="30"/>
                </a>
              <div style={{"color":"rgb(87, 33, 33)","fontWeight":"bold"}} className="navbar-brand">Citebook</div>
              <div className="collpase navbar-collapse options">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <NavLink className="nav-link nav-link1 mr-3 headers" to={path}>My Account</NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink className="nav-link mr-3 headers" to={'/'}>Logout</NavLink>
                  </li>
               
                </ul>
              </div>
              </nav>
          </div>
        )
    }
}