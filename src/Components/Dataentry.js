import React, { useState } from "react";
import '../assets/dataentry.css';

const Dataentry=()=>{
    const [name,        setName         ]=useState('');
    const [dob,         setDob          ] = useState('');
    const [gender,      setGender       ] =useState('');
    const [married,     setMarried    ] = useState(false);
    const [weddingdate, setWeddingdate] = useState('');
    const [emailid,     setEmailid      ] = useState('');
    const [mobile,      setMobile       ]  = useState();
    const [address,     setAddress      ] = useState('');
    const [familyhead,  setFamilyhead   ] = useState('');
    const [baptized,    setBaptized     ]    = useState(false);
    const [android,     setAndroid      ] = useState(true);
    const [familyid,    setFamilyid     ] = useState('');
    const [selfid,      setSelfid       ]        =   useState('');
    const [display,     setdisplay      ]  = useState("none");
    const [familyheads,setFamilyheads]  = useState([]);
    const [validity,setvalidity]=useState();

    

   
    const [opacity1,setopacity1] = useState();
    const [top1,settop1]=useState();
    const [fontsize1,setfontsize1]=useState();
    const [color1,setcolor1]  = useState();

    const [opacity2,setopacity2] = useState();
    const [top2,settop2]=useState();
    const [fontsize2,setfontsize2]=useState();
    const [color2,setcolor2]  = useState();

    const [opacity3,setopacity3] = useState();
    const [top3,settop3]=useState();
    const [fontsize3,setfontsize3]=useState();
    const [color3,setcolor3]  = useState();

    const [opacity4,setopacity4] = useState();
    const [top4,settop4]=useState();
    const [fontsize4,setfontsize4]=useState();
    const [color4,setcolor4]  = useState();
    
    const [opacity5,setopacity5] = useState();
    const [top5,settop5]=useState();
    const [fontsize5,setfontsize5]=useState();
    const [color5,setcolor5]  = useState();
    const [border5,setborder5] = useState();

    const [opacity6,setopacity6] = useState();
    const [top6,settop6]=useState();
    const [fontsize6,setfontsize6]=useState();
    const [color6,setcolor6]  = useState();

    const [opacity7,setopacity7] = useState();
    const [top7,settop7]=useState();
    const [fontsize7,setfontsize7]=useState();
    const [color7,setcolor7]  = useState();

    const str = dob.split('-');
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

   
    

    const changefloat1=()=>{
            settop1("20px");
            setopacity1(1);
            setcolor1("#f70084");
            setfontsize1("14px");
    }

    const changetorest1=()=>{
        if(!familyid){
        settop1("35px");
        setopacity1(0.5);
        setcolor1("black");
            setfontsize1("22px");
        }
        else{
            settop1("20px");
            setopacity1(1);
            setcolor1("#f70084");
            setfontsize1("14px");
        }
    }
    const changefloat2=()=>{
        settop2("20px");
            setopacity2(1);
            setcolor2("#f70084");
            setfontsize2("14px");
    }

    const changetorest2=()=>{
        if(!selfid){
            settop2("35px");
            setopacity2(0.5);
            setcolor2("black");
            setfontsize2("22px");
            }
            else{
                settop2("20px");
                setopacity2(1);
                setcolor2("#f70084");
                setfontsize2("14px");
            }
    }
    const changefloat3=()=>{
        settop3("20px");
            setopacity3(1);
            setcolor3("#f70084");
            setfontsize3("14px");
    }

    const changetorest3=()=>{
        if(!name){
            settop3("35px");
            setopacity3(0.5);
            setcolor3("black");
            setfontsize3("22px");
            }
            else{
                settop3("20px");
                setopacity3(1);
                setcolor3("#f70084");
                setfontsize3("14px");
            }
    }
    const changefloat4=()=>{
        settop4("20px");
            setopacity4(1);
            setcolor4("#f70084");
            setfontsize4("14px");
    }

    const changetorest4=()=>{
        if(!emailid){
            settop4("35px");
            setopacity4(0.5);
            setcolor4("black");
            setfontsize4("22px");
            }
            else{
                settop4("20px");
                setopacity4(1);
                setcolor4("#f70084");
                setfontsize4("14px");
            }
    }
    const changefloat5=(event)=>{
 
        settop5("20px");
            setopacity5(1);
            setborder5("#f70084");
            setcolor5("#f70084");
            setfontsize5("14px");
        
    }

    const changetorest5=()=>{
        if(!mobile){
            settop5("35px");
            setopacity5(0.5);
            setcolor5("black");
            setborder5("#ccc");
            setfontsize5("22px");
            }
            else{
                 
                if(mobile.length<10){
                    settop5("20px");
                setopacity5(1);
                setborder5("red");
                setfontsize5("14px");
                    setcolor5("red"); 
                }
                else{
                    settop5("20px");
                setopacity5(1);
                setborder5("#ccc");
                    setcolor5("#f70084");
                setfontsize5("14px");
                }
            
              
            }
    }
    const changefloat6=()=>{
        settop6("20px");
            setopacity6(1);
            setcolor6("#f70084");
            setfontsize6("14px");
    }

    const changetorest6=()=>{
        if(!address){
            settop6("35px");
            setopacity6(0.5);
            setcolor6("black");
            setfontsize6("22px");
            }
            else{
                settop6("20px");
                setopacity6(1);
                setcolor6("#f70084");
                setfontsize6("14px");
            }
    }
    const changefloat7=()=>{
        settop7("20px");
            setopacity7(1);
            setcolor7("#f70084");
            setfontsize7("14px");
    }

    const changetorest7=()=>{
        if(!familyhead){
            settop7("35px");
            setopacity7(0.5);
            setcolor7("black");
            setfontsize7("22px");
            }
            else{
                settop7("20px");
                setopacity7(1);
                setcolor7("#f70084");
                setfontsize7("14px");
            }
            
    }

    const addrecords=()=>{
        if((familyid&&familyhead&&address&&selfid&&name&&gender&&(!mobile.length<10))!==''){
            setvalidity(true);
        }
        else{
            setvalidity(false);
        }
    
            if(validity){
        
            let Familyid    = familyid;
            let Selfid      = selfid;
            let Name        = name;
            let Dob         = dob;
            let Age         = age;
            let Gender      = gender;
            let Married     = married;
            let Weddingdate = weddingdate;
            let Emailid     = emailid;
            let Mobile      = mobile;
            let Address     = address;
            let Familyhead  = familyhead;
            let Baptized    = baptized;
            let Android     = android;     
            

        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/member_details.php",{
        method:'POST',
        headers:{
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            
          name:Name,
          dob:Dob,
          age:Age,
          gender:Gender,
          married:Married,
          weddingdate:Weddingdate,
          emailid:Emailid,
          mobile:Mobile,
          address:Address,
          familyhead:Familyhead,
          baptized:Baptized,
          android:Android,
          familyid:Familyid,
          selfid:Selfid
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
            alert("Input All required");

        }


        
    }

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
    
   
    return(
        <div className="form" >
            

            <label><input name="familyid" className="checkk" onBlur={changetorest1} onFocus={changefloat1} value={familyid}  onChange={(event)=>setFamilyid(event.target.value.toUpperCase()) } /><span style={{top:top1,opacity:opacity1,color:color1,fontSize:fontsize1}} className="floating-label">Family id</span></label>
            
            <label><input name="selfid" value={selfid} onBlur={changetorest2} onFocus={()=>{setSelfid(familyid.slice(3));changefloat2()}}  ></input><span style={{top:top2,opacity:opacity2,color:color2,fontSize:fontsize2}} className="floating-label">Enter SelfID</span></label>
            <label>
                <input name="name"  value={name} onBlur={changetorest3} 
                onFocus={changefloat3} 

                onChange={(event)=>{
                    const str = event.target.value.split(' ');
                          for (let i = 0;i<str.length;i++){

                            str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                          }
                          
                         const Nameoff = str.join(' ');
                    setName(Nameoff)}} >
                </input><span style={{top:top3,opacity:opacity3,color:color3,fontSize:fontsize3}} className="floating-label">Enter Name</span></label>
            <div className="dateinputbox" ><input type="date" name="dob" placeholder="DOB" value={dob} onChange={(event)=>setDob(event.target.value)} /><p>{age}</p></div>
            
            
            <div className="radio">  
            <div className="radioinput"><label>Male </label><input type="radio" value="male" name="gender" onChange={(event)=>setGender(event.target.value)} /> 
            <label>Female</label>  <input type="radio" value="female" name="gender" onChange={(event)=>setGender(event.target.value)}/></div>
            <div className="radioinput"><label>Married </label> <input type="radio" value='true' name="married" onChange={(event)=>{setMarried(event.target.value==='true'?event.target.value=true:event.target.value=false);setdisplay(event.target.value==="true"?"block":"none")}} /> 
            <label>Unmarried </label> <input type="radio" value='false' name="married" onChange={(event)=>{setMarried(event.target.value==='false'?event.target.value=false:event.target.value=true);setdisplay(event.target.value==="false"?"none":"block")}} /></div>
            </div>
            <input style={{display:display}} name="weddingdate" type="date" placeholder="Wedding Date" onChange={(event)=>setWeddingdate(event.target.value)}  ></input>
            <label><input name="emailid" onBlur={changetorest4} onFocus={changefloat4} onChange={(event)=>setEmailid(event.target.value)}  value={emailid} ></input><span style={{top:top4,opacity:opacity4,color:color4,fontSize:fontsize4}} className="floating-label">Enter EmailID</span></label>
            <label><input style={{borderColor:border5}} name="mobile" onBlur={changetorest5} onFocus={changefloat5} value={mobile}  onChange={(event)=>{
                
               
                    
                let patt = /[^0-9]/g;
                const ph = event.target.value.replace(patt,'');
                setMobile(ph.slice(0,10));    
            } } ></input><span style={{top:top5,opacity:opacity5,color:color5,fontSize:fontsize5}} className="floating-label">Enter Mobile</span></label>
            
            <label><input name="address"  onBlur={changetorest6} onFocus={changefloat6} value={address} onChange={(event)=>setAddress(event.target.value)}   ></input><span style={{top:top6,opacity:opacity6,color:color6,fontSize:fontsize6}} className="floating-label">Enter Address </span></label>
            <label><input name="familyhead"  
            onBlur={changetorest7} onFocus={changefloat7} value={familyhead} 
            onChange={(event)=>{
                searchfamilyhead();
                const str = event.target.value.split(' ');
                          for (let i = 0;i<str.length;i++){

                            str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                          }
                          
                         const familyheadname = str.join(' ');
                
                setFamilyhead(familyheadname)}} 
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

                <span style={{top:top7,opacity:opacity7,color:color7,fontSize:fontsize7}} className="floating-label">Enter Familyhead </span></label>
            <div className="radio">
            <div className="radioinput">
            <label>Baptized</label>
            <input name="baptized" type="radio" value='true' onChange={(event)=>setBaptized(event.target.value==='true'?event.target.value=true:event.target.value=false)} ></input>
            
            <label>Not baptized</label>
            <input name="baptized" type="radio" value='false' onChange={(event)=>setBaptized(event.target.value==='false'?event.target.value=false:event.target.value=true)} ></input>
            </div>
            
            <div className="radioinput">
            <label>Android</label>  <input name="android" type="radio" value='true' onChange={(event)=>setAndroid(event.target.value==='true'?event.target.value=true:event.target.value=false)} ></input>

            <label>Normal</label>   <input name="android"  type="radio" value='false' onChange={(event)=>setAndroid(event.target.value==='false'?event.target.value=false:event.target.value=true)} ></input>
            </div>
            </div>
            <button className="bt" onClick={addrecords} >Add to records</button>
            
        </div>
    )

}
    
export default Dataentry;