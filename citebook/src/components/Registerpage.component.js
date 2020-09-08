import React, { Component } from 'react';
import './Registerpage.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import UserProfile from "../UserProfile";
import {Redirect} from "react-router-dom";
import books from "../bookswall.jpg"
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Navbar from "./Navbar.component";
import FileBase64 from 'react-file-base64';
import ResizeImage from 'react-resize-image'
import uknown from '../emptyface.jpg';






export default class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname:'',
      email:'',
      password:'',
      redirect: false,
      field:'',
      image:''
   };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }


  handleSubmit(event) {

    event.preventDefault();
    if(this.state.fname=="" || this.state.lname=="" || this.state.email=="" || this.state.password=="") {
      this.setState({
        field: 'Complete all the fields and try again!'
      })
    }
    else{
      this.setState({
        field: ''
      })

      if(this.state.image==''){
        this.setState({
          image: uknown
        })
        axios.post('api/newuser',{
          params: {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            level: 0,
            active_papers: 0,
            papers_no: 0,
            citation_points: 0,
            penalty_points: 0,
            papers_to_be_confirmed:'0',
            img: '0',
            friends: '0',
            papers: '0',
            img : uknown
          }
        }).then((response) => {
          console.log(response);
          this.setState({
            redirect: true
          })
        }, (error) => {
          console.log(error);
        });
      }
      else{
        axios.post('api/newuser',{
          params: {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            level: 0,
            active_papers: 0,
            papers_no: 0,
            citation_points: 0,
            penalty_points: 0,
            papers_to_be_confirmed:'0',
            img: '0',
            friends: '0',
            papers: '0',
            img : this.state.image.base64
          }
        }).then((response) => {
          console.log(response);
          this.setState({
            redirect: true
          })
        }, (error) => {
          console.log(error);
        });
      }
      }
     
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  getFiles(image){
    this.setState({ image: image })
  }

    render() {
        return (
          <div>
                <Navbar/>
          <div className="flexbox">
          {this.renderRedirect()}
            <div className="col">
              <img className="col" style={{"width":"100%","height":"100%"}} src={books}/>
                <div className="welcomebox">WELCOME TO CITEBOOK
                  <div className="welcomebox2">Upload Papers,<br/>Make Connections,<br/>Meet New Friends</div>
                </div>
            </div>
            <div className="col">
            <div>
            <MDBContainer>
              <MDBRow>
                <MDBCol md="7" className="ContainerBoxr">
                  <form>
                    <p className="h1 text-center mb-4 titleCite">Citebook</p>
                    <p className="h4 text-center mb-5 titleCite2">Create an account</p>
                    <input placeholder="First Name" type="fname" name="fname" value={this.state.value} onChange={this.handleChange} className="form-control" />
                    <br />
                    <input placeholder="Last Name" type="lname" name="lname" value={this.state.value} onChange={this.handleChange} className="form-control" />
                    <br />
                    <input placeholder="Email Address" type="email" name="email" value={this.state.value} onChange={this.handleChange} className="form-control" />
                    <br />
                    <input placeholder="Password" type="password" name="password" value={this.state.value} onChange={this.handleChange} className="form-control" />
                    <br />
                    <div className="imgupload"><p style={{"fontWeight":"bold","color":"white"}}>Choose a Profile Picture</p><FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } /></div>
                    <div className="text-center mt-4">
                      <Button size='' type="submit" onClick={this.handleSubmit} className="photobox" style={{"width":"91%","color":"white","margin":"3% 0% 5% 0%","backgroundColor":"rgb(87, 33, 33)"}} variant="link">Register</Button>
                      <div style={{"marginBottom":"0%","color":"white"}}>{this.state.field}</div>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            </div>
            </div>
          </div>
          </div>
        )
    }
}

