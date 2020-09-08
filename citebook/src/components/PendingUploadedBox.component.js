import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PaperDetails from './PaperDetails.component';
import {Redirect} from "react-router-dom";
import LoggedInNavbar from './LoggedInNavbar.component';
import axios from 'axios';
import SimplePopup from "./SimplePopup.component";




export default class PendingUploadedBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DetailsRedirect: false,
            paperid:this.props.paperid,
            user_id:'',
            showPopup: false,
            text:'',
            text2:''
       };
        this.HandleRedirect = this.HandleRedirect.bind(this);
        this.HandleDelete = this.HandleDelete.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
      }

   HandleRedirect(event) {
        this.setState({
            DetailsRedirect: true
        })
       
    }

   HandleDelete(event) {
   
        this.setState({
            paperid: this.props.paperid,
            user_id:this.state.id
        })
        axios.post('/api/deletepaper/',{
            params: {
                user_id:this.props.id,
                paper_id: this.props.paperid
              }
        }).then(res => {
            axios.get('/api/getpapers/'+this.props.id).then(result => {
                this.props.handler2();
              });
            console.log("Paper deleted");
          })

    }

    HandleSubmit(event) {
   
        this.setState({
            paperid: this.props.paperid
        })
        axios.get('/api/user/'+this.props.id).then(res => {
            this.setState({
              user_id: res.data._id,
              person:res.data
            })

            if(res.data.citation_points<3) {
                console.log("den exw arketous pontous front")
                this.setState({
                    text:"Not enough points available to publish the paper.",
                    text2:"(Try to declare more citations)"
                })
                this.togglePopup()
            }
            else{
                axios.post('/api/publishpaper',{
                    params: {
                      paper_id:this.state.paperid,
                      user_id:this.state.user_id,
                    }
                  }).then((response) => {
                        if(response!="Something went wrong with paper"){
                            this.setState({
                                text:"Published Succesfully.",
                                text2:"(Your points decreased by 3)"
                            })
                            this.togglePopup()
                        }
                        else{
                            this.setState({
                                text:"Not enough points available to publish the paper.",
                                text2:"(Try to declare more citations)"
                            })
                            this.togglePopup()
                        }
                    }
                 ); 
            }       
          })

    }

    DetailsRedirect = (id,title,active,pending,photo,date,descr,link,points,citatedby,declared_citations,venue) => {
        if (this.state.DetailsRedirect) {
        return (<Redirect to={{
            pathname: "/Paperdetails/"+id,
            title: title,
            id:id,
            descr: descr,
            points: points,
            date: date,
            active: active,
            pending: pending,
            photo: photo,
            link: link,
            citatedby: citatedby,
            venue: venue,
            declared_citations: declared_citations,
            to:"pendingpapers"
        }} />)
        }
    }

    togglePopup() {  
        this.setState({
                user_id:this.props.id,
                showPopup: !this.state.showPopup  
        });  
    }
    
    togglePopup2() {
        this.props.handler2();
        this.setState({
                user_id:this.props.id,
                showPopup: !this.state.showPopup  
        });  
    }

    render() {

        const {id,title,active,pending,photo,date,descr,likes,points,paperid,link,handler2,citatedby,declared_citations,venue,search} = this.props;

        let button;
        if (!active && search!=1) {
            button = <div style={{"width":"100%","margin-top":"1.5%"}}>
                        <Button size='sm' className="photobox"  onClick={this.HandleSubmit} style={{"border":"white solid 1px","color":"white","background-color":"green","margin-right":"2%","float":"right"}} variant="link">Publish it</Button>
                        <Button size='sm' className="photobox" onClick={this.HandleRedirect} style={{"backgroundColor":"rgb(119, 25, 25)","border":"white solid 1px","color":"white","width":"20.3%"}} variant="link">See Details</Button>
                        <Button size='sm' className="photobox"  onClick={this.HandleDelete} style={{"border":"white solid 1px","color":"white","background-color":"rgb(119, 25, 25)","margin-right":"2%","float":"right"}} variant="link">Delete</Button>
                    </div>
        } 
        else {
            button = <div style={{"width":"100%","margin-top":"1.5%"}}>
                            <Button size='sm' className="photobox" onClick={this.HandleRedirect} style={{"backgroundColor":"rgb(119, 25, 25)","border":"white solid 1px","color":"white","width":"20.3%"}} variant="link">See Details</Button>
                            <Button size='sm' className="photobox"  onClick={this.HandleDelete} style={{"border":"white solid 1px","color":"white","background-color":"rgb(119, 25, 25)","margin-right":"2%","float":"right"}} variant="link">Delete</Button>
                          
                        </div>
        }

        return (
            <Container className="photobox" style={{"margin-top":"2%","border":"1px solid black","backgroundColor":"white"}}>
                {this.DetailsRedirect(id,title,active,pending,photo,date,descr,link,points,citatedby,declared_citations,venue)}
                <Container style={{"padding":"2% 2% 2% 2%","margin":"0 auto"}}>
                    <Row>
                        <Row style={{"width":"100%","margin":"0% 0% 0% 0.3%"}}> 
                            <div className="titlespan" style={{"backgroundColor":"#FFFFFF"}}>
                                    <span style={{"color":" rgb(122, 53, 53)","fontWeight":"bold","fontSize":"large"}}>Title : </span>
                                    <span style={{"color":"black","fontSize":"large"}}>{title}</span>
                            </div>
                        </Row>
                        <Row style={{"width":"100%","margin":"0% 0% 0% 0.3%"}}>
                            <div style={{"backgroundColor":"#FFFFFF"}}>
                                <span style={{"color":" rgb(122, 53, 53)","fontWeight":"bold","fontSize":"large"}}>Link :</span>
                                <a target="_blank" href={"http://"+link} style={{"color":"blue","fontSize":"large"}}> {link}</a>
                            </div>
                        </Row>
                        <Row  style={{"width":"100%","margin":"0% 0% 0% 0.3%"}}>
                            <div className="titlespan" style={{"backgroundColor":"#FFFFFF"}}>
                                <span style={{"color":" rgb(122, 53, 53)","fontWeight":"bold","fontSize":"large"}}>Venue : </span>
                                <span style={{"color":"black","fontSize":"large"}}>{venue}</span>
                            </div>
                        </Row>
                        <Row style={{"width":"100%"}}>
                            <div style={{"backgroundColor":"#FFFFFF","margin":"0% 0% 0% 1.6%"}}>
                                <span className="" style={{"color":"grey","fontSize":"large"}}>Citations : </span>
                                <span style={{"color":"black","fontSize":"large"}}>{points}</span>
                            </div>
                        </Row>
                        {button}
                    </Row>
                    <Row>
                        
                    </Row>
                    <div>{this.state.showPopup ?  
                        <SimplePopup
                          id={this.state.user_id}
                          title="Publish Results"
                          text={this.state.text}
                          text2={this.state.text2}
                          handler={handler2}
                          closePopup={this.togglePopup2.bind(this)}  
                        />  
                        : null  
                        }  
                    </div>
                </Container>
            </Container>
        )
    }
}