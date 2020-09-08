import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import "./IconText.css";



export default class IconText extends Component {

    render() {

        const Iconaki = this.props.Iconaki;
        const {value,title} = this.props;



        return (
            <div className="ContainerBox2">
                <div id="photo" style={{"text-align": "center"}}>  </div>
                <Iconaki fontSize="large" color="action" className="IconImg" />
                <span className="IconText" style={{"vertical-align":"middle"}}>{title} {value}</span>
            </div>
        )
    }
}