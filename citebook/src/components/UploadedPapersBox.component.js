import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PaperDetails from './PaperDetails.component';
import {Redirect} from "react-router-dom";
import LoggedInNavbar from './LoggedInNavbar.component';
import axios from 'axios';



export default class UploadedPapersBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DetailsRedirect: false,
            paperid:this.props.paperid
       };
        this.HandleRedirect = this.HandleRedirect.bind(this);
        this.HandleDelete = this.HandleDelete.bind(this);
      }

   HandleRedirect(event) {
        this.setState({
            DetailsRedirect: true
        })
       
    }

   HandleDelete(event) {
   
        this.setState({
            paperid: this.props.paperid
        })
        axios.post('/api/deletepaper/',{
            params: {
                user_id:this.props.id,
                paper_id: this.props.paperid
              }
        }).then(res => {
            axios.get('/api/getactivepapers/'+this.props.id).then(result => {
                this.props.handler(result.data);
              });
            console.log("Paper deleted");
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
          venue : venue,
          declared_citations: declared_citations,
          to: "uploadedpapers"
      }} />)
    }
}

    render() {

        const {id,title,active,pending,photo,date,descr,likes,points,paperid,link,citatedby,declared_citations,venue} = this.props;
        
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

                    </Row>
                    <Row>
                        <div style={{"width":"100%","margin-top":"1.5%"}}>
                            <Button size='lg' className="photobox" onClick={this.HandleRedirect} style={{"backgroundColor":"rgb(119, 25, 25)","border":"white solid 1px","color":"white","width":"20.3%"}} variant="link">See Details</Button>
                            <Button size='lg' className="photobox"  onClick={this.HandleDelete} style={{"border":"white solid 1px","color":"white","background-color":"rgb(119, 25, 25)","margin-right":"0%","float":"right"}} variant="link">Delete</Button>
                        </div>
                    </Row>
                </Container>
            </Container>
        )
    }
}