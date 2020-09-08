import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Navbar from "./NavbarLogged.component";




import './PaperPost.css';
import LoggedInNavbar from './LoggedInNavbar.component';
import "./Friends.css";
import AddFriendBox from './AddFriendBox.component';

import kondylak from '../kondylak.jpg';  //DATABASE EXTRACTIONS
import kostas from '../kostas.jpg';
import xristina from '../xristina.jpg';
import mairh from '../mairh.jpg';
import xristos from '../xristos.jpg';
import giorgos from '../giorgos.jpg';
import uknown from '../emptyface.jpg';



const FriendsListed = [                                    //FRIEND DATABASE EXTRACTION NEEDED
    {photo:kondylak,name:'Haridimos Kondylakis',text:'kondylak@gmail.com'},
    {photo:xristina,name:'Xristina Papadopoulou',text:'xristina@gmail.com'},
    {photo:kostas,name:'Kostas Kostakopoulos',text:'kostaskostk@gmail.com'}
    ];



export default class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id: '',
         friends:'',
         person:''
        }
    };

    componentWillMount() {  

        this.setState({
            user_id:this.props.match.params.id
        });

        axios.get('/api/user/'+this.props.match.params.id).then(res => {
            console.log("ela1"+res); 
                this.setState({
                  user_id: res.data._id,
                  person:res.data
                })
              })

          axios.get('/api/friends/'+this.props.match.params.id).then(res => {
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

       
        const {profilepic,name,text,paperName,paperphoto,likes,descr} = this.props;

        
        return (
            <div>
                <Navbar id={this.props.match.params.id}/>
            <div style={{"padding-bottom":"3%","overflow":"auto","height":"100vh","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                <LoggedInNavbar id={this.state.user_id} choice={2}/>
                <div className="FriendsTitlebar">
                Friends
                </div>
                <Grid className="Friendbox" container spacing="9">
                    {this.state.friends && this.state.friends.map((e, idx) => 
                        <Grid style={{"margin":"0 auto"}}item xs="3"><AddFriendBox friends={this.state.friends} handler={this.handler} id={this.state.user_id} friend_id={e._id} photo={e.img} name={e.fname+" "+e.lname} key={idx}/></Grid>
                    )}
                    {this.state.friends== ''? <div style={{"width":"100%","marginTop":"2%","marginBottom":"2%","fontSize":"xx-large","textAlign":"center"}}>You don't have any friends yet.</div> : ""}
                </Grid>
            </div>  
            </div>               
        )
    }
}