import React from 'react';  
import axios from 'axios';
import CitationRequestsBox from './CitationRequestsBox.component';
import Navbar from "./NavbarLogged.component";
import LoggedInNavbar from './LoggedInNavbar.component';
import Grid from '@material-ui/core/Grid';


export default class ArchivedCitations extends React.Component {
   
        constructor(props) {
            super(props);
            this.state = {
                user_id:this.props.match.params.id,
                requests:'',
                requestcount:'',
                redirect: false,
                friend_id:''
             };
        };
    
        componentWillReceiveProps() { 
            this.setState({
                user_id:this.props.id,
            });  
        }
    
       componentWillMount(){
    
        this.setState({
                user_id:this.props.match.params.id
        });
        
        axios.get('/api/getarchivedcitationrequests/'+this.props.match.params.id).then(res => {
            this.setState({
                requests:Object.values(res.data),
                requestscount:res.data.length
            })
          });
    
       }
    
       handler=() => {
    
        axios.get('/api/getarchivedcitationrequests/'+this.props.match.params.id).then(res => {
            this.setState({
                requests:Object.values(res.data),
                requestscount:res.data.length
            })
          });
       }
    
      
    
      render() {  
    
        return (  
                <div style={{"height":"100%"}}>
                <Navbar id={this.props.match.params.id}/>
                <div style={{"position":"fixed","overflow":"auto","height":"100%","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                    <LoggedInNavbar id={this.props.match.params.id} choice={5}/>
                    <div className="FriendsTitlebar">
                    Archived Citation Requests
                    </div>
                        <Grid style={{"backgroundColor":"white","margin":"0 auto 5% auto","width":"80%","border":"1px solid white"}}>
                        {this.state.requests && this.state.requests.map((e, idx) =>
                            <CitationRequestsBox choice="archived" handler={this.handler} authors={e.authors} user_id={this.state.user_id} paperfrom={e.paper_from} paperto={e.paper_to} requestid={e._id} key={idx} request={e}></CitationRequestsBox>
                         )}
                         {this.state.requests== ''? <div style={{"marginTop":"2%","fontSize":"xx-large","textAlign":"center"}}>You don't have archived requests.</div> : ""}
                        <div style={{"min-height":"2%"}}>&nbsp;</div>
                    </Grid>
                </div>
                </div>           
        );  
    }

}  
    
