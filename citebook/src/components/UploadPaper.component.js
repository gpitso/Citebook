import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import "./UploadPaper.css"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Popup from "./Popup.component";


export default class UploadPaper extends Component {

    constructor(props){  
        super(props);  
        this.state = { 
            showPopup: false,
            title:'',
            user_id:this.props.id
        };  
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    componentWillReceiveProps() { 
        this.setState({
            user_id:this.props.id
    });  
    }

    togglePopup() {  
        this.setState({
                user_id:this.props.id,
                showPopup: !this.state.showPopup  
        });  
    }  
    render() {

        const {profilepic,id,friendornot,name} = this.props;

        if(friendornot=="yes"){
            return(
                <div className="barupload photobox" style={{"backgroundColor":"#FFFFFF","height":"15%"}}>
                <div className="friendbar">{name}'s Papers</div>
            </div>
            )
        }

        return (
           <div className="barupload photobox" style={{"backgroundColor":"#FFFFFF","height":"15%"}}>
            <div className="profpicin"><img className="photobox" style={{"width":"80%","height":"7%",borderRadius:"50%"}} src={this.props.img}/></div>
            <div className="inputbar"><form><input onChange={this.handleChange} name="title" placeholder="Enter a title for the paper..." style={{"width":"100%"}} type="text"/></form></div>
            <div className="uploadbutton"><Button onClick={this.togglePopup.bind(this)} variant="contained" size="medium" color="default" startIcon={<CloudUploadIcon />} >Upload</Button></div>
            <div>{this.state.showPopup ?  
                <Popup
                  id={id}
                  title={this.state.title}
                  text='Fill the Paper Details'  
                  closePopup={this.togglePopup.bind(this)}  
                />  
                : null  
                }  
            </div>
           </div>
        )
    }
}