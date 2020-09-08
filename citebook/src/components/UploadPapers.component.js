import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LoggedInNavbar from './LoggedInNavbar.component';
import UploadedPapersBox from './UploadedPapersBox.component';
import paper1 from '../paper1.jpg';
import paper2 from '../paper2.png';
import axios from 'axios';
import Navbar from "./NavbarLogged.component";
import papernull from '../papernull.jpg';





// const MyPapers = [                                    //MYPAPERS DATABASE EXTRACTION NEEDED
//     {title:"Fluent Python Paper",status:"active",photo:paper1,date:'Published: June 2,2020 19:00PM',likes:'7',descr:"Python’s simplicity lets you become productive quickly, but this often means you aren’t using everything it has to offer. With this hands-on guide, you’ll learn how to write effective, idiomatic Python code by leveraging its best—and possibly most neglected—features. Author Luciano Ramalho takes you through Python’s core language features and libraries, and shows you how to make your code shorter, faster, and more readable at the same time.Many experienced programmers try to bend Python to fit patterns they learned from other languages, and never discover Python features outside of their experience."},
//     {title:"No SQL Paper",status:"active",photo:paper2,date:'Published: June 5,2020 13:34PM',likes:'7',descr:"NoSQL (Not only SQL) is a database used to store large amounts of data. NoSQL databases are distributed, non-relational, open source and are horizontally scalable (in linear way). NoSQL does not follow property of ACID as we follow in SQL. In this research paper, we are surveying about NoSQL, its background, fundamentals like ACID, BASE and CAP theorem. Also on the basis of CAP theorem, study is carried out about the various types of NoSQL data stores with their examples, characteristics, and pros and cons of NoSQL."}
//  ];



export default class UploadPapers extends Component {

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

          axios.get('/api/getactivepapers/'+this.props.match.params.id).then(res => {
            if(res.data!=""){
            this.setState({
              papers:Object.values(res.data)
            })
          }

          });
         
    }

    handler=(papers) => {
      this.setState({
        papers: Object.values(papers)
      },function () {
          console.log("Paperslist Changed");
      }) 
  }

    render() {
        
        return (
          <div>
            <Navbar id={this.props.match.params.id}/>
            <div style={{"position":"fixed","overflow":"auto","height":"100%","width":"100%","backgroundColor":"rgb(122, 53, 53)"}}>
                <LoggedInNavbar id={this.state.user_id} choice={3}/>
                <div className="FriendsTitlebar">
                My Active Papers
                </div>
                <Grid style={{"backgroundColor":"white","margin":"0 auto 5% auto","width":"80%","border":"1px solid white"}}>
                {this.state.papers && this.state.papers.map((e, idx) => <UploadedPapersBox venue={e.venue} papers={this.state.papers} citatedby={e.citatedby} declared_citations={e.declared_citations} handler={this.handler} paperid={e._id} active={e.active} link={e.link} pending={e.pending} points={e.citation_points} id={e.user_id} likes={e.likes} title={e.title} photo={papernull} date={e.publish_timer} descr={e.description} key={idx}/>)}
                {this.state.papers== ''? <div style={{"marginTop":"2%","fontSize":"xx-large","textAlign":"center"}}>You don't have active papers yet.</div> : ""}
                <div style={{"min-height":"2%"}}>&nbsp;</div>
                </Grid>
            </div>
            </div>                 
        )
    }
}