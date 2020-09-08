import React from 'react';  
import './Popup.css';
import { Container, Row, Col } from 'reactstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import styled, { css } from 'styled-components'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Redirect} from "react-router-dom";
import './RequestPopup.css';
import CloseIcon from '@material-ui/icons/Close';
import Moment from 'react-moment';
import ArchiveIcon from '@material-ui/icons/Archive';







const Button1 = styled.button`
  background-color:black ;
  color: white;
  font-size: 20px;
  padding: 5px 5px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

class CitationRequestsBox extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user_id:this.props.user_id,
            fname:'',
            lname:'',
            friend_id:'',
            request:'',
            requestid:'',
            title:'',
            authors:'',
            date:'',
            citatedtitle:''
         };
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleArchive = this.handleArchive.bind(this);
         this.handleDelete = this.handleDelete.bind(this);
    };

    componentWillReceiveProps() { 
        this.setState({
            user_id:this.props.id,
            request:this.props.request,
            requestid:this.props.requestid
        });  
    }

   componentWillMount(){

    this.setState({
        user_id:this.props.id,
        request:this.props.request,
        requestid:this.props.requestid,
        authors: this.props.authors
    });

    let specific;
    
    if(this.props.choice=="archived") specific='datediffarchived'
    else specific='datediff'

    axios.get('/api/'+specific+'/'+this.props.requestid).then(res => {
      var duration= ((res.data[0].dateDifference))/86400000;
      var duration2=180-duration;
      this.setState({
        date: Number(duration2.toFixed(0))
      })
      duration=duration/30
      if(duration>=6){
        axios.post('/api/deletecitation/',{
          params: {
             request_id:this.props.requestid
          }
        }).then((response) => {

            console.log(response);
            axios.post('/api/penalty/',{
                params: {
                   user_id:this.props.request.user_id,
                   paper_from: this.state.request.paper_from,
                   paper_to: this.state.request.paper_to,
                   friend_id: this.state.request.friend_id
                }
              }).then((response) => {
                console.log(response);
                
                this.props.handler();
                // this.props.closePopup();
              }, (error) => {
                console.log(error);
              })
            // this.props.closePopup();
        }, (error) => {
          console.log(error);
        });
      }
    })

    
    axios.get('/api/user/'+this.props.request.user_id).then(res => {
        this.setState({
            fname: res.data.fname,
            lname: res.data.lname
        })
      });

      axios.get('/api/paper/'+this.props.paperfrom).then(res => {
        this.setState({
            title: res.data.title,
        })
    })

    axios.get('/api/paper/'+this.props.paperto).then(res => {
      this.setState({
          citatedtitle: res.data.title
      })
  })
   }

   handleSubmit() {

    if(this.props.choice=="archived"){
      axios.post('/api/deletearchivedrequestcitation/',{
        params: {
           request_id:this.props.requestid
        }
      }).then((response) => {
        
        this.props.handler(this.state.user_id);
       
      }, (error) => {
        console.log(error);
      });
    }
    else 
    {
      axios.post('/api/deleterequestcitation/',{
        params: {
           request_id:this.props.requestid
        }
      }).then((response) => {
        this.props.handler(this.state.user_id);
       
      }, (error) => {
        console.log(error);
      });
    }
  }

    handleDelete() {
        axios.post('/api/deletecitation/',{
          params: {
             request_id:this.props.requestid
          }
        }).then((response) => {

            console.log(response);
            axios.post('/api/penalty/',{
                params: {
                   user_id:this.props.request.user_id,
                   paper_from: this.state.request.paper_from,
                   paper_to: this.state.request.paper_to,
                   friend_id: this.state.request.friend_id
                }
              }).then((response) => {
                console.log(response);
                
                this.props.handler();
                // this.props.closePopup();
              }, (error) => {
                console.log(error);
              })
            // this.props.closePopup();
        }, (error) => {
          console.log(error);
        });
      }


    handleArchive() {
        axios.post('/api/citationarchive/',{
          params: {
             request_id:this.props.requestid
          }
        }).then((response) => {
          this.props.handler();
        }, (error) => {
          console.log(error);
        });
      }




    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }
        
    renderRedirect (){
        if (this.state.redirect) {
          return <Redirect to={{pathname:'/FriendPage/'+this.state.request.user_id,state: {id:this.state.request.friend_id} }}/>
        }
      }
  

  render() {  

    let x;
    if(this.props.choice=="archived")
    {
      x= <Button style={{"margin-bottom":"15%","width":"40%"}} className="buttond" onClick={() => this.handleDelete()} variant="contained" size="large" color="default" startIcon={<CloseIcon/>}></Button>;
    }
    else
    {
      x= <Button style={{"margin-bottom":"15%","width":"40%"}} className="buttond" onClick={() => this.handleArchive()} variant="contained" size="large" color="default" startIcon={<ArchiveIcon/>}></Button>;
    }

    return (  
            <Container style={{"margin-top":"2%","padding-top":"1%","border":"1px solid black"}}className="photobox">
              {this.renderRedirect()}
                <div  style={{"width":"70%","display": "inline-block"}} className="requestbox">
                    <div style={{ "width":"100%","flex-wrap": "wrap","display":"flex"}}>
                        <div style={{"font-weight":"bold","margin-right":"1%","color":"rgb(122, 53, 53)"}}>Title : </div>
                        <div>{this.state.title}</div>
                    </div>
                    <div style={{"width":"100%","flex-wrap": "wrap","display":"flex"}}>
                        <div style={{"font-weight":"bold","margin-right":"1%","color":"rgb(122, 53, 53)"}}> Authors : </div>
                        {this.state.authors && this.state.authors.map((e,idx)=> <div>{e},</div> )}
                    </div>
                    <div style={{ "width":"100%","flex-wrap": "wrap","display":"flex"}}>
                        <div style={{"font-weight":"bold","margin-right":"1%","color":"rgb(122, 53, 53)"}} className="sameline" onClick={() => this.setRedirect()}>Declared Citation from : </div>
                        <div style={{}}>{this.state.fname+" "+this.state.lname} </div>
                    </div>
                    <div style={{ "width":"100%","flex-wrap": "wrap","display":"flex"}}>
                        <div style={{"font-weight":"bold","margin-right":"1%","color":"rgb(122, 53, 53)"}} className="sameline" onClick={() => this.setRedirect()}>Citated your Paper with title : </div>
                        <div style={{}}>{this.state.citatedtitle} </div>
                    </div>
                    <div style={{ "width":"100%","flex-wrap": "wrap","display":"flex"}}>
                        <div style={{"font-weight":"bold","margin-right":"1%","color":"rgb(122, 53, 53)"}} className="sameline" onClick={() => this.setRedirect()}>Days Left to Confirm : </div>
                        <div>{this.state.date}</div>
                    </div> 
                </div>
                <div style={{"display": "inline-block","width":"30%"}}>
                  <Button style={{"margin-bottom":"15%","width":"40%"}} className="buttond" onClick={() => this.handleSubmit()} variant="contained" size="large" color="default" startIcon={<CheckCircleIcon/>}></Button>
                  {x}
                </div>
            </Container>
    );  
}
}  

export default CitationRequestsBox;