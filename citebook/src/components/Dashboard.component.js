import React, { Component } from 'react';
import "./Dashboard.css"
import axios from 'axios';
import Navbar from "./NavbarLogged.component";


import LoggedInNavbar from './LoggedInNavbar.component';
import PhotoBox from './PhotoBox.component';
import UploadPaper from './UploadPaper.component';
import Generalbox from './Generalbox.component';
import FriendsPapers from './FriendsPapers.component';
import YourPage from './YourPage.component';



import uknown from '../emptyface.jpg';
import papernull from '../papernull.jpg';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id:'',
         updatedKey:"yes",
         updatedKeyF:"yes",
         loggedIn: true,
         person: '',
         suggested:'',
         friends:'',
         handle:"1",
         friendpapers:''
        }
    };
    
    componentWillMount(){
      this.setState({
        user_id:this.props.match.params.id
      });
    }
    componentDidMount() {  
        this.setState({
            user_id:this.props.match.params.id
          });
          axios.get('/api/user/'+this.props.match.params.id).then(res => {
                this.setState({
                  user_id: res.data._id,
                  person:res.data
                })
              })

              axios.get('/api/getsuggested/'+this.props.match.params.id).then(res => {
                this.setState({
                  suggested:Object.values(res.data)
                })
              })

          axios.get('/api/friends/'+this.props.match.params.id).then(res => {
            Object.keys(res.data).map(key => (
              res.data[key].papers && (res.data[key].papers = res.data[key].papers.slice(0,6))
            ))
            this.setState({
              friends:Object.values(res.data)
            }) 
          });              
    }

     handleLikesF = (paperid) => {
      console.log("handle likes");
       axios.post('/api/liked',{
          params: {
            paper_id:paperid,
          }
        }).then((response) => {
          this.setState({
            updatedKeyF:"no" 
          });
          }
       ); 
    }

    handler=() => {
      axios.get('/api/getsuggested/'+this.props.match.params.id).then(res => {
        this.setState({
          suggested:Object.values(res.data)
        })
      })
  }

    
      render() {
          return (
            <div style={{"height":"100vh !important"}}>
                <Navbar id={this.props.match.params.id} />
                <div style={{"overflow":"auto" ,"height":"100%","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                    <LoggedInNavbar id={this.props.match.params.id} choice={1}/>
                    <div class="flex-container">
                        <div className="koutakia-apostasi"><PhotoBox img={this.state.person.img} text={this.state.person.email} name={this.state.person.fname+" "+this.state.person.lname} profilepic={uknown}/></div>
                    </div>
                    <div class="flex-container-mid flex-container">
                        <div className="koutakia-apostasi"><UploadPaper img={this.state.person.img} id={this.state.user_id} profilepic={uknown}/></div>
                        {this.state.friends&& this.state.friends.map((k, idxx) =>
                          <div key={idxx} className="koutakia-apostasi">{k.papers && k.papers.map((e, idx) =><FriendsPapers img={k.img} id={this.state.user_id} friend_id={k._id} profilepic={uknown} name={k.fname+" "+k.lname} photo={papernull} handler={this.handleLikesF} paperid={e} key={idx} paperName={"yes"} />)}</div>
                        )}
                        {(this.state.friends== '' || this.state.friends=='0') ? <div className="photobox" style={{"marginTop":"2%","padding-top":"2%","padding-bottom":"2%","fontSize":"xx-large","textAlign":"center",backgroundColor:"white"}}>No papers to show, try adding some friends to see their papers.</div> : ""}
                      </div>
                    <div class="flex-container">
                        <div className="koutakia-apostasi"><YourPage title={"Your Page"} id={this.state.user_id}/></div>
                        <div className="koutakia-apostasi"><Generalbox text="" id={this.state.user_id}  list={this.state.friends} title={"Friends"}/></div>
                    </div>
              </div>
            </div>          
          )
      }
}