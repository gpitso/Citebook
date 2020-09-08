import React from 'react';  
import './Popup.css';
import { Container, Row, Col } from 'reactstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import styled, { css } from 'styled-components'
import axios from 'axios';
import './SimplePopup.css';



const Button1 = styled.button`
  background-color:black ;
  color: white;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

class RedirectPopup extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            towhere:this.props.link,
            title:this.props.title,
         };
      
    };

    componentWillMount() { 
        this.setState({
            towhere:this.props.link,
            title:this.props.title
    });  
    }


  render() {  
    return (  
        <div className='popup'>  
            <div className='popup_open'>  
                <h1 style={{"marginTop":"2%"}}>Do u want to open a new tab to review the "{this.state.title}" ?</h1>
                <div style={{"marginTop":"15%","marginLeft":"33%"}}>
                    <a style={{"font-size":"xxx-large"}} className="textpopup" onClick={this.props.closePopup}>No</a>
                    <a style={{"font-size":"xxx-large","color":"rgb(119, 25, 25)","marginLeft":"25%"}} target="_blank" rel="noopener noreferrer" href={"http://"+this.state.towhere}>Yes</a> 
                </div>      
            </div> 
        </div>  
    );  
  }  
}  
export default RedirectPopup;