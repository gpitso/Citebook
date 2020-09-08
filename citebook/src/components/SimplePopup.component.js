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

class Popup extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user_id:this.props.id,
            title:this.props.description,
            description:'',
         };
      
    };

    componentWillMount() { 
        this.setState({
            user_id:this.props.id,
            description:this.props.description,
            title:this.props.title
    });  
    }


  render() {  
    return (  
        <div className='popup'>  
            <div className='popup_open'>  
                <h1>{this.props.title}</h1>
                <div className="textpopup">{this.props.text}</div>
                <div className="text2popup">{this.props.text2}</div>
                <div className="uploadbuttons12"><Button1 className="uploadbuttons123" onClick={this.props.closePopup}>Cancel</Button1></div>
            </div> 
        </div>  
    );  
  }  
}  
export default Popup;