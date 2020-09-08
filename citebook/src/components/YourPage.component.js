import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Undertitle from './Undertitle.component';
import IconText from './IconText.component';
import axios from 'axios';


import Friends from '@material-ui/icons/PeopleAltOutlined';
import ActivePapers from '@material-ui/icons/LibraryBooksOutlined';
import UploadedPapers from '@material-ui/icons/CollectionsBookmarkOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Level from '@material-ui/icons/SchoolOutlined';
import LastCitation from '@material-ui/icons/ThumbUpAltOutlined';


const User = [                               //User Details DATABASE EXTRACTION NEEDED
    {Friends:3,Uploaded:8,Active:5,Level:3,LastCitation:'14/03'}
];




export default class YourPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id:'',
         person:'',
         friendscount:'',
         uploadedpaperscount:'',
         activepaperscount:'',
         levelcount:'',
         lastcitation:''
        }
    };
    componentWillMount() {  
        this.setState({
            user_id:this.props.id
          });

          axios.get('/api/user/'+this.props.id).then(res => {
                this.setState({
                  user_id: res.data._id,
                  person:Object.values(res.data)
                })
          })

          axios.get('/api/friends/'+this.props.id).then(res => {
            var friends=res.data;
            var counter=0;
            for(let i in friends){
                counter++;
            }
            this.setState({
                friendscount:counter
              });
          });

          axios.get('/api/getpendingpapers/'+this.props.id).then(res => {
            var pendingpapers=res.data;
            var counter=0;
            if(res.data!=''){
                for(let i in pendingpapers){
                    counter++;
                }
            }
            this.setState({
                uploadedpaperscount:counter
              });
          });

          axios.get('/api/getactivepapers/'+this.props.id).then(res => {
            var activepapers=res.data;
            var counter=0;
            if(res.data!=''){
                for(let i in activepapers){
                    counter++;
                }
            }
            this.setState({
                activepaperscount:counter
              });
          });
         
    }

    render() {
        
        return (
            <Container className="photobox" style={{"backgroundColor":"#FFFFFF","width":"80%","height":"100%"}}>
                <Row>
                    <div style={{"width":"100%","padding":"5% 0% 0% 7%",fontSize:"x-large",fontWeight:"bold"}}>{this.props.title}</div>
                    <Undertitle/>
                </Row>
                <Row>
                    <IconText title={"Friends :"} value={this.state.friendscount} Iconaki={Friends} />
                </Row>
                <Row>
                    <IconText title={"Uploaded Papers :"} value={this.state.uploadedpaperscount} Iconaki={UploadedPapers} />
                </Row>
                <Row>
                    <IconText title={"Active Papers :"} value={this.state.activepaperscount} Iconaki={ActivePapers} />
                </Row>
                <Row>
                    <IconText title={"Your Level :"} value={this.state.person[11]} Iconaki={Level} />
                </Row>
                <Row>
                    <IconText title={"Citation Points :"} value={this.state.person[12]} Iconaki={CheckBoxIcon} />
                </Row>
          </Container>    
        )
    }
}