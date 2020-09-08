import React, { Component } from 'react';
import Profileminbox from './Profileminbox.component';
import { Container, Row, Col } from 'reactstrap';
import Undertitle from './Undertitle.component';



export default class Generalbox extends Component {
  
    handler=(response) => {
      this.props.handler();
    }   

    render() {
        const {text,list,title,photo,id} = this.props;
        return (
            <Container className="photobox" style={{"margin-top":"5%","backgroundColor":"#FFFFFF","width":"80%","height":"100%"}}>
                <Row>
                    <div style={{"width":"100%","padding":"5% 0% 0% 7%",fontSize:"x-large",fontWeight:"bold"}}>{title}</div>
                    <Undertitle/>
                </Row> 
                {list&& list.map((e, idx) => 
                    <Row>
                        <Profileminbox
                        handler={this.handler}
                        ReRender={this.ReRender}
                        id={id}
                        friend_id={e._id}
                        profilepic={e.img}
                        name={e.fname+" "+e.lname}
                        key={idx}
                        text={text}
                        />
                    </Row>
                  )}
                  {list== ''? <div style={{"marginTop":"2%","paddingBottom":"4%","fontSize":"large","textAlign":"center"}}>You don't have any friends yet.</div> : ""}
               
          </Container>    
        )
    }
}