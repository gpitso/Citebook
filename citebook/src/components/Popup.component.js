import React from 'react';  
import './Popup.css';
import { Container, Row, Col } from 'reactstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import styled, { css } from 'styled-components'
import axios from 'axios';




const Button1 = styled.button`
  background-color:black ;
  color: white;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const Button2 = styled.button`
  background-color: rgb(87, 33, 33);
  color: white;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const Button3 = styled.button`
  background-color: rgb(122, 53, 53);
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
            title:this.props.title,
            field:'',
            link:'',
            venue:''
         };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillReceiveProps() { 
        this.setState({
            user_id:this.props.id,
    });  
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.title=="" || this.state.venue=="" || this.state.link=="") {
          this.setState({
            field: 'Fill all the fields and try again!'
          })
        }
        else{
          this.setState({
            field: ''
          })

          var partsOfStr = this.state.authors.split(',');
          console.log("authors:"+ partsOfStr)

          axios.post('/api/newpaper',{
            params: {
                id:this.state.user_id,
                title: this.state.title,
                likes:0,
                citatedby:'0',
                link:this.state.link,
                active:0,
                pending:0,
                citatedby:0,
                citation_points:0,
                publish_timer:"",
                venue:this.state.venue,
                authors: partsOfStr
            }
          }).then((response) => {
            console.log(response);
            this.props.closePopup();
          }, (error) => {
            console.log(error);
          });
        }
      }


  render() {  
    
    let titlee='';

    if(this.props.title==''){
      titlee="Enter the title"
    }
    else{
      titlee=this.props.title
    }

    return (  
        <div className='popup'>  
            <div className='popup_open popupcss'>  
                <h1>{this.props.text}</h1>
                <Container className="boxinputs2">
                    <Form className="formre">
                        <Form.Group controlId="">
                            <Form.Label  style={{"color":"rgb(19, 18, 18)"}}>Title of the Paper<span style={{"color":"red"}}>*</span></Form.Label>
                            <Form.Control onChange={this.handleChange} name="title" value={this.state.title} type="title" placeholder={titlee} className="margin-inputs"/>
                        </Form.Group>
                        <Form.Group controlId="">
                            <Form.Label style={{"color":"rgb(19, 18, 18)"}}>Venue of the Paper<span style={{"color":"red"}}>*</span></Form.Label>
                            <Form.Control onChange={this.handleChange} name="venue" value={this.state.venue} placeholder={"Enter the venue"} type="venue" className="margin-inputs"/>
                        </Form.Group>
                        <Form.Group controlId="">
                            <Form.Label style={{"color":"rgb(19, 18, 18)"}}>Link<span style={{"color":"red"}}>*</span></Form.Label>
                            <Form.Control onChange={this.handleChange} name="link" value={this.state.link} placeholder={"Enter the link to the paper"} type="link" className="margin-inputs"/>
                        </Form.Group>
                        <Form.Group controlId="">
                            <Form.Label style={{"color":"rgb(19, 18, 18)"}}>Authors<span style={{"color":"red"}}>*</span></Form.Label>
                            <Form.Control onChange={this.handleChange} name="authors" value={this.state.authors} placeholder={"Enter authors -separated by comma-"} type="link" className="margin-inputs"/>
                        </Form.Group>
                    </Form>
                </Container>
                <div className="uploadbuttons">
                    <div className="uploadbuttons1"><Button1 className="uploadbutton1" onClick={this.props.closePopup}>Cancel</Button1></div>
                    <div className="uploadbuttons2">
                        <Button3 onClick={this.handleSubmit} className="uploadbutton3">Submit</Button3>
                    </div>
                </div>
                <div style={{"marginTop":"0.5%","marginLeft":"8.4%","color":"Red"}}>{this.state.field}</div> 
            </div> 
            
        </div>  
    );  
  }  
}  
export default Popup;