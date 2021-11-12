import React, { Component} from "react";
import Adminlogin from "./Components/Adminlogin";
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Home from "./Components/Home";
import Accounting from "./Components/Accounting";
import Dataentry from "./Components/Dataentry";
import Studentattendance from "./Components/Studentattendance";
import Churchattendance from "./Components/Churchattendance";
import Inputchurchattendance from "./Components/Sub Components/Inputchurchattendance";
import Getchurchattendance from "./Components/Sub Components/Getchurchattendance";
import Inputstudentattendance from "./Components/Sub Components/Inputstudentattendance";
import Getstudentattendance from "./Components/Sub Components/Getstudentattendance";
import Fetchaccountingdetails from "./Components/Sub Components/Fetchaccountingdetails";
import YoutubeID from "./Components/YoutubeID";
import Editaccounting from "./Components/Sub Components/Editaccounting";
import EditData from "./Components/EditData";


import './App.css';

class App extends Component{

    constructor(props){
        super(props)
        this.logout=this.logout.bind(this);
        
    }

    logout=()=>{
        localStorage.clear();
        window.location.reload();
        
        
    }

    
   
    render(){
    if(localStorage.getItem('username')){
        return(
            <div className="AppBody" >
                <h1>Jehova Nissi AG Church Backend</h1>

            

            
            <div className="iconandnames" >
            <i className="fas fa-user-lock"></i>
            <div style={{color:"#f70084"}}>{localStorage.getItem('username')}</div>
            
            <button className="logout" onClick={this.logout} >Logout</button>
            </div>
            <Router>
            
            <Switch>
                <Route exact path="/" ><Home/> </Route>
                <Route exact path="/accounting" ><Accounting/> </Route>
                <Route exact path="/accounting/fetch-accounting-details" ><Fetchaccountingdetails/> </Route>
                <Route exact path="/accounting/edit-accounting-details" ><Editaccounting/> </Route>
                <Route exact path="/dataentry"  > <Dataentry/> </Route>
                <Route exact path="/edit-data-entered"  > <EditData/> </Route>
                <Route exact path="/church-attendance/"  > <Churchattendance/> </Route>
                <Route exact path="/student-attendance/"  > <Studentattendance/> </Route>
                <Route exact path="/church-attendance/"  > <Churchattendance/> </Route>
                <Route exact path="/student-attendance/input"  > <Studentattendance/><Inputstudentattendance/> </Route>
                <Route exact path="/student-attendance/get"  > <Studentattendance/><Getstudentattendance/> </Route>
                <Route exact path="/church-attendance/input"  > <div> <Churchattendance/> <Inputchurchattendance/></div>  </Route>
                <Route exact path="/church-attendance/get"  > <div><Churchattendance/><Getchurchattendance/> </div> </Route>
                <Route exact path="/youtube-id-generator" ><YoutubeID/></Route>
            </Switch>
            </Router>
           
           
            </div>
        );
    }
   
    else {
    return(
        <div>
        <Adminlogin />
        
        
        </div>
    )
    }
}
}
export default App;