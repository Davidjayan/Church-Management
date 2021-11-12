import React, { useRef, useState } from 'react';
import '../../assets/fetchaccdetails.css';
import { useReactToPrint } from 'react-to-print';

const Fetchaccountingdetails = () =>{

    const [searchbyvalue,setsearchbyvalue]=useState();
    const [offeringtype,setofferingtype]=useState();
    const [fromdate,setfromdate]=useState();
    const [namelist,setnamelist]=useState([]);
    const [name,setname]=useState();
    const [todate,settodate]= useState();
    const [searchbynameobj,setsearchbynameobj]=useState([]);
    const [searchbydateobj,setsearchbydateobj]=useState([]);
    const [objoftotals,setsobjoftotals]=useState([]);
    const [display1,setdisplay1]=useState('none');
    const [display2,setdisplay2]=useState('none');
    const [display3,setdisplay3]=useState('none');
    const [namearray,setnamearray]=useState([]);
    const printref = useRef();

    let from = new Date(fromdate);
    let to = new Date(todate);
    
    let fromdd = from.getDate();
    fromdd = fromdd<10?"0"+fromdd:fromdd;
   

    let frommm = (from.getMonth()+1)>12?from.getMonth():from.getMonth()+1;
    frommm = frommm<10?"0"+frommm:frommm;
    if(fromdd==="00"){
      fromdd=31;
      frommm=frommm-1;
  } 

    let fromyy = from.getFullYear();

    let todd = to.getDate();
    todd = todd<10?"0"+todd:todd;
    

    let tomm = (to.getMonth()+1)>12?to.getMonth():to.getMonth()+1;
    tomm = tomm<10?"0"+tomm:tomm;

    if(todd==="00"){
      todd=31;
      tomm=tomm-1;
  } 
    let toyy = to.getFullYear();


    let flag = 0;

    let count = 0;

    const submitbyname=()=>{
        if(fromdate.length!==0&&todate.length!==0){
            fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/accounting-submitbyname.php",{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                name:name,
               fromdate:fromdate,
               todate:todate
              
            })
          })
            .then(res => res.json())
            .then((result) => {
                if(result!=="No matches found on Record"){
                  setsearchbynameobj(result);
                  setdisplay1("block");
                 
                }else{
                    alert(result);
                    setdisplay1("none");
                    
                }
              }).catch((error)=>{
                console.error(error);
              });

        }   
            
        
        else{
            alert("Input all required");
          }
    }

    const submitbydate=()=>{
        if(fromdate.length!==0&&todate.length!==0){
            fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/accounting-submitbydate.php",{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                
               fromdate:fromdate,
               todate:todate
              
            })
          })
            .then(res => res.json())
            .then((result) => {
                if(result!=="No matches found on Record"){
                  setsearchbydateobj(result);
                  setdisplay2("block");
                  result.map((l)=>{
                    setnamearray(cp=>[...cp,l.Name]);
                  })
                 
                }else{
                    alert(result);
                    setdisplay2("none");
                    
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
      fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/searchname.php",{
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

    const submitbydateglobal=()=>{
        if(fromdate.length!==0&&todate.length!==0){
            fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/accounting-submitchurchofferings-totals.php",{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                
               fromdate:fromdate,
               todate:todate
              
            })
          })
            .then(res => res.json())
            .then((result) => {
                if(result!=="No matches found on Record"){
                  setsobjoftotals(result);
                  setdisplay3("block");
                 
                }else{
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

    let titheTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Tithe'?accumulator+parseFloat(item.Amount):accumulator,0);

    let offeringTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let missionaryTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Missionary'?accumulator+parseFloat(item.Amount):accumulator,0);

    let specialofferingTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Special Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let baptismofferingTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Baptism Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let birthdayofferingTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Birthday Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let weddingofferingTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Wedding Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let childdedicationofferingTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Child Dedication Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let committedofferingTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Committed Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let buildingfundTotalofp = searchbynameobj.reduce((accumulator,item)=> item.Type==='Building Fund'?accumulator+parseFloat(item.Amount):accumulator,0);
    



    let titheTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Tithe'?accumulator+parseFloat(item.Amount):accumulator,0);

    let offeringTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let missionaryTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Missionary'?accumulator+parseFloat(item.Amount):accumulator,0);

    let specialofferingTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Special Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let baptismofferingTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Baptism Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let birthdayofferingTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Birthday Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let weddingofferingTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Wedding Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let childdedicationofferingTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Child Dedication Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let committedofferingTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Committed Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let buildingfundTotal = searchbydateobj.reduce((accumulator,item)=> item.Type==='Building Fund'?accumulator+parseFloat(item.Amount):accumulator,0);

    let Total = isNaN(searchbydateobj.reduce((accumulator,item)=> isNaN(accumulator)?0:accumulator + parseFloat(item.Amount),0))?0:searchbydateobj.reduce((accumulator,item)=> isNaN(accumulator)?0:accumulator + parseFloat(item.Amount),0);

    let grandTotal = (1*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.One),0))+(2*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Two),0))+(5*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Five),0))+(10*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Ten),0))+(20*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Twenty),0))+(50*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Fifty),0))+(100*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Hundreds),0))+(200*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoHundreds),0))+(500*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.FiveHundreds),0))+(2000*objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoThousands),0));
    const churchOffering = grandTotal - Total;

    return(
        <div style={{display:'grid',justifyContent:'center',marginTop:'15px'}} >
           <div> Search by:<select onChange={(event)=>{setsearchbyvalue(event.target.value);}}>
                <option>Select</option>
                <option value="Name" >Name</option>
                <option value="Date" >Date</option>
                <option value="FullRecords" >Full Records</option>
                <option value="ChurchOfferings" >Church Offerings</option>
                <option value="FindDenominations" >Find Denominations</option>
            </select></div>

            <div style={{display:searchbyvalue==="Name"?"block":"none"}}>
                <input placeholder="Enter Name" 
                list="namelist"
                value={name}
                onChange={(event)=>{
                  const str = event.target.value.split(' ');
                        for (let i = 0;i<str.length;i++){

                          str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                        }
                        
                       const Name = str.join(' ');
                       
                        setname(Name);searchapi();}} />
                 <datalist style={{backgroundColor:"black"}} id="namelist">
                        {namelist.map((k)=>{
                            return(
                                <option>{k}</option>
                            )
                        })}
                    </datalist>

                From:<input  type="date"  onChange={(event)=>{setfromdate(event.target.value);}} />
                To:<input type="date" onChange={(event)=>{settodate(event.target.value);}} />
                <select onChange={(event)=>setofferingtype(event.target.value)} >
                            <option>Select </option>
                            <option  value="Tithe">Tithe</option>
                            <option  value="Offering">Offering</option>
                            <option  value="Missionary">Missionary</option>
                            <option  value="Special Offering">Special Offering</option>
                            <option  value="Baptism Offering">Baptism Offering</option>
                            <option  value="Birthday Offering">Birthday Offering</option>
                            <option  value="Wedding Offering">Wedding Offering</option>
                            <option  value="Child Dedication Offering">Child Dedication Offering</option>
                            <option  value="Committed Offering">Committed Offering</option>
                            <option  value="Building Fund">Building Fund</option>
                </select>
                <button className="btn2" onClick={()=>submitbyname()}  > Submit</button>
               
                <div style={{display:display1}}>
                <table >
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Type Of Offering</td>
                            <td>Amount</td>
                            <td>Date</td>
                        </tr>
                      {     
                          searchbynameobj!==''?searchbynameobj.map(
                              (k)=>{
                                   
                                  if(k.Type===offeringtype){
                                  return(
                                     <tr>
                                         <td>
                                             {k.Name}
                                         </td>
                                         <td>
                                             {k.Type}
                                         </td>
                                         <td>
                                             {k.Amount}
                                         </td>
                                         <td>
                                             {k.Date}
                                         </td>
                                     </tr> 
                                  )
                                  
                                  }
                                  else{
                                    return(
                                      <div>
                                        
                                      </div>
                                    )
                                  }
                                }
                          ):''
                      }
                    </tbody>
                </table>
                
               <p>{offeringtype} Total of {name}
               from {fromdd+"/"+frommm+"/"+fromyy} to {todd+"/"+tomm+"/"+toyy}
               : {offeringtype==="Tithe"?titheTotalofp:offeringtype==="Offering"?offeringTotalofp:offeringtype==="Missionary"?missionaryTotalofp:offeringtype==="Special Offering"?specialofferingTotalofp:offeringtype==="Baptism Offering"?baptismofferingTotalofp:offeringtype==="Birthday Offering"?birthdayofferingTotalofp:offeringtype==="Wedding Offering"?weddingofferingTotalofp:offeringtype==="Child Dedication Offering"?childdedicationofferingTotalofp:offeringtype==="Committed Offering"?committedofferingTotalofp:offeringtype==="Building Fund"?buildingfundTotalofp:0}
                      </p>
                </div>

            </div>
            <div style={{display:searchbyvalue==="Date"?"block":"none"}} >
                From:<input type="date"  onChange={(event)=>{setfromdate(event.target.value);}} />
                To:<input type="date" onChange={(event)=>{settodate(event.target.value);}} />

                <select onChange={(event)=>setofferingtype(event.target.value)} >
                            <option  value="default" >Select Offering Type </option>
                            <option  value="Tithe">Tithe</option>
                            <option  value="Offering">Offering</option>
                            <option  value="Missionary">Missionary</option>
                            <option  value="Special Offering">Special Offering</option>
                            <option  value="Baptism Offering">Baptism Offering</option>
                            <option  value="Birthday Offering">Birthday Offering</option>
                            <option  value="Wedding Offering">Wedding Offering</option>
                            <option  value="Child Dedication Offering">Child Dedication Offering</option>
                            <option  value="Committed Offering">Committed Offering</option>
                            <option  value="Building Fund">Building Fund</option>
                </select>
                    <button className="btn2" onClick={()=>submitbydate()} >Submit</button>
                
                <div style={{display:display2}}>
                 
                    <table>
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Type</th>
                          </tr>
                    {searchbydateobj.map((k)=>{
                        if(offeringtype==="default"){
                          return(
                            <tr>
                                <td>{k.Name}</td>
                                <td>{k.Amount}</td>
                                <td>{k.Date}</td>
                                <td>{k.Type}</td>
                                </tr>
                          )
                        }
                        else if(k.Type===offeringtype){

                        return(
                            <tr>
                                <td>{k.Name}</td>
                                <td>{k.Amount}</td>
                                <td>{k.Date}</td>
                                </tr>
                        )
                        }
                        else{
                          return(
                            <div>
                              
                            </div>
                          )
                        }
                    })}
                    </tbody>
                    </table>
                    <p> 
                      Tithe Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {titheTotal}
                    </p>
                    <p> 
                      Offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {offeringTotal}
                    </p>
                    <p> 
                      Missionary Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {missionaryTotal}
                    </p>
                    <p> 
                      Special offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {specialofferingTotal}
                    </p>
                    <p> 
                      Baptism offering Total from {fromdd+"-"+frommm+"-"+fromyy}  to {todd+"-"+tomm+"-"+toyy}: {baptismofferingTotal}
                    </p>
                    <p> 
                      Birthday Offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {birthdayofferingTotal}
                    </p>
                    <p> 
                      Wedding offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {weddingofferingTotal}
                    </p>
                    <p> 
                      Child Dedication offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {childdedicationofferingTotal}
                    </p>
                    <p> 
                      Committed offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {committedofferingTotal}
                    </p>
                    <p> 
                      Building Fund offering Total from {fromdd+"-"+frommm+"-"+fromyy} to {todd+"-"+tomm+"-"+toyy}: {buildingfundTotal}
                    </p>
                </div>
                


            </div>
            <div  style={{display:searchbyvalue==="ChurchOfferings"?"block":"none"}}  >

                   From:<input type="date" onChange={(event)=>{setfromdate(event.target.value);}}/>
                   To:<input type="date" onChange={(event)=>{settodate(event.target.value);}} />
                <button className="btn2" onClick={()=>submitbydateglobal()}>Submit</button>
             
                    {objoftotals.map(
                        (k)=>{
                            if(k.ChurchOffering!=="0"){
                                flag =1;
                            return(
                                <p>Church Offering on {k.Date} : Rs.{k.ChurchOffering} </p>
                            )
                            }else{
                              return(
                                <div>
                                  
                                </div>
                              )
                            }
                            
                        }
                    )}
                    <p>{flag===0?"No Church offerings on the given dates":''}</p>
                
            </div>
            <div style={{display:searchbyvalue==="FindDenominations"?"block":"none"}}>
            From:<input type="date" onChange={(event)=>{setfromdate(event.target.value);}}/>
                   To:<input type="date" onChange={(event)=>{settodate(event.target.value);}} />
                <button className="btn2" onClick={()=>{submitbydateglobal()}}>Submit</button>
          
                <table style={{display:display3}} >
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>2000's</th>
                                <th>500's</th>
                                <th>200's</th>
                                <th>100's</th>
                                <th>50's</th>
                                <th>20's</th>
                                <th>10's</th>
                                <th>5's</th>
                                <th>2's</th>
                                <th>1's</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {
                               
                                objoftotals.map(
                                    (k)=>{
                                        count = count+1;
                                        return(
                                            <tr key={count}>
                                            <td>{count}</td>
                                            <td>{k.TwoThousands}</td>
                                            <td>{k.FiveHundreds}</td>
                                            <td>{k.TwoHundreds}</td>
                                            <td>{k.Hundreds}</td>
                                            <td>{k.Fifty}</td>
                                            <td>{k.Twenty}</td>
                                            <td>{k.Ten}</td>
                                            <td>{k.Five}</td>
                                            <td>{k.Two}</td>
                                            <td>{k.One}</td>
                                            <td>{k.Date}</td>
                                            </tr>
                                        )
                                    }
                                )}
                            
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoThousands),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.FiveHundreds),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoHundreds),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Hundreds),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Fifty),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Twenty),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Ten),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Five),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Two),0)}</td>
                                <td>{objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.One),0)}</td>
                            </tr>
                        </tfoot>
                </table>     
            </div>

            <div style={{display:searchbyvalue==="FullRecords"?"grid":"none",justifyContent:"center"}}>
              <div>
            From:<input type="date" onChange={(event)=>{setfromdate(event.target.value);}}/>
                   To:<input type="date" onChange={(event)=>{settodate(event.target.value);}} />
                <button className="btn2" onClick={()=>{submitbydate();submitbydateglobal()}}>Submit</button>
                </div>
                  <div  ref={printref} className="printpage">
                  <table >
                      <tr>
                        <th colSpan="11" >
                            JEHOVAH NISSI AG CHURCH ACCOUNTS REPORT
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="11" >
                        REPORT FROM {fromdd+"-"+frommm+"-"+fromyy} TO {todd+"-"+tomm+"-"+toyy}
                        </th>
                      </tr>
                      
                      <tr>
                        <th>Name</th>
                        <th>Tithe</th>
                        <th>Offering</th>
                        <th>Missionary</th>
                        <th>Special Offering</th>
                        <th>Baptism Offering</th>
                        <th>Birthday Offering</th>
                        <th>Wedding Offering</th>
                        <th>Child Dedication Offering</th>
                        <th>Committed Offering</th>
                        <th>Building Fund</th>
                      </tr>
                      {[...new Set(namearray)].map((k)=>{
                        return(
                          <tr>
                            <td>{k}</td>
                            <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Tithe"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Missionary"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Special Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Baptism Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Birthday Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Wedding Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Child Dedication Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                           <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Committed Offering"){
                                  return(
                                  <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                               
                                
                              })}
                           </td>
                            <td>
                              {searchbydateobj.map((l)=>{
                                if(l.Name===k&&l.Type==="Building Fund"){
                                  return(
                                   <p>
                                      {l.Amount}
                                   </p>
                                  )
                                }
                                
                              })}
                            </td>
                          

                          </tr>
                        )
                      })}
                      <tr>
                        <th>Total</th>
                        <td>{titheTotal}</td>
                        <td>{offeringTotal}</td>
                        <td>{missionaryTotal}</td>
                        <td>{specialofferingTotal}</td>
                        <td>{baptismofferingTotal}</td>
                        <td>{birthdayofferingTotal}</td>
                        <td>{weddingofferingTotal}</td>
                        <td>{childdedicationofferingTotal}</td>
                        <td>{committedofferingTotal}</td>
                        <td>{buildingfundTotal}</td>
                      </tr>
                      <tr>
                        <td colSpan="7"></td>
                        <th colSpan="2">Church Offering</th><td colSpan="2">{churchOffering}</td></tr>
                    <tr>
                      <td colSpan="7"></td>
                      <th colSpan="2">Grand Total</th><td colSpan="2">{grandTotal}</td></tr>
                  </table>

                  <div className="deno">
                   <table>
                     <tr><th colSpan="2" >DENOMINATIONS</th></tr>
                   <tr> <td>2000 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoThousands),0)} = </td><td>{2000*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoThousands),0))} </td></tr>
                    <tr><td>500 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.FiveHundreds),0)}=  </td><td>{500*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.FiveHundreds),0))} </td></tr>
                    <tr><td>200 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoHundreds),0)} = </td><td>{200*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.TwoHundreds),0))} </td></tr>
                    <tr><td>100 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Hundreds),0)} = </td><td> {100*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Hundreds),0))} </td></tr>
                    <tr><td>50 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Fifty),0)}= </td><td>{50*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Fifty),0))} </td></tr>
                    <tr><td>20 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Twenty),0)} = </td><td>{20*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Twenty),0))} </td></tr>
                    <tr><td>10 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Ten),0)} = </td><td>{10*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Ten),0))} </td></tr>
                    <tr><td>5 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Five),0)}= </td><td>{5*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Five),0))}</td> </tr>
                    <tr><td>2 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Two),0)}= </td><td>{2*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.Two),0))} </td></tr>
                    <tr><td>1 x {objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.One),0)}= </td><td>{1*(objoftotals.reduce((accumulator,item)=>accumulator +parseFloat(item.One),0))}</td> </tr>
                   
                        </table>
                  </div>

                      </div>


                <button style={{backgroundColor:"#f70084",color:"white",border:"none",justifySelf:"center",paddingLeft:90,paddingRight:90,paddingTop:25,paddingBottom:25,borderRadius:"10px",marginBottom:"25px",marginTop:"25px",width:"100%"}} onClick={useReactToPrint({
                  content:()=>printref.current,documentTitle:fromdd+"-"+frommm+"-"+fromyy+" to "+todd+"-"+tomm+"-"+toyy 
                })} >Save as PDF</button>

            </div>

        </div>
    )

}
export default Fetchaccountingdetails;