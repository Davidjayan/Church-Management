import React, { useEffect, useState } from 'react';
import '../assets/editdataentry.css';

const EditData = () =>{
        const [data,setdata]=useState([]);
        const [familyheads,setFamilyheads]  = useState([]);
        const [addresses,setAddresses]  = useState([]);
                


    useEffect(()=>{
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/data-fetch.php",{
        method:'POST',
        headers:{
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        
      }).then((res)=>res.json())
        .then((result)=>{
            setdata(result);
            result.map((x,key)=>{
                setdata((currentPeople)=>currentPeople.map((p,l)=>l===key?{
                    ...p,
                    InitialSID:p.SelfID,
                }:p));   
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    },[2]);


    const searchfamilyhead = () =>{
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/searchfamilyhead.php",{
        method:'POST',
        headers:{
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        
      })
        .then(res => res.json())
        .then((result) => {
            let filteredresult = [...new Set(result)];
              setFamilyheads(filteredresult);
          }).catch((error)=>{
            console.error(error);
          });
    }
    const searchaddress= () =>{
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/searchaddress.php",{
        method:'POST',
        headers:{
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        
      })
        .then(res => res.json())
        .then((result) => {
            let filteredresult = [...new Set(result)];
              setAddresses(filteredresult);
          }).catch((error)=>{
            console.error(error);
          });
    }

    const [display2,setdisplay2]=useState("none");
    const [row,setrow]=useState(0);
    const [focus,isFocused]=useState({'familyid':data[row]!==undefined?data[row]['FamilyID']!==''?true:false:true,'selfid':data[row]!==undefined?data[row]['SelfID']!==''?true:false:true,'name':data[row]!==undefined?data[row]['Name']!==''?true:false:true,'email':data[row]!==undefined?data[row]['EmailID']!==''?true:false:true,'mobile':data[row]!==undefined?data[row]['Mobile']!==''?true:false:true,'address':data[row]!==undefined?data[row]['Address']!==''?true:false:true,'familyhead':data[row]!==undefined?data[row]['FamilyHead']!==''?true:false:true})


    const makechanges = ()=>{
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/data-edit.php",{
        method:'POST',
        headers:{
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            data:data[row]
        })
        
      }).then((res)=>res.json())
        .then((result)=>{
            alert(result);
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const deleteRecord = ()=>{
       
           
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/data-delete.php",{
        method:'POST',
        headers:{
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            selfid:data[row]['SelfID']
        })
        
      }).then((res)=>res.json())
        .then((result)=>{
            alert(result);
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error);
        })
    
    }
    const [searchby,setsearchby]=useState("id");
    const [value,setvalue] = useState();
    return(
        <div className="editform" >
         <div>   <p>Search By</p>
            <select 
            name="searchby" onChange={(event)=>setsearchby(event.target.value)}  >
                <option value="id">Id</option>
                <option value="name">Name</option>
            </select>
            <input onChange={(event)=>{
                const func = (k) =>{
                    const str = k.split(' ');
               for (let i = 0;i<str.length;i++){

                 str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
               }
               
              return str.join(' ');
                } 
                let val=searchby==="id"?event.target.value.toUpperCase():func(event.target.value);
                setvalue(searchby==="id"?event.target.value.toUpperCase():func(event.target.value));
                
                if(searchby==="id"){
                    data.map((l,index)=>{
                        if(l.FamilyID===val){
                            setrow(index);
                            setdisplay2("block");
                        }
                    })
                }else if(searchby==="name"){
                    data.map((l,index)=>{
                        if(l.Name===val){
                            setrow(index);
                            setdisplay2("block");
                        }
                    })
                    
                }
            }} 
            value={value}

            list={searchby==="id"?"idsearch":"namesearch"}
            />

            </div>
            <datalist id="idsearch" >
                {data.map((k)=>{
                    return(
                        <option>{k.FamilyID}</option>
                    )
                })}
            </datalist>

            <datalist id="namesearch" >
                {data.map((k)=>{
                    return(
                        <option>{k.Name}</option>
                    )
                })}
            </datalist>

            
            
            <div style={{display:display2}} className="form1" >
            <label><input name="familyid" value={data[row]===undefined?'':data[row]['FamilyID']} 
            onChange={(event)=>{
                setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
                    ...x,
                    FamilyID:event.target.value.toUpperCase(),
                    SelfID:event.target.value.slice(3)
                }:x));
            }}
            className="checkk1"  /><span  className={focus['familyid']===true?"floating-label2":"floating-label1"}>Family id</span></label>
            
            <label><input name="selfid" disabled="true"  value={data[row]===undefined?'':data[row]['SelfID']} ></input><span className={focus['selfid']===true?"floating-label2":"floating-label1"}>Enter SelfID</span></label>

            <label>
     <input name="name"    
        value={data[row]===undefined?'':data[row]['Name']}
        onFocus={(event)=>isFocused({...focus,name:event.target.value===''?false:true})}
        onBlur={(event)=>isFocused({...focus,name:event.target.value===''?false:true})}

     onChange={(event)=>{
         const str = event.target.value.split(' ');
               for (let i = 0;i<str.length;i++){

                 str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
               }
               
              const Nameoff = str.join(' ');
              setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
                ...x,
                Name:Nameoff
            }:x));
         }}/>
     <span  className={focus['name']===true?"floating-label2":"floating-label1"}>Enter Name</span></label>
 <div className="dateinputbox1" ><input type="date" name="dob" value={data[row]===undefined?'':data[row]['DOB']} placeholder="DOB" 
    onChange={(event)=>{

        const str = event.target.value.split('-');
        const today = new Date();
        const mon = today.getMonth();
         const year = today.getFullYear();
        let age;    
        let k=year-1;
        if(mon>=str[1]){
        age = year-str[0];
        }
        else{
        age = k-str[0];
        }
        setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
            ...x,
            DOB:event.target.value,
            Age:age
        }:x));
    }}
 
 /><p>{data[row]===undefined?'':data[row]['Age']}</p></div>
 
 
 <div className="radio1"  >  
 <div className="radioinput1"><label>Male </label>
 <input type="radio" 
 checked={data[row]===undefined?'':data[row]['Gender']==="male"?true:false} 
 value="male"  
 name="gender" 
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Gender:event.target.value
    }:x));
 }}
 /> 
 <label>Female</label>  
 <input type="radio" 
 checked={data[row]===undefined?'':data[row]['Gender']==="female"?true:false} 
 value="female" 
 name="gender"
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Gender:event.target.value
    }:x));
 }}
 /></div>
 <div className="radioinput1"><label>Married </label> 
 <input type="radio" 
 checked={data[row]===undefined?'':data[row]['Married']==="1"?true:false} 
 value='true' 
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Married:event.target.value==="true"?"1":"0"
    }:x));
 }}
 name="married" /> 
 <label>Unmarried </label> 
 <input type="radio" checked={data[row]===undefined?'':data[row]['Married']==="0"?true:false}
 value='false'
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Married:event.target.value==="true"?"1":"0"
    }:x));
 }}
 name="married"  /></div>
 </div>
 <input style={{display:data[row]===undefined?"none":data[row]['Married']==="1"?"block":"none"}} name="weddingdate" value={data[row]===undefined?'':data[row]['WeddingDate']} type="date" placeholder="Wedding Date" 
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        WeddingDate:event.target.value
    }:x));
 }}
 
 ></input>
 <label><input name="emailid" value={data[row]===undefined?'':data[row]['EmailID']}
        onFocus={(event)=>isFocused({...focus,email:event.target.value===''?false:true})}
        onBlur={(event)=>isFocused({...focus,email:event.target.value===''?false:true})} 
        onChange={(event)=>{
            setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
                ...x,
                EmailID:event.target.value
            }:x));
         }}
        ></input><span className={focus['email']===true?"floating-label2":"floating-label1"}>Enter EmailID</span></label>
 <label><input  name="mobile" 
 value={data[row]===undefined?'':data[row]['Mobile']}
 onFocus={(event)=>isFocused({...focus,mobile:event.target.value===''?false:true})}
 onBlur={(event)=>isFocused({...focus,mobile:event.target.value===''?false:true})}
 onChange={(event)=>{
     
    
         
     let patt = /[^0-9]/g;
     const ph = event.target.value.replace(patt,'');
     setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Mobile:ph
    }:x));
      
 } } ></input><span  className={focus['mobile']===true?"floating-label2":"floating-label1"}>Enter Mobile</span></label>
 
 <label><input name="address" value={data[row]===undefined?'':data[row]['Address']}
        onFocus={(event)=>isFocused({...focus,address:event.target.value===''?false:true})}
        onBlur={(event)=>isFocused({...focus,address:event.target.value===''?false:true})}   
        onChange={(event)=>{

            searchaddress();
            const str = event.target.value.split(',');
                      for (let i = 0;i<str.length;i++){
       
                        str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                      }
                      
                     const address = str.join(',');
                     setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
                       ...x,
                       Address:address
                   }:x));
            }}
                list = "searchaddresses"
        ></input>
        <datalist id="searchaddresses">
         {addresses.map((k)=>{
             return(
                 <option>{k}</option>
             )
         })}
     </datalist>
        
        <span  className={focus['address']===true?"floating-label2":"floating-label1"}>Enter Address </span></label>
 <label><input name="familyhead"  
 value={data[row]===undefined?'':data[row]['FamilyHead']}
 onFocus={(event)=>isFocused({...focus,familyhead:event.target.value===''?false:true})}
 onBlur={(event)=>isFocused({...focus,familyhead:event.target.value===''?false:true})}
 onChange={(event)=>{
     searchfamilyhead();
     const str = event.target.value.split(' ');
               for (let i = 0;i<str.length;i++){

                 str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
               }
               
              const familyheadname = str.join(' ');
              setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
                ...x,
                FamilyHead:familyheadname
            }:x));
     }} 
     list="searchfhead"
     >
     </input>
     <datalist id="searchfhead">
         {familyheads.map((k)=>{
             return(
                 <option>{k}</option>
             )
         })}
     </datalist>

     <span  className={focus['familyhead']===true?"floating-label2":"floating-label1"}>Enter Familyhead </span></label>
 <div className="radio">
 <div className="radioinput1">
 <label>Baptized</label>
 <input name="baptized"  type="radio" 
 checked={data[row]===undefined?'':data[row]['Baptized']==="1"?true:false}
 value='true' 
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Baptized:event.target.value==="true"?"1":"0"
    }:x));
 }}
 ></input>
 
 <label>Not baptized</label>
 <input name="baptized" type="radio"
 checked={data[row]===undefined?'':data[row]['Baptized']==="0"?true:false}
 value='false' 
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Baptized:event.target.value==="true"?"1":"0"
    }:x));
 }}
 ></input>
 </div>
 
 <div className="radioinput1">
 <label>Android</label>  <input name="android" type="radio" 
 checked={data[row]===undefined?'':data[row]['Android']==="1"?true:false}
 value='true' 
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Android:event.target.value==="true"?"1":"0"
    }:x));
 }}
 
 ></input>

 <label>Normal</label>   <input name="android"  type="radio" 
 checked={data[row]===undefined?'':data[row]['Android']==="0"?true:false}
 value='false'
 onChange={(event)=>{
    setdata((currentPeople)=>currentPeople.map((x,index)=>index===row?{
        ...x,
        Android:event.target.value==="true"?"1":"0"
    }:x));
 }}
 ></input>
 </div>
 </div>
 <button onClick={()=>makechanges()} className="bt1">Make Changes</button>
 <button onClick={()=>deleteRecord()} className="bt1">Delete Selected Form</button>
</div>
            

<table>
                <tr>
                    <th>SELF ID</th>
                    <th>Name</th>
                    <th>Father or Husband Name</th>

                </tr>
                {data.map((k,index)=>{
                    return(
                        <tr>
                            <td>{k.SelfID}</td>
                            <td>{k.Name}</td>
                            <td>{k.FamilyHead}</td>
                            <td><button 
                                onClick={()=>{
                                    setrow(index);
                                    setdisplay2("block");
                                }}
                             >Edit</button></td>

                        </tr>
                    )
                })}
            </table>




        </div>
    )
}
export default EditData;