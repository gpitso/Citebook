import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoggedInNavbar from './LoggedInNavbar.component';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from 'react-bootstrap/Button'
import './PaperDetails.css'
import profilepic from '../profilepic.jpg';  //database or props extraction
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import NoteIcon from '@material-ui/icons/Note';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HelpIcon from '@material-ui/icons/Help';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import EventIcon from '@material-ui/icons/Event';
import styled, { css } from 'styled-components';
import {Redirect} from "react-router-dom";
import Navbar from "./NavbarLogged.component";
import LinkIcon from '@material-ui/icons/Link';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import axios from 'axios';
import paperimg from '../details.jpg'





const Button1 = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

export default class PaperDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            user_id:'',
            citatedby:'',
            names:[],
            names2:[],
            date:'',
            choice:''
         };
         this.renderCancel = this.renderCancel.bind(this);
    };

    componentWillMount(){
        var json=[];
        var json2=[];

        for(let i in this.props.location.citatedby){
            console.log(this.props.location.citatedby[i])
            if(this.props.location.citatedby[i]!="0" && this.props.location.citatedby[i]){
                    json.push(this.props.location.citatedby[i])
            }
        }

        for(let i in this.props.location.declared_citations){
            if(this.props.location.declared_citations[i]!="0" && this.props.location.declared_citations[i]){
                    json2.push(this.props.location.declared_citations[i])
            }
        }
        let date= new Date(this.props.location.date);
        this.setState({ names: json, names2: json2 ,date:date})
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            if(this.props.location.to=='uploadedpapers') return <Redirect to={{pathname:'/uploadedpapers/'+this.props.match.params.id,state: {id:this.props.match.params.id} }}/>
            else if(this.props.location.to=='papersearch') return <Redirect to={{pathname:'/PaperSearch/'+this.props.match.params.id,state: {id:this.props.match.params.id} }}/>
            else return <Redirect to={{pathname:'/pendingpapers/'+this.props.match.params.id,state: {id:this.props.match.params.id} }}/>
            
        }
      }

      renderCancel(){
        this.setState({
            redirect: true,
         })
    }

    render() {
        let choice;
        if(this.props.location.to=="pendingpapers") choice=4
        else if(this.props.location.to=="uploadedpapers") choice=3

        return (
            <div>
            <Navbar id={this.props.match.params.id}/>
            <div className="photobox" style={{"overflow":"auto" ,"height":"1000px","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>  
                <LoggedInNavbar id={this.props.match.params.id} choice={choice}/>
                {this.renderRedirect()}
                <div className="bigbox photobox">
                    <div class="flex-container11">
                        <img className="photochange photobox" src={paperimg}/>
                    </div>
                    <div class="flex-container22">
                            <Container className="boxinputs2">
                                <Row className="gapheight">
                                    <NoteIcon color="inherit"></NoteIcon><div className="gap"></div>
                                    <div className="titlakia">Title:<div className="gap"></div></div>{this.props.location.title}
                                </Row>
                                <Row className="gapheight">
                                    <LocationOnIcon></LocationOnIcon><div className="gap"></div>
                                    <div className="titlakia">Venue:<div className="gap"></div></div>
                                    <div style={{"color":"black","margin-top":"0%"}}>{this.props.location.venue}</div>
                                </Row>
                                <Row className="gapheight">
                                    <LinkIcon></LinkIcon><div className="gap"></div>
                                    <div className="titlakia">Link:<div className="gap"></div></div><a target="_blank" rel="noopener noreferrer" href={this.props.location.link}>{this.props.location.link}</a>
                                </Row>
                                <Row className="gapheight">
                                    <HelpIcon ></HelpIcon><div className="gap"></div>
                                    <div className="titlakia">Active:<div className="gap"></div></div>{this.props.location.active}
                                </Row>
                                <Row className="gapheight">
                                    <HelpIcon ></HelpIcon><div className="gap"></div>
                                    <div className="titlakia">Pending:<div className="gap"></div></div>{this.props.location.pending}
                                </Row>
                                <Row className="gapheight">
                                    <EventIcon></EventIcon><div className="gap"></div>
                                    <div className="titlakia">Published Date:<div className="gap"></div></div>{this.state.date.toUTCString()}
                                </Row>
                                <Row className="gapheight">
                                    <AccountBoxIcon></AccountBoxIcon><div className="gap"></div>
                                    <div className="titlakia">Citated by:<div className="gap"></div></div>
                                     {this.state.names && this.state.names.map((e, idx)=> <a>{e},</a>)}
                                </Row>
                                <Row className="gapheight">
                                    <AccountBoxOutlinedIcon></AccountBoxOutlinedIcon><div className="gap"></div>
                                    <div className="titlakia">Declared Citations:<div className="gap"></div></div>
                                    {this.state.names2 && this.state.names2.map((e, idx)=> <a>{e},</a>)}
                                </Row>
                                <div style={{"width":"100%","margin":"1% 0% 0% 90%"}}>
                                    <div className="uploadbuttons11">
                                        <Button1  onClick={this.renderCancel} className="uploadbutton11">Cancel</Button1></div>
                                </div>
                            </Container>
                    </div>
                </div>
          </div>
          </div>                 
        )
    }
}