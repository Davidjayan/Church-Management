import React, { useState,useEffect } from "react";
import '../../assets/studentattendance.css';
import Newstudententry from "./newstudententry.js";

const Inputstudentattendance = () =>{
    const [studentnames,setstudentnames]=useState([]);
    const [date,setdate]=useState();
    
    
    const obj = [];
    const [studentattendance,setstudentattendance]=useState([]);

    let today = new Date();

    let dd = today.getDate();
    dd = dd<10?"0"+dd:dd;
    if(dd==="00"){
      dd=31;
      mm=mm-1;
  } 

    let mm = (today.getMonth()+1)>12?today.getMonth():today.getMonth()+1;
    mm = mm<10?"0"+mm:mm;
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    const submit = () =>{
        if(studentattendance){
            fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/student_attendance.php",{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                studentattendance:studentattendance,
                date:date
              
            })
          })
            .then(res => res.json())
            .then((result) => {
                  alert(result);
                  window.location.reload();
              }).catch((error)=>{
                console.error(error);
              });

        }   
            
        
        else{
            alert("Input all required");
    }
    }
    

    useEffect(() => {
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/getstudentname.php")
          .then(res => res.json())
          .then(
            (result) => {
              
              setstudentnames(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              alert(error);
            }
          )
      }, [])
     


    
    
    
    let i = 0;
    const count = studentnames.length;

       for(i=0;i<count;i++){
        if(studentnames[i]!==''){
           obj.push({"name":studentnames[i],"present":false});
        }
       }
    
       useEffect(()=>{

        
        setstudentattendance(obj);

        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[studentnames]); 
       
       
    
 
    return(
        <div className="student-attendance-body">
            <input className="inp" type="date" value={date} onChange={(event)=>{
                setdate(event.target.value)
            }}/><button className="btn" onClick={()=>setdate(today)} >Click if today</button>
            <p>Date:{date}</p>
            <table>
              <thead>
                <tr><th>Name</th>
                <th>Present</th>
                <th>Absent</th></tr>
                </thead>    
                <tbody>
                {studentattendance.map((p)=>
                {
                return(
                    <tr key={p.name} >
                    <td>{p.name}</td>
                    <td ><label className="container"><input 
                    
                    onChange={
                    (event)=>
                    {
                    let temp = true; 
                    
                    event.target.value==='true'?temp=true:temp=false;
                    const present = temp;
                    setstudentattendance((cp)=>cp.map(x=>x.name===p.name?{
                        ...x,
                        present
                    }:x))
                    }} type="radio" name={p.name} value="true"/> <span className="fas fa-check present"></span> </label></td>
                    <td ><label className="container"><input 
                    onChange={
                        (event)=>
                        {
                        let temp = true;    
                        event.target.value==='false'?temp=false:temp=true;
                        const present = temp;
                        setstudentattendance((cp)=>cp.map(x=>x.name===p.name?{
                            ...x,
                            present
                        }:x))
                        }}
                    type="radio" name={p.name} value="false"/> <span className="fas fa-times absent"></span></label> </td>
                    </tr>
                )
                })}</tbody>
                <tfoot></tfoot>
                
                
            </table>
            <button className="btn" onClick={()=>submit()}>Submit</button>
            <div>
                <Newstudententry/>
          
            </div>
            
        </div>
    )
}

export default Inputstudentattendance;