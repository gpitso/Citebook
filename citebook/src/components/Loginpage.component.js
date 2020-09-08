import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon,MDBInput } from 'mdbreact';
import './Loginpage.css';
import UserProfile from "../UserProfile";
import { BrowserRouter as Router,Redirect, Switch, Route, Link } from 'react-router-dom';
import uknown from '../emptyface.jpg';


import books from "../bookswall.jpg"
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Navbar from "./Navbar.component";
import { GoogleLogin } from 'react-google-login';






export default class LoginPage extends Component {

  

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password:'',
          user_id:'',
          redirect: false,
          redirectgoogle: false,
          field:'',
          fname:'',
          lname:''
       };

        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


      handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }
    
    
      handleSubmit(e) {
        console.log("ekana login")
        e.preventDefault();
        axios.get('api/account',{
          params: {
            email: this.state.email,
            password: this.state.password
          }
        }).then(res => {
            if(res.data!="Invalid Email or Password, Try again"){
              this.props.handler(res.data.user_id);
              this.setState({
                redirect: true,
                user_id: res.data.user_id,
                field:''
              })
              this.props.idchange(res.data.user_id);
            }
              else{
                console.log("Wrong password or Email");
                this.setState({
                  field: 'Wrong Email or Password,Try again!'
                })
              }
            })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={'/dashboard/'+ this.state.user_id} />
        }
      }

      renderRedirectGoogle = () => {
        if (this.state.redirectgoogle) {
          return <Redirect to={{pathname:'/dashboard/'+this.state.user_id}}/>
        }
      }

      // async openORCID(e) {
      //   //put it inside render to show the ORCID BUTTON// <button id="connect-orcid-button" onClick={this.openORCID}><img id="orcid-id-icon" src="https://orcid.org/sites/default/files/images/orcid_24x24.png" width="24" height="24" alt="ORCID iD icon"/>Register or Connect your ORCID iD</button>

      //   e.preventDefault();
      //   console.log("ela mpika orcid req")
 
      //   axios.post('api/orcid',{
      //   })

      //   var oauthWindow = window.open("https://sandbox.orcid.org/oauth/authorize?client_id=APP-ID45XGHNLZ3XMT0F response_type=code&scope=/authenticate&show_login=false&redirect_uri=https://localhost:3000/", "_blank", "toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500");
    
      // }

      async register(response){
        axios.post('api/logingoogle',{
          params: {
            fname: response.profileObj.givenName,
            lname: response.profileObj.familyName,
            nationality:'',
            email: response.profileObj.email,
            password: 'GmailedPassword',
            interests: '',
            level: 0,
            active_papers: 0,
            papers_no: 0,
            citation_points: 6,
            penalty_points: 0,
            img: '0',
            friends: '0',
            papers: '0',
            img:uknown
          }
        }).then(res => {

            if(res.data!="Invalid Email or Password, Try again"){
              this.props.handler(res.data._id);
              this.setState({
                user_id: res.data._id,
                redirectgoogle: true
              })
              this.props.idchange(res.data._id);  
            }
              else{
                console.log("Wrong password or Email");
                this.setState({
                  field: 'Wrong Email or Password,Try again!'
                })
              }
          });      
      }

    render() {
      const responseGoogle = (response) => {
        console.log(response);
        this.register(response)
      }

      return (
        <div> 
          <Navbar/>
          <div className="flexbox">
          {this.renderRedirect()}
          {this.renderRedirectGoogle()}
            <div className="col">
            <div>
            <MDBContainer style={{"height":"100% !important"}}>
              <MDBRow>
                <MDBCol md="7" className="ContainerBox">
                  <form>
                    <p className="h1 text-center mb-4 titleCite">Citebook</p>
                    <p className="h4 text-center mb-5 titleCite2">Sign into your account</p>
                    <input placeholder="Email Address" type="email" name="email" value={this.state.value} onChange={this.handleChange} className="form-control" />
                    <br />
                    <input placeholder="Password" type="password" name="password" value={this.state.value} onChange={this.handleChange} className="form-control" />
                    <div className="text-center mt-4 margin-bot">
                      <Button size='' className="photobox" type="submit" onClick={this.handleSubmit} style={{"width":"91%","color":"white","margin":"0% 0% 5% 0%","backgroundColor":"rgb(87, 33, 33)"}} variant="link">Login</Button>
                      <div style={{"marginBottom":"5%"}}>Sign in with Google Account ? </div>
                      <GoogleLogin
                        className="google"
                        clientId="1093326035580-5r8u1a3j8l5lto6dt3q4uqjiqhq0n911.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={""}
                        cookiePolicy={'single_host_origin'}
                      />
                      <div style={{"marginTop":"5%","marginBottom":"5%","color":"white"}}>{this.state.field}</div>

                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            </div>
            </div>
            <div className="col">
              <img className="col" style={{"width":"100%","height":"100%"}} src={books}/>
              <div className="welcomebox">WELCOME TO CITEBOOK
                <div className="welcomebox2">Upload Papers,<br/>Make Connections,<br/>Meet New Friends</div>
              </div>
            </div>
          </div>
        </div>

      )
  }
}