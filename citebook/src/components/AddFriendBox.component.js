import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Profileminibox from './Profileminbox.component';
import './PaperPost.css';
import IconButton from '@material-ui/core/IconButton';
import LikeImage from '@material-ui/icons/ThumbUpAltOutlined';
import LoggedInNavbar from './LoggedInNavbar.component';
import "./AddFriendBox.css";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import {Link,NavLink} from "react-router-dom";
import FriendPage from './FriendPage.component';
import axios from 'axios';



export default class AddFriendBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.likes,
            user_id:this.props.id,
            friend_id:this.props.friend_id,
            isfriends:''
        }
        this.HandleDelete = this.HandleDelete.bind(this);
    };

    componentWillMount(){

    }

    HandleDelete(event) {
   
        this.setState({
            user_id: this.props.id,
            friend_id:this.props.friend_id
        })

        axios.post('/api/deletefriendship/',{
            params: {
                user_id:this.props.id,
                friend_id:this.props.friend_id
              }
        }).then(res => {
            axios.get('/api/friends/'+this.props.id).then(result => {
                this.props.handler(result.data);
              });
          })
    }
    
    render() {

       
        const {name,photo,search} = this.props;
        let x;
        
        
        return (
            <Container>
                <div className="photodivbox ">
                    <img className="photocss photobox resizeimg2" style={{"width":"100%"}} src={photo}/>
                    <p className="namecontainer"><Link className="namecontainer2" to={{pathname:'/FriendPage/'+this.props.friend_id,state: {friend_id:this.props.friend_id,id:this.props.id} }}>{name}</Link></p>
                    {search==1 ?  '' : <Button size='lg' className="photobox deletef" onClick={this.HandleDelete} variant="link">Delete Friend</Button>}
                </div>
            </Container>
        )
    }
}