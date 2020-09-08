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
import CloseIcon from '@material-ui/icons/Close';

import {Redirect} from "react-router-dom";
import './RequestPopup.css';






const Button1 = styled.button`
  background-color:black ;
  color: white;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

class RequestPopup extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user_id:this.props.id,
            requests:'',
            requestcount:'',
            redirect: false,
            friend_id:''
         };
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleDelete = this.handleDelete.bind(this);

    };

    componentWillReceiveProps() { 
        this.setState({
            user_id:this.props.id,
        });  
    }

   componentWillMount(){

    this.setState({
        user_id:this.props.id
    });
    
    axios.get('/api/getrequests/'+this.props.id).then(res => {
        this.setState({
            requests:Object.values(res.data),
            requestscount:res.data.length
        })
      });
   }

   handleSubmit(friend_id) {
      axios.post('/api/makefriend/',{
        params: {
            user_id:this.props.id,
            friend_id:friend_id
        }
      }).then((response) => {
        console.log(response);
        this.props.closePopup();
      }, (error) => {
        console.log(error);
      });
    }

    handleDelete(friendid) {
      axios.post('/api/declinefriend/',{
        params: {
           user_id:this.props.id,
           friend_id:friendid
        }
      }).then((response) => {
        this.props.closePopup();
         
      }, (error) => {
        console.log(error);
      });
    }


    setRedirect = (friendid) => {
        console.log("griogos")
        this.setState({
          redirect: true,
          friend_id: friendid
        })
    }
        
    renderRedirect (){
        if (this.state.redirect) {
            console.log("hr"+this.props.id);
          return <Redirect to={{pathname:'/FriendPage/'+this.state.friend_id,state: {friend_id:this.state.friend_id,id:this.props.id} }}/>
        }
      }
  

  render() {  

    return (  
        <div className='popup'>  
            <div className='popup_open popupcss2'>  
            {this.renderRedirect()}
                <h1>{this.props.text}</h1>
                <Container className="">
                {this.state.requests && this.state.requests.map((e, idx) =>
                    <div className="requestbox">
                        <div className="sameline div1"><div className="sameline" onClick={() => this.setRedirect(e._id)} >{e.fname+" "+e.lname}</div>
                        <Button className="buttond" onClick={() => this.handleSubmit(e._id)} variant="contained" size="medium" color="default" startIcon={<CheckCircleIcon/>}></Button>
                        <Button className="buttond" onClick={() => this.handleDelete(e._id)} variant="contained" size="medium" color="default" startIcon={<CloseIcon/>}></Button></div>
                    </div>


                )}
                {!this.state.requests || this.state.requests=='' ? <div style={{"marginTop":"15%","fontSize":"x-large","width":"100%","textAlign":"center"}}>No Friend Requests</div> :<div></div>}
                </Container>
                <div className="uploadbuttons1"><Button1 className="uploadbuttons12" onClick={this.props.closePopup}>Cancel</Button1></div>                  
            </div> 
            
        </div>  
    );  
}
}  

export default RequestPopup;