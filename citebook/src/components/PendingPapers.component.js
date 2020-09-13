import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LoggedInNavbar from './LoggedInNavbar.component';
import PendingUploadedBox from './PendingUploadedBox.component';
import paper1 from '../paper1.jpg';
import paper2 from '../paper2.png';
import axios from 'axios';
import Navbar from "./NavbarLogged.component";
import papernull from '../papernull.jpg';


export default class PendingPapers extends Component {

    constructor(props) {
        super(props);
        this.state = {
         user_id: '',
         papers:'',
         person:''    
        }
    };
    componentWillMount() {  

        this.setState({
            user_id:this.props.match.params.id
        });

        axios.get('/api/user/'+this.props.match.params.id).then(res => {
                this.setState({
                  user_id: res.data._id,
                  person:res.data
                })
              })

          axios.get('/api/getpapers/'+this.props.match.params.id).then(res => {
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

    handler2=() => {
      axios.get('/api/getpapers/'+this.props.match.params.id).then(res => {
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
                <LoggedInNavbar id={this.state.user_id} choice={4}/>
                <div className="FriendsTitlebar">
                My Papers (Not active yet)
                </div>
                <Grid style={{"backgroundColor":"white","margin":"0 auto 5% auto","width":"80%","border":"1px solid white"}}>
                {this.state.papers && this.state.papers.map((e, idx) => <PendingUploadedBox venue={e.venue} id={this.state.user_id} citatedby={e.citatedby} declared_citations={e.declared_citations} handler2={this.handler2} papers={this.state.papers} handler={this.handler} paperid={e._id} active={e.active} link={e.link} pending={e.pending} points={e.citation_points} id={e.user_id} likes={e.likes} title={e.title} photo={papernull} date={e.publish_timer} descr={e.description} key={idx}/>)}
                {this.state.papers== ''? <div style={{"marginTop":"2%","fontSize":"xx-large","textAlign":"center"}}>You don't have papers yet.</div> : ""}

                <div style={{"min-height":"2%"}}>&nbsp;</div>
                </Grid>
            </div>
            </div>                 
        )
    }
}