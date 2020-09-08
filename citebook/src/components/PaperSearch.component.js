import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LoggedInNavbar from './LoggedInNavbar.component';
import PendingUploadedBox from './PendingUploadedBox.component';
import paper1 from '../paper1.jpg';
import paper2 from '../paper2.png';
import axios from 'axios';
import Navbar from "./NavbarLogged.component";
import papernull from '../papernull.jpg';
import IconButton from '@material-ui/core/IconButton';
import LikeImage from '@material-ui/icons/ThumbUpAltOutlined';
import PaperResultBox from "./PaperResultBox.component";






export default class PaperSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id: this.props.match.params.id,
         papername:this.props.match.params.papername,
         papers:''
        }
    };
    componentWillMount() {  
      console.log("papersearch"+this.props.match.params.id+" "+this.props.location.papername)
        this.setState({
            user_id:this.props.match.params.id,
            papername: this.props.match.params.papername
        });

          axios.post('/api/paperresult/'+this.props.location.papername+'/'+this.props.match.params.id).then(res => {
            if(res.data){
              console.log("RESPONSE"+res.data)
            this.setState({
              papers:Object.values(res.data)
            })
          }
          else{
            this.setState({
              papers:[]
            })
          }

          });
         
    }

    handler2=() => {
      axios.get('/api/paperresult/'+this.props.location.papername).then(res => {
        if(res.data){
        this.setState({
          papers:Object.values(res.data)
        })
      }
      else{
        this.setState({
          papers:[]
        })
      }

      });
    }

    render() {
        return (
          <div style={{"height":"100vh !important"}}>
            <Navbar id={this.props.match.params.id}/>
            <div style={{"position":"fixed","overflow":"auto","height":"100%","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                <LoggedInNavbar id={this.state.user_id} choice={""}/>
                <div className="FriendsTitlebar">
                Paper Search Result
                </div>
                <Grid style={{"backgroundColor":"white","margin":"0 auto 5% auto","width":"80%","border":"1px solid white"}}>
                {this.state.papers && this.state.papers.map((e, idx) => <PaperResultBox venue={e.venue} id={this.state.user_id} friend_id={e.user_id} citatedby={e.citatedby} declared_citations={e.declared_citations} handler2={this.handler2} papers={this.state.papers} handler={this.handler} paperid={e._id} active={e.active} link={e.link} pending={e.pending} points={e.citation_points} likes={e.likes} title={e.title} date={e.publish_timer} descr={e.description} key={idx}/>)}
                <div style={{"min-height":"2%"}}>&nbsp;</div>
                {this.state.papers=='' ?  <div style={{marginTop:"5%",marginBottom:"5%",width:"100%",fontWeight:"bold",fontSize:"xx-large",textAlign:"center"}}>0 Paper Results</div> : ""}
                </Grid>
            </div>
            </div>                 
        )
    }
}