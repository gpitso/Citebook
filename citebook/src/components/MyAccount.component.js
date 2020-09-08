import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoggedInNavbar from './LoggedInNavbar.component';
import Button from 'react-bootstrap/Button'
import './MyAccount.css'
import Form from 'react-bootstrap/Form';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import Navbar from "./NavbarLogged.component";
import FileBase64 from 'react-file-base64';






export default class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id:'',
            fname: '',
            lname:'',
            email:'',
            password:'',
            npassword:'',
            redirect: false,
            field:'',
            img:''
         };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.renderCancel = this.renderCancel.bind(this);
      
      
    };

    componentDidMount() {  
        this.setState({
            user_id:this.props.match.params.id
          });

          axios.get('/api/user/'+this.props.match.params.id).then(res => {
                this.setState({
                  user_id: res.data._id,
                  fname:res.data.fname,
                  lname:res.data.lname,
                  email:res.data.email,
                  password:res.data.password,
                  npassword:'',
                  img:res.data.img
                })
              })        
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    async handleSubmit(event) {

        event.preventDefault();
        var flag=true;

        var res= await axios.post('/api/verify',{ params: {user_id:this.state.user_id,password:this.state.password} }).then((response) => {
            if(response.data=="Error"){
                flag=false;
            }
        });
       console.log(flag);
        if(this.state.fname==""||this.state.lname=="" || this.state.email=="" || this.state.password=="") {
          this.setState({
            field: 'Complete all the fields and try again!'
          })
        }
        else if(flag==false){
            console.log("EXw error sended")
            this.setState({
                field: 'Wrong Old Password,Try again'
              })
        }
        else{
            console.log("EXw ok sended")
            this.setState({
                field: ''
            })
          if(this.state.npassword=="" || this.state.npassword==null) this.setState({npassword:this.state.password});
          await axios.post('/api/modify',{
            params: {
              user_id:this.state.user_id,
              fname: this.state.fname,
              lname: this.state.lname,
              email: this.state.email,
              password: this.state.password,
              npassword: this.state.npassword,
              img: this.state.img
            }
          }).then((response) => {
                this.setState({
                    redirect: true,
                    field: ''
                 })
            }
         );
      }
    }

    renderCancel(){
        this.setState({
            redirect: true,
         })
    }
      renderRedirect = () => {
        if (this.state.redirect) {
            var path='/dashboard/'+this.state.user_id;
          return <Redirect to={path} />
        }
      }

      getFiles(image){
        this.setState({ img: image.base64 })
      }

    render() {

        
        return (
          <div>
            <Navbar/>
            <div style={{"overflow":"auto" ,"height":"1035px","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>  
                <LoggedInNavbar id={this.state.user_id}/>
                {this.renderRedirect()}
                <div className="bigbox photobox">
                    <div class="flex-container1">
                        <img className="photochange" src={this.state.img}/>
                        <div class="button"><p style={{"fontWeight":"bold"}}>Change Profile photo</p><FileBase64 multiple={ false } onDone={ this.getFiles.bind(this) } /></div>
                    </div>
                    <div class="flex-container2">
                            <Container className="boxinputs">
                                <Form>
                                    <Form.Group controlId="FirstNameForm">
                                    <Form.Label>FIRST NAME<span style={{"color":"red"}}>*</span></Form.Label>
                                    <Form.Control onChange={this.handleChange} name="fname" value={this.state.fname} className="margin-inputs" type="fname" placeholder="Enter First Name" />  
                                    </Form.Group>
                                    <Form.Group className="FirstNameForm"  controlId="FirstNameForm">
                                    <Form.Label>LAST NAME<span style={{"color":"red"}}>*</span></Form.Label>
                                    <Form.Control onChange={this.handleChange} name="lname" value={this.state.lname} className="margin-inputs" type="lname" placeholder="Enter Last Name" />  
                                    </Form.Group>
                                    <Form.Group className="FirstNameForm"  controlId="formBasicPassword">
                                    <Form.Label>EMAIL<span style={{"color":"red"}}>*</span></Form.Label>
                                    <Form.Control onChange={this.handleChange} name="email" value={this.state.email} className="margin-inputs" type="email" placeholder="Enter Email" />
                                    </Form.Group>
                                    <Form.Group  className="FirstNameForm" controlId="formBasicPassword">
                                    <Form.Label>OLD PASSWORD<span style={{"color":"red"}}>*</span></Form.Label>
                                    <Form.Control onChange={this.handleChange} name="password" value={this.state.password}  type="password" className="margin-inputs"  placeholder="Enter Current Password" />
                                    </Form.Group>
                                    <Form.Group className="FirstNameForm"  controlId="formBasicPassword">
                                    <Form.Label>NEW PASSWORD</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="npassword" type="npassword" className="margin-inputs"  placeholder="Enter your new Password" />
                                    </Form.Group>
                                    <div style={{"width":"90%","margin-top":"5%"}}>
                                        <Button size='lg' className="photobox"  onClick={this.renderCancel} style={{"border":"white solid 1px","color":"white","margin":"0% 0% 0% 0%"}} variant="link">Cancel</Button>
                                        <Button size='lg' className="photobox" onClick={this.handleSubmit} style={{"border":"white solid 1px","color":"white","margin":"0% 0% 0% 0%","background-color":"rgb(122, 53, 53)","float":"right"}} variant="link">Save</Button>
                                    </div>
                                    <div style={{"marginBottom":"5%","color":"white"}}>{this.state.field}</div>
                              </Form>
                            </Container>
                    </div>
                </div>
          </div>
          </div>                 
        )
    }
}