import React from 'react';  
import styled from 'styled-components'
import axios from 'axios';
import './CitationPopup.css';
import Form from 'react-bootstrap/Form';





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

class CitationPopup extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user_id:this.props.id,
            papers:'',
            value:'Select a paper...',
            friend_id:this.props.friend_id,
            authors:''
         };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleCancel = this.handleCancel.bind(this);
    };

    componentWillReceiveProps(friend_id) { 
        this.setState({
            user_id:this.props.id,
            friend_id:friend_id
        });  
    }

    componentWillMount(){
        axios.get('/api/getpapers/'+this.props.id).then(res => {
          if(res.data!='' || res.data!=""){
            this.setState({
              papers:res.data,
              user_id:this.props.id,
              value:res.data[0]._id,
              friend_id:this.props.friend_id,
              authors: ''
            })
          }
      });
    }

    handleChange(evt) {
        console.log( evt.target.value);
        this.setState({ [evt.target.name] : evt.target.value });
    }

    handleCancel(event){
      event.preventDefault();
      this.props.closePopup();
      this.props.handler();
    }
    handleSubmit(event) {
        console.log("mpainw sybmit")
        event.preventDefault();
        var partsOfStr = this.state.authors.split(',');
        axios.post('/api/citatepaper',{
          params: {
              user_id:this.props.id,
              paper_id:this.props.paper_id,
              friend_id:this.props.friend_id,
              papertodeclare: this.state.value,
              authors:partsOfStr
          }
        }).then((response) => {
          axios.post('/api/increasecitation/',{
            params: {
              user_id:this.props.id
            }
          })
          
          console.log(response);
        }, (error) => {
          console.log(error);
        });

        if(this.state.value=='Select paper...') {
          this.setState({
            field: 'Fill all the fields and try again!'
          })
        }
        else{
          this.setState({
            field: ''
          })
          console.log("prin to req:"+this.state.value)
          axios.post('/api/declarecitation',{
            params: {
                user_id:this.state.friend_id,
                paperfrom:this.state.value,
                paperto: this.props.paper_id
            }
          }).then((response) => {
            console.log("declared citation")
            console.log(response);
            this.props.closePopup();
           
          }, (error) => {
            console.log("declared error")
            console.log(error);
          });
        }
      }


  render() {  
    return (  
        <div className='popup'>  
            <div className='popup_open'>  
                <h1>{this.props.text}</h1>
                <Form style={{"width":"100% !important"}} className="formre">
                  <Form.Group controlId="">
                    <label style={{"width":"100%"}}>
                      <div className="textpopup2">Choose the paper to declare the citation to:</div>
                        <select className="inputboxx" name="value" value={this.state.value} onChange={this.handleChange}>
                            {this.state.papers&& this.state.papers.map((k, idx) =>
                                <option key={idx} value={k._id}>{k.title}</option>
                            )}
                        </select>
                    </label>
                  </Form.Group>
                </Form>
                <Form className="formre">
                  <Form.Group controlId="">
                    <Form.Label style={{"font-size":"large","font-weight":"bold","color":"rgb(87, 33, 33)"}}>Authors:<span style={{"color":"red"}}>*</span></Form.Label>
                    <Form.Control onChange={this.handleChange} name="authors" value={this.state.authors} placeholder={"Enter the authors -separated by comma-"} type="authors" className="margin-inputs"/>
                  </Form.Group>
                </Form>
                <div className="buttoncontainer">
                    <div className="uploadbuttons1 b1"><Button1 className="uploadbutton12" onClick={this.handleCancel} >Cancel</Button1></div>
                    <div className="uploadbuttons1 b2"><Button3 onClick={this.handleSubmit} className="uploadbutton32">Submit</Button3></div>
                </div>
                <div style={{"marginTop":"0.5%","marginLeft":"8.4%","color":"Red"}}>{this.state.field}</div> 
            </div> 
            
        </div>  
    );  
  }  
}  
export default CitationPopup;