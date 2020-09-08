import React, { Component } from 'react';
import "./Dashboard.css"
import axios from 'axios';
import Navbar from "./NavbarLogged.component";


import { Container, Row, Col } from 'reactstrap';
import LoggedInNavbar from './LoggedInNavbar.component';
import PhotoBox from './PhotoBox.component';
import UploadPaper from './UploadPaper.component';
import Generalbox from './Generalbox.component';
import PaperPost from './PaperPost.component';
import FriendsPapers from './FriendsPapers.component';
import YourPage from './YourPage.component';


import kondylak from '../kondylak.jpg';  //DATABASE EXTRACTIONS
import kostas from '../kostas.jpg';
import xristina from '../xristina.jpg';
import mairh from '../mairh.jpg';
import xristos from '../xristos.jpg';
import giorgos from '../giorgos.jpg';
import profilepic from '../profilepic.jpg';
import profilepic2 from '../paperprofilepic.jpg';

import paper1 from '../paper1.jpg';
import paper2 from '../paper2.png';
import uknown from '../emptyface.jpg';
import papernull from '../papernull.jpg';





    const MyPaperPosts = [                                    //MYPAPERS DATABASE EXTRACTION NEEDED
        {profilepic:profilepic2,name:'Pitsounis Gewrgios',photo:paper1,date:'Published: June 2,2020 19:00PM',likes:'7',descr:"Python’s simplicity lets you become productive quickly, but this often means you aren’t using everything it has to offer. With this hands-on guide, you’ll learn how to write effective,idiomatic Python code by leveraging its best—and possibly most neglected—features"}
     ];

     const FriendsPapersPosts = [                                    //FRIENDSPAPERS DATABASE EXTRACTION NEEDED
        {profilepic:kondylak,name:'Haridimos Kondylakis',photo:paper2,date:'Published: June 5,2020 13:34PM',likes:'7',descr:"NoSQL (Not only SQL) is a database used to store large amounts of data. NoSQL databases are distributed, non-relational, open source and are horizontally scalable (in linear way)"}
    //     {photo:paper2,date:'Published: June 5,2020 13:34PM',likes:'7'}
     ];

export default class FriendPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id:'',
         friend_id:'',
         updatedKey:"yes",
         updatedKeyF:"yes",
         loggedIn: true,
         person: '',
         suggested:'',
         papers:'',
         handle:"1",
         friends:'',
         friended:0,
         requested:0
        }
    };
    
    componentDidMount() {  
        this.setState({
            user_id:this.props.location.state.id,
            friend_id:this.props.location.state.friend_id
          });

          axios.get('/api/user/'+this.props.match.params.id).then(res => {
                this.setState({
                  friend_id: res.data._id,
                  person:res.data
                })
              })



          axios.get('/api/getpapers/'+this.props.match.params.id).then(res => {
            this.setState({
              papers:Object.values(res.data)
            }) 
          });

          axios.get('/api/friends/'+this.props.match.params.id).then(res => {
            this.setState({
              friends:Object.values(res.data)
            }) 
          });

    }

    componentWillMount(){
 
      axios.get('/api/user/'+this.props.location.state.id).then(res =>{
     
        for(let i in res.data.friends){
          console.log("mpika"+res.data.friends)
          if(res.data.friends[i]==this.props.location.state.friend_id){
            this.setState({
              friended:1
            })
          }
        }
          
        for(let i in res.data.requests){
          if(res.data.requests[i]==this.props.location.state.friend_id){
            this.setState({
              requested:1
            })
          }
        }

      })
    }

    handleLikes = () => {
        MyPaperPosts[0].likes++;
        this.setState({
            updatedKey:"no" 
          });
        console.log(MyPaperPosts[0].likes);
        console.log(this.state.user_id);
        console.log(this.state.friends);
    }


    handleLikesF = () => {
        FriendsPapersPosts[0].likes++;
        this.setState({
            updatedKeyF:"no" 
          });
        console.log(FriendsPapersPosts[0].likes);
    }
    
    HandleButton= (choice) =>{
      if(choice==0){
        axios.post('/api/makerequest',{
          params: {
            user_id:this.state.user_id,
            friend_id:this.state.friend_id
          }
        }).then((response) => {
          this.setState({
            friended:1
          });
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      }
      else{
        axios.post('/api/makefriend',{
          params: {
            user_id:this.state.user_id,
            friend_id:this.state.friend_id
          }
        }).then((response) => {
          this.setState({
            friended:1
          });
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      }
    }
    
    render() {


        return (
          <div style={{"height":"100vh !important"}}>
                <Navbar id={this.props.location.state.id}/>
            <div style={{"overflow":"auto" ,"height":"100%","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                <LoggedInNavbar id={this.state.user_id} choice={1}/>
                <div class="flex-container">
                    <div className="koutakia-apostasi"><PhotoBox img={this.state.person.img} handler={this.HandleButton}  requested={this.state.requested} friended={this.state.friended} text={this.state.person.interests} name={this.state.person.fname+" "+this.state.person.lname} profilepic={uknown}/></div>
                </div>
                <div class="flex-container-mid flex-container">
                  <div className="koutakia-apostasi"><UploadPaper img={this.state.person.img} friendornot={"yes"} name={this.state.person.fname + " " +this.state.person.lname} id={this.state.user_id} profilepic={uknown}/></div>
                  {this.state.papers&& this.state.papers.map((e, idx) =>
                    <div key={idx} className="koutakia-apostasi"><FriendsPapers img={this.state.person.img} isfriend={1} id3={this.state.friend_id} id={this.state.user_id} friend_id={this.state.user_id} profilepic={uknown} name={this.state.person.fname+" "+this.state.person.lname} photo={papernull} handler={this.handleLikesF} paperid={e._id} key={idx} paperName={"yes"} /></div>
                  )}
                </div>
                <div class="flex-container">
                    <div className="koutakia-apostasi"><Generalbox text="" id={this.state.user_id} list={this.state.friends} title={"Friends"}/></div>
                </div>
          </div>
          </div>                 
            
        )
    }
}