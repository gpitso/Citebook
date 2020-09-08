import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Paperminbox from './Paperminbox.component';
import './PaperPost.css';
import IconButton from '@material-ui/core/IconButton';
import LikeImage from '@material-ui/icons/ThumbUpAltOutlined';











export default class PaperPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
        likes: this.props.likes
        }
    };

    componentWillReceiveProps(likes) { this.setState(likes); }

    clickMe = () => {
        this.props.handler()
    }

    render() {

       
        const {profilepic,name,text,paperName,paperphoto,likes,descr,paper} = this.props;

        
        return (
            <Container className="photobox" style={{"backgroundColor":"#FFFFFF","width":"100%","height":"100%","margin-top":"4%"}}>
            <Row>
                <Paperminbox
                    css={"yes"}
                    profilepic={profilepic}
                    photo={paperphoto}
                    name={name}
                    text={text}
                    paperName={paperName}
                />
            </Row>  
                <img className="paper" style={{"width":"100%","height":"200px"}} src={paperphoto}/>
            <Row style={{"margin-top":"1%"}} >
                <IconButton color="secondary" onClick={this.clickMe}>
                    <LikeImage/>
                </IconButton>
                <div>{likes}</div>
            </Row>
            <Row>
                <div className="description" style={{"backgroundColor":"#FFFFFF","padding-top":"0%",textAlign:"left","padding": "2% 2% 3% 2%"}} className="Descriptionbox">
                {descr}...<a style={{"color":"red","fontWeight":"bold"}}>more</a>
                </div>
            </Row>
      </Container>
        )
    }
}