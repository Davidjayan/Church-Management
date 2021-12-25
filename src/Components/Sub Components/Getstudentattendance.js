import React, { useState } from 'react';
import '../../assets/Getstudentattendance.css';

const Getstudentattendance = () =>{
    const [firstField,setfirstField]=useState();
    const [display1,setdisplay1]=useState("none");
    const [display2,setdisplay2]=useState("none");
    const [display3,setdisplay3]=useState("none");
    const [display4,setdisplay4]=useState("none");
    const [fromdate,setfromdate]=useState();
    const [todate,settodate]= useState();
    const [namelist,setnamelist]=useState([]);

    let count= 0;

    let presentcount = 0;    
    let absentcount = 0;
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
    
    const [present1,isPresent1]=useState(true);
    const [date,setdate]=useState(today);
    const [obj,setobj]=useState([]);
    const [obj1,setobj1]=useState([]);

    const [name,setname] = useState();

    let from = new Date(fromdate);
    let to = new Date(todate);
    
    let fromdd = from.getDate();
    fromdd = fromdd<10?"0"+fromdd:fromdd;
    if(fromdd==="00"){
      fromdd=31;
      frommm=frommm-1;
  } 

    let frommm = (from.getMonth()+1)>12?from.getMonth():from.getMonth()+1;
    frommm = frommm<10?"0"+frommm:frommm;
    let fromyy = from.getFullYear();

    let todd = to.getDate();
    todd = todd<10?"0"+todd:todd;
    if(todd==="00"){
      todd=31;
      tomm=tomm-1;
  } 

    let tomm = (to.getMonth()+1)>12?to.getMonth():to.getMonth()+1;
    tomm = tomm<10?"0"+tomm:tomm;
    let toyy = to.getFullYear();
    
    const submit1 = () =>{
        if(date){
            fetch(`${url}/jehovanissi/backend/apis/searchbydate.php`,{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                date:date
              
            })
          })
            .then(res => res.json())
            .then((result) => {
                if(result!=="No matches found on Record"){
               setobj1(result);
              
                }
                else{
                    setobj1([{"StudentName":"No results found","Present":1}]);
                    alert(result);
                   
                   
                }
              }).catch((error)=>{
                console.error(error);
              });

        }   
            
        
        else{
            
            alert("Input all required");
    }
    }

    const submit = () =>{
        if(fromdate&&todate&&name){
            fetch(`${url}/jehovanissi/backend/apis/searchbystudentname.php`,{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                name :name,
                fromdate:fromdate,
                todate:todate
              
            })
          })
            .then(res => res.json())
            .then((result) => {
                if(result!=="No matches found on Record"){
               setobj(result);
               setdisplay3("block");
               setdisplay4("block");
                }
                else{
                    alert(result);
                    setdisplay3("none");
                }
              }).catch((error)=>{
                console.error(error);
              });

        }   
            
        
        else{
            alert("Input all required");
    }
    }
    

    const searchapi = () =>{
        fetch(`${url}/jehovanissi/backend/apis/searchstudentname.php`,{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
          })
            .then(res => res.json())
            .then((result) => {
                  setnamelist(result);
              }).catch((error)=>{
                console.error(error);
              });
    }

    return(
        
            <div className="get-student-att-body" > 
                <p>Search By:</p>
                <select value={firstField} onChange={(event)=>{setfirstField(event.target.value);
                setdisplay1(event.target.value==="Name"?"block":"none");
                setdisplay2(event.target.value==="Date"?"block":"none");
                setdisplay3(event.target.value==="Date"?"none":"block");
                }} >
                    <option>Select</option>
                    <option  value="Name" >Name</option>
                    <option value="Date" >Date</option>
                </select>
                <div style={{display:display1}}>
                    <input list="namelist" placeholder="Enter Name" value={name} onChange={(event)=>{
                        const str = event.target.value.split(' ');
                        for (let i = 0;i<str.length;i++){

                          str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                        }
                        
                       const Name = str.join(' ');
                       
                        setname(Name);searchapi();}} ></input>
                    <datalist style={{backgroundColor:"black"}} id="namelist">
                        {namelist.map((k)=>{
                            return(
                                <option>{k}</option>
                            )
                        })}
                    </datalist>
                    <p>From:</p><input  onChange={(event)=>{setfromdate(event.target.valueAsDate);}} type="date" ></input>
                    <p>To:</p><input   onChange={(event)=>{settodate(event.target.valueAsDate);}} type="date" ></input>
                   
                   
                    <button  style={{margin:10}}   className="btn" onClick={()=>submit()} >Submit</button>
                </div>
                <div style={{display:display2}}>

                    <input type="date" onChange={(event)=>setdate(event.target.value)}></input>
                        
                    <select onChange={(event)=>isPresent1(event.target.value==="true"?true:false)}>
                        <option value="true" >Present</option>
                        <option value="false" >Absent</option>
                    </select>
                    <div style={{padding:10}}>
                    <button  className="btn" onClick={()=>submit1()} >Submit</button></div>
                    <table>
                                <thead>
                                    <tr>
                                        <td>
                                           <b style={{color:"#f70084"}}> Students present on {date}</b>
                                        </td>
                                        
                                    </tr>
                                </thead>

                    {obj1.map((p)=>{
                        presentcount = p.Present==="1"?presentcount+1:presentcount;
                        absentcount = p.Present==="0"?absentcount+1:absentcount;
                        if(p.Present==present1){
                            
                        return(
                            
                                <tbody key={p.StudentName} >
                                    <tr>
                                        <td>
                                            {p.StudentName}
                                        </td>
                                    </tr>
                                </tbody>
                            
                        )
                        }
                        else{
                            
                        }
                    
                    
                        
                    })}
                    <div>
                       <p style={{color:"#f70084"}}>No of Presents : <b style={{color:"green"}}>{presentcount}</b></p>
                       <p style={{color:"#f70084"}}>No of Absents : <b  style={{color:"red"}}>{absentcount}</b></p>
                   </div>
                    </table>
                    
                    
                </div>
                <div style={{display:display3}}>
                    <table style={{display:"grid",justifyContent:"center"}}>
                   {obj.map((p)=>{
                       if(p.Present==1){
                           count = count +1;
                           
                       return(
                           <tbody key={p.StudentName} style={{backgroundColor:"#ccc"}} >
                           <tr>
                           <td style={{color:"black",padding:20}}>{p.StudentName}</td>
                        <td style={{color:"black",padding:20}}>{p.Date}</td>
                        </tr>
                          </tbody>
                       );

                       }
                   })}
                   </table>
                   
                   <div style={{display:display4,margin:10}} >
                   {name} was present {count} {count>1?"days":"day"} between {fromdd+"/"+frommm+"/"+fromyy} to  {todd+"/"+tomm+"/"+toyy} </div>
                   </div>
            </div>
        
    )

}

export default Getstudentattendance;