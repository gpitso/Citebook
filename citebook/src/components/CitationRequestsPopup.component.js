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
import CitationRequestsBox from './CitationRequestsBox.component';
import './CitationRequestsPopup.css'







const Button1 = styled.button`
  background-color:black ;
  color: white;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

class CitationRequestsPopup extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user_id:this.props.id,
            requests:'',
            requestcount:'',
            redirect: false,
            friend_id:''
         };
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
    
    axios.get('/api/getcitationrequests/'+this.props.id).then(res => {
        this.setState({
            requests:Object.values(res.data),
            requestscount:res.data.length
        })
      });

   }

   handler=() => {

    axios.get('/api/getcitationrequests/'+this.props.id).then(res => {
        this.setState({
            requests:Object.values(res.data),
            requestscount:res.data.length
        })
      });
   }

  

  render() {  

    return (  
        <div className='popup' style={{"display":"flex"}}>  
            <div className='popup_open popupcss'>  
                <h1>Citation Requests</h1>
                <Container className="">
                {this.state.requests && this.state.requests.map((e, idx) =>
                   <CitationRequestsBox handler={this.handler} paperto={e.paper_to} user_id={this.state.user_id} authors={e.authors} paperfrom={e.paper_from} requestid={e._id} key={idx} request={e}></CitationRequestsBox>
                )}
                {!this.state.requests || this.state.requests=='' ? <div style={{"marginTop":"20%","fontSize":"x-large","width":"100%","textAlign":"center"}}>No Citation Requests</div> :<div></div>}
                </Container>
                <div className="uploadbuttons1"><Button1 className="uploadbuttons13" onClick={this.props.closePopup}>Go back</Button1></div>                  
            </div> 
            
        </div>  
    );  
}
}  

export default CitationRequestsPopup;