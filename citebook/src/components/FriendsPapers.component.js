import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Paperminbox from './Paperminbox.component';
import './PaperPost.css';
import IconButton from '@material-ui/core/IconButton';
import LikeImage from '@material-ui/icons/ThumbUpAltOutlined';
import axios from 'axios';
import './FriendsPapers.css'
import CitationPopup from "./CitationPopup.component";



export default class FriendsPapers extends Component {

    constructor(props) {
        super(props);
        this.state = {
        user_id:'',
        likes: this.props.likes,
        paper_id:'',
        paper:'',
        buttontext:'Declare Citation',
        isButtonDisabled:false,
        papercited:false,
        showPopup:false,
        friend_id:'',
        date:''
        }
    };

    componentWillReceiveProps(likes,paperid,friend_id,date) { this.setState({likes:likes,paperid:paperid,date:date}); }

    componentWillMount() {  
        this.setState({
            paper_id:this.props.paperid,
            user_id:this.props.id,
            friend_id:this.props.friend_id          });

          axios.get('/api/paper/'+this.props.paperid).then(res => {
                let date =  new Date(res.data.publish_timer);
                this.setState({
                  paper_id: res.data._id,
                  paper:res.data,
                  friend_id:res.data.user_id,
                  date: date.toUTCString()
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

    clickMe = () => {
        this.setState({
            buttontext: "Citation Declared",
            isButtonDisabled: true
          })
          this.togglePopup();
    }

    togglePopup() {
        if(this.props.isfriend==1){
            this.setState({
                friend_id: this.props.id3,
                showPopup: !this.state.showPopup  
        });  
        }
        else{
            this.setState({
                user_id:this.props.id,
                showPopup: !this.state.showPopup  
        });  
        } 
       
    } 
    
    handler() {  
        this.setState({
            buttontext: "Declare Citation",
            isButtonDisabled:false 
        });  
    }  

    render() {
       
        const {profilepic,img,name,paperName,date} = this.props;

        if(this.props.paperid!="0"){
        return (
            <Container className="photobox" style={{"backgroundColor":"#FFFFFF","width":"100%","height":"100%","margin-top":"4%","marginBottom":"5%"}}>
            <Row>
                <Paperminbox
                    css={"yes"}
                    profilepic={img}
                    name={name}
                    text={"Date Needed"}
                    paperName={paperName}
                    id={this.state.user_id}
                    friend_id={this.state.friend_id}
                    date={this.state.date}
                    />
                <Row style={{"width":"100%","margin":"0% 0% 0% 1.4%"}}> 
                    <div className="titlespan" style={{"backgroundColor":"#FFFFFF"}}>
                            <span style={{"color":" rgb(122, 53, 53)","fontWeight":"bold","fontSize":"large"}}>Title : </span>
                            <span style={{"color":"black","fontSize":"large"}}>{this.state.paper.title}</span>
                    </div>
                </Row>
                <Row style={{"width":"100%"}}>
                    <div style={{"backgroundColor":"#FFFFFF","margin":"0% 0% 0% 3%"}}>
                        <span style={{"color":" rgb(122, 53, 53)","fontWeight":"bold","fontSize":"large"}}>Link :</span>
                        <a target="_blank" href={"http://"+this.state.paper.link} style={{"color":"blue","fontSize":"large"}}> {this.state.paper.link}</a>
                    </div>
                </Row>
                <Row  style={{"width":"100%","margin":"0% 0% 0% 1.5%"}}>
                    <div className="titlespan" style={{"backgroundColor":"#FFFFFF"}}>
                        <span style={{"color":" rgb(122, 53, 53)","fontWeight":"bold","fontSize":"large"}}>Venue : </span>
                        <span style={{"color":"black","fontSize":"large"}}>{this.state.paper.venue}</span>
                    </div>
                </Row>
                <Row style={{"width":"100%"}}>
                    <div style={{"backgroundColor":"#FFFFFF","margin":"0% 0% 0% 3.1%"}}>
                        <span className="" style={{"color":"grey","fontSize":"large"}}>Citations : </span>
                        <span style={{"color":"black","fontSize":"large"}}>{this.state.paper.citation_points}</span>
                    </div>
                </Row>
            
            </Row>  
            <Row><div class="line2"></div></Row>
         
            <Row className="rowbutton" style={{"margin-top":"0%","padding-bottom":"3.3%","width":"100%"}}>
                <div className="koutakias citate"><button disabled={this.state.isButtonDisabled} className="buttonaki" onClick={this.clickMe}  style={{"backgroundColor":"inherit","border":"none","color":"white"}}>{this.state.buttontext}</button>
                    <IconButton disabled={this.state.isButtonDisabled} className="likebutton" color="secondary" onClick={this.clickMe}>
                        <LikeImage/>
                    </IconButton>
                </div>
                <div class="line"></div>
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
        )
    }else return(null);
    }
}