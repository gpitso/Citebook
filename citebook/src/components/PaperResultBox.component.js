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
import LikeImage from '@material-ui/icons/ThumbUpAltOutlined';
import CitationPopup from "./CitationPopup.component";





export default class PaperResultBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DetailsRedirect: false,
            paper_id:this.props.paperid,
            user_id:this.props.user_id,
            friend_id:this.props.friend_id,
            showPopup: false,
            text:'',
            text2:'',
            isButtonDisabled:false,
            buttontext : 'Declare Citation'
       };
        this.HandleRedirect = this.HandleRedirect.bind(this);
      }

   HandleRedirect(event) {
        this.setState({
            DetailsRedirect: true
        })
       
    }

    componentWillMount() { 
        console.log("paperresultbox:"+this.props.paperid+" "+this.props.id+" "+this.props.friend_id) 
        this.setState({
            paper_id:this.props.paperid,
            user_id:this.props.id,
            friend_id:this.props.friend_id,
            date:this.state.date
          });

          axios.get('/api/paper/'+this.props.paperid).then(res => {
                this.setState({
                  paper_id: res.data._id,
                  paper:res.data,
                  friend_id:res.data.user_id,
                  date: res.data.publish_timer
                })
                
                if(res.data._id!=null){
                   var data= res.data.citatedby;
                   const index = data.indexOf('0');
                   if (index > -1) {
                    data.splice(index, 1);
                  }
                  for (var i = 0; i < data.length; i++) {
                    var paperspec = data[i];                    
                    if(paperspec == this.props.id){
                        this.setState({
                            papercited: true,
                            buttontext: 'Citation Declared',
                            isButtonDisabled:true
                        })
                        break;
                    }
                    else{
                        this.setState({
                            papercited: false,
                            buttontext: 'Declare Citation',
                            isButtonDisabled:false
                        })
                    }
                }
                }
          });
        

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
            to:"papersearch"
        }} />)
        }
    }

    clickMe = () => {
        this.setState({
            buttontext: "Citation Declared",
            isButtonDisabled: true
          })
          this.togglePopup();
    }

    togglePopup() {
            this.setState({
                user_id:this.props.id,
                showPopup: !this.state.showPopup  
        });  
    } 
    
    handler() {  
        this.setState({
            buttontext: "Declare Citation",
            isButtonDisabled:false 
        });  
    }  


    render() {

        const {id,title,active,pending,photo,date,descr,points,link,citatedby,declared_citations,venue} = this.props;

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
                        <Row style={{"width":"100%","marginTop":"1%","marginLeft":"0.1%"}}>
                             
                                <Button className="photobox" style={{"backgroundColor":"rgb(119, 25, 25)","border":"white solid 1px","color":"white","width":""}} disabled={this.state.isButtonDisabled} variant="link" onClick={this.clickMe}>
                                {this.state.buttontext}
                                    <LikeImage style={{"marginLeft":"2%"}} />
                                </Button>
                                
                                <Button  className="photobox" onClick={this.HandleRedirect} style={{"backgroundColor":"rgb(119, 25, 25)","border":"white solid 1px","color":"white","width":"20.3%","marginLeft":"61%"}} variant="link">See Details</Button>
                        </Row>
                    </Row>
                    <Row>
                        
                    </Row>
                    <div>{this.state.showPopup ?  
                        <CitationPopup
                          id={this.state.user_id}
                          friend_id={this.state.friend_id}
                          text='Choose a paper to declare the citation'  
                          closePopup={this.togglePopup.bind(this)}
                          paper_id={this.state.paper_id}
                          handler={this.handler.bind(this)}  
                        />  
                        : null  
                        }  
                    </div>
                </Container>
            </Container>
        )
    }
}