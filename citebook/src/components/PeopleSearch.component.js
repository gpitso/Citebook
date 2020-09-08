import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Navbar from "./NavbarLogged.component";
import './PaperPost.css';
import LoggedInNavbar from './LoggedInNavbar.component';
import "./Friends.css";
import AddFriendBox from './AddFriendBox.component';

import uknown from '../emptyface.jpg';


export default class PeopleSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id: '',
         friends:'',
         person:'',
         peoplename:''
        }
    };

    componentWillMount() {  
        this.setState({
            user_id:this.props.match.params.id,
            peoplename:this.props.match.params.peoplename,
        });

        axios.get('/api/user/'+this.props.match.params.id).then(res => {
                this.setState({
                  user_id: res.data._id,
                  person:res.data
                })
              })

          axios.post('/api/peopleresult/'+this.props.location.peoplename+'/'+this.props.match.params.id).then(res => {
            console.log("ela2"+res); 
            this.setState({
              friends:Object.values(res.data)
            })
            this.forceUpdate();
          });
         
    }

    handler=(friends) => {
        this.setState({
          friends: Object.values(friends)
        },function () {
            console.log("Friendlist Changed");
        }) 
    }

    render() {
        
        return (
            <div>
                <Navbar id={this.props.match.params.id}/>
            <div style={{"padding-bottom":"3%","overflow":"auto","height":"100vh","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                <LoggedInNavbar id={this.state.user_id} choice={""}/>
                <div className="FriendsTitlebar">
                People Search Result
                </div>
                <Grid className="Friendbox" container spacing="9">
                    {this.state.friends && this.state.friends.map((e, idx) => 
                        <Grid style={{"margin":"0 auto"}}item xs="3"><AddFriendBox search={1} handler={this.handler} id={this.state.user_id} friend_id={e._id} photo={e.img} name={e.fname+" "+e.lname} key={idx}/></Grid>
                    )}

                    {this.state.friends=='' ?  <div style={{marginTop:"5%",marginBottom:"5%",width:"100%",fontWeight:"bold",fontSize:"xx-large",textAlign:"center"}}>0 Search Results</div> : ""}
                </Grid>
            </div>  
            </div>               
        )
    }
}