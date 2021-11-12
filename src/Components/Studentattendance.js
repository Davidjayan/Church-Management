import React from "react";

import {BrowserRouter as Router, NavLink } from 'react-router-dom';
import './navbar.css';


const Studentattendance=()=>{
return(
  <div className="stud-att-body">
    <Router>
      <ul>
        <li onClick={()=>window.location.reload()}   >
          <NavLink to="input" activeStyle={{color:"#f70084",borderBottom:"2px solid #f70084",borderRadius:"10px",boxShadow:"2px 2px 8px #f70084"}} >Input Attendance</NavLink>
        </li>
        <li onClick={()=>window.location.reload()}  >
          <NavLink to="get"  activeStyle={{color:"#f70084",borderBottom:"2px solid #f70084",borderRadius:"10px",boxShadow:"2px 2px 8px #f70084"}} >Get Attendance</NavLink>
        </li>
      </ul>
      <div>
    
    </div>
    </Router>
  </div>
)
}

export default Studentattendance;