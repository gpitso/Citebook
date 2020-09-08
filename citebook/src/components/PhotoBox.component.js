import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./PhotoBox.css"
import styled, { css } from 'styled-components'



const Button1 = styled.button`
  background-color:black ;
  color: white;
  font-size: 15px;
  padding: 15px 30px;
  border-radius: 5px;
  margin: 2% 0% 5% 100%;
  cursor: pointer;
`;

const Button2 = styled.button`
  background-color:black ;
  color: white;
  font-size: 15px;
  padding: 15px 30px;
  border-radius: 5px;
  margin: 2% 0% 5% 75%;
  cursor: pointer;
`;

export default class PhotoBox extends Component {


    ChooseAddFriend(friended,requested) {
        if (friended==0 && requested==0) {
          return <Button1 style={{"width":"100%"}} onClick={()=>{this.props.handler(0)}} className="">Add Friend</Button1>
        }
        else if(friended==0 && requested==1){
            return <Button2 style={{"width":"100%"}}  onClick={()=>{this.props.handler(1)}} className="">Accept Friend</Button2>
        }
        else return;
      }



    render() {

        const {profilepic,text,name,friended,requested,img} = this.props;

        return (
            <Container className="photobox" style={{"margin-bottom":"3%","backgroundColor":"#FFFFFF","width":"80%","height":"100%"}}>
                <Row className="resizeimg">
                    <img className="imagecorner" style={{"width":"100%","height":"100%"}} src={img}/>
                </Row>  
                    <div style={{"width":"100%","backgroundColor":"#FFFFFF","padding-top":"10%",textAlign:"center",fontSize:"x-large",fontWeight:"bold"}} className="Descriptionbox">
                    {name}
                    </div>
                <Row>
                    <div className="botcorner" style={{"width":"100%","backgroundColor":"#FFFFFF","padding-top":"2%",textAlign:"center","padding": "6% 2% 6% 2%"}} className="Descriptionbox">
                        {text}
                    </div>
                </Row>
                <Row>
                    <div>{this.ChooseAddFriend(friended,requested)}</div>
                </Row>
          </Container>
        )
    }
}