import React, { Component } from 'react';
import "./LoggedInNavbar.css";
import {Link} from "react-router-dom";
import ReactSearchBox from 'react-search-box'
import RequestPopup from "./RequestPopup.component";
import CitationRequestsPopup from "./CitationRequestsPopup.component";
import RedirectPopup from "./RedirectPopup.component";

import axios from 'axios';
import {Redirect} from "react-router-dom";






export default class LoggedInNavbar extends Component {

  constructor(props){  
    super(props);  
    this.state = { 
        showPopup: false,
        showPopup2: false,
        user_id:this.props.id,
        requests:'',
        requestscount:0,
        requestscountcit:0,
        papers:'',
        people:'',
        paperto:'',
        paperredirect:false,
        showPopup: false,
        title:'',
        too:'',
        pplaceholder:'Paper Search'
    };  
  };

  componentWillMount(){

   axios.get('/api/getusers').then(res => {

     let json=[]
     Object.keys(res.data).map(key => (
       json.push({key:res.data[key]._id,value:res.data[key].fname+" "+res.data[key].lname})
     ))
      
     this.setState({
       people:json,
       redirect:false
     })
   })

   axios.get('/api/topusers').then(res => {
    Object.keys(res.data).map(key => (
      res.data[key].papers && (res.data[key].papers= res.data[key].papers.slice(0,6))
    ))
    let json2=[]

  
      Object.keys(res.data).map(key => 
          res.data[key].papers && Object.keys(res.data[key].papers).map(key2 => (
          axios.get('/api/paper/'+res.data[key].papers[key2]).then(ress => {
            if(ress.data.active==1) json2.push({key:ress.data.link,value:ress.data.title})
          })
        ))
    )


    console.log("json"+json2);

     this.setState({
       papers:json2,
       redirect:false
     })

   })

  }      

  togglePopup3() {  
    this.setState({
            showPopup3: !this.state.showPopup3
    });  
}

  
  componentDidMount(){
    
    this.setState({
        user_id:this.props.id
    });
    axios.get('/api/getrequests/'+this.state.user_id).then(res => {
        this.setState({
            requestscount:res.data.length
        })
      });

      axios.get('/api/getcitationrequests/'+this.state.user_id).then(res => { //db
        this.setState({
          requestscountcit:res.data.length
        })
      });
    
   }

  componentWillReceiveProps() { 
    this.setState({
        user_id:this.props.id
  });  
  }

togglePopup() {  
    this.setState({
            user_id:this.props.id,
            showPopup: !this.state.showPopup  
    });  
}  

togglePopupCitations() {  
  this.setState({
          user_id:this.props.id,
          showPopup2: !this.state.showPopup2  
  });  
}  


SetPaperRedirect = (record) => {
  console.log('SetPaperRedirect'+record)

    this.setState({
      paperto:record,
      paperredirect: true
    })

}

SetPeopleRedirect = (record) => {
  console.log('SetPeopleRedirect'+record)

    this.setState({
      peopleto:record,
      peopleredirect: true
    })

}

PaperRedirect = () => {
  if(this.state.paperto!=null){
    if (this.state.paperredirect) {
      return <Redirect to={{pathname:'/PaperSearch/'+this.props.id,id:this.props.id,papername:this.state.paperto}}/>
    }
  }
}

PeopleRedirect = () => {
  if(this.state.peopleto!=null){
    if (this.state.peopleredirect) {
      return <Redirect to={{pathname:'/PeopleSearch/'+this.props.id,id:this.props.id,peoplename:this.state.peopleto}}/>
    }
  }
}


    
    render() {

        const {choice,id} = this.props;
        const path="/dashboard/"+id;
        const path2="/friends/"+id;
        const path3="/uploadedpapers/"+id;
        const path4="/pendingpapers/"+id;
        const path5="/rejectedcitations/"+id;

        const handleKeyDownPaper = (e) => {
          if (e.key === 'Enter') {
            this.SetPaperRedirect(e.target.value)
          }
        }

        const handleKeyDownPeople = (e) => {
          if (e.key === 'Enter') {
            this.SetPeopleRedirect(e.target.value)
          }
        }


        return (
            <div class="containerin" >
            {this.PaperRedirect()}
            {this.PeopleRedirect()}
                <ul>
                    <li className="borderr"><Link className="subnav_link" to={path}><div className={ choice=="1" ? "boldornot" : '' }>Home</div></Link></li>
                    <li className="borderr" ><Link className="subnav_link" to={path2}><div className={ choice==2 ? 'boldornot' : '' }>Friends</div></Link></li>
                    <li className="borderr"><Link className="subnav_link" to={path3}><div className={ choice==3 ? 'boldornot' : '' }>My Active Papers</div></Link></li>
                    <li className="borderr"><Link className="subnav_link" to={path4}><div className={ choice==4 ? 'boldornot' : '' }>My Papers</div></Link></li>
                    <li className="borderr"><Link className="subnav_link" to={path5}><div className={ choice==5 ? 'boldornot' : '' }>Archived Citation Requests</div></Link></li>
                    <li className="borderr"><Link className="subnav_link"><div onClick={this.togglePopupCitations.bind(this)}>{"Citation Requests"} {this.state.requestscountcit}</div></Link></li>
                    <li className="borderr"><Link className="subnav_link"><div onClick={this.togglePopup.bind(this)}>{"Friend Requests"} {this.state.requestscount}</div></Link></li>
                   
                </ul>
                <div className="searchbox"><input placeholder={this.state.pplaceholder} type="text" onKeyDown={handleKeyDownPaper} /></div>
                <div className="searchbox2"><input  placeholder="People Search" type="text" onKeyDown={handleKeyDownPeople} /></div>
                <div>{this.state.showPopup ?  
                  <RequestPopup
                    id={this.state.user_id}
                    text='Friend Requests'  
                    closePopup={this.togglePopup.bind(this)}  
                  />  
                  : null  
                  }  
              </div>

              <div>{this.state.showPopup2 ?  
                <CitationRequestsPopup
                  id={this.state.user_id}
                  text='Citation Requests'  
                  closePopup={this.togglePopupCitations.bind(this)}  
                />  
                : null  
                }  
            </div>

            <div>{this.state.showPopup3 ?  
              <RedirectPopup
                link={this.state.too}
                title={this.state.title}
                closePopup={this.togglePopup3.bind(this)}  
              />  
              : null  
              }  
          </div>

            </div>
        )
    }
}

