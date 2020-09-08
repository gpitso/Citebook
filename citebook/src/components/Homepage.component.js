import React, { Component } from 'react';
import './Homepage.css';
import Navbar from "./Navbar.component";



export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container2">
                <div className="container mb-5 p-3 bg-dark text-white incontainer">Welcome to Citebook</div>
            </div>
            </div>
        )
    }
}