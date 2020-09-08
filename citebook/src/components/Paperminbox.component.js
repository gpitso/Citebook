import React, { Component } from 'react';
import axios from 'axios';
import './Profileminbox.css';
import {Redirect} from "react-router-dom";




export default class Paperminbox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false
      }
 
    }

    boxClick = (e) => {
      this.setState({
        text: "Friend Added"
      })
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to={{pathname:'/FriendPage/'+this.props.friend_id,state: {id:this.props.id,friend_id:this.props.friend_id} }}/>
      }
    }

    render() {

        var { profilepic,name,text,paperName,css,id,friend_id,date} = this.props;

        function handleClick(){
          console.log(id+" "+friend_id);
          axios.post('/api/makefriend',{
            params: {
              user_id:id,
              friend_id:friend_id
            }
          }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        }

        function redirectrr(){
          this.setRedirect();
        }

        function ChooseText() {
          console.log("Date "+date)

            if (text=="Add Friend") {
              return <a onClick={handleClick} style={{"margin":"0% 0% 0% 6%",color:"red"}}>Add Friend</a>;
            }
            else if (paperName) return <p style={{"margin":"0% 0% 0% 10.4%",color:"grey"}}>{date}</p>;

            return <a style={{"margin":"0% 0% 0% 6%",color:"grey"}}>{date}</a>;
          }
          function ResizePic() {

            if (css) {
              return <img className="photobox" style={{"width":"7.8%","height":"100%",borderRadius:"50%","display":"inline","float":"left","margin":"0% 0% 0% 1.1%"}} src={profilepic}/>
            }
            return <img className="photobox" style={{"width":"18%","height":"100%",borderRadius:"50%","display":"inline","float":"left","margin":"0% 0% 0% 6%"}} src={profilepic}/>
          }


        return (
           <div style={{"margin":"3% 0% 3% 0%"}}>
           {this.renderRedirect()}
            <ResizePic/>
            <div style={{"margin":"1.8% 0% 0% 10.4%"}}><a onClick={this.setRedirect} className="hoversuggested">{name}</a></div>
            <ChooseText/>
           </div>
        )
    }
}