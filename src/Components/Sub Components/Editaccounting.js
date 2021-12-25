import React, { useState } from "react";
import { url } from "../../Constants";

const Editaccounting=()=>{
    const [date,setdate]=useState('');
    const [dateset,isDateset]=useState(false);
    const [data,setdata]= useState([]);
    const [data2,setdata2]=useState({});
    const [click,setclick]=useState(0);
    const [tempname,settempname]=useState('');
    const [temptype,settemptype]=useState('');
    const [tempamount,settempamount]=useState(0);


    const sumbit=()=>{
        fetch(`${url}/jehovanissi/backend/apis/accounting-fetch.php`,{
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
            setdata(result);
            isDateset(true);
            data.map((x,key)=>{
                setdata((currentPeople)=>currentPeople.map((p,l)=>l===key?{
                    ...p,
                    OldType:p.Type,
                }:p));   
            })
        }
            else{
                alert(result);
            }
        
        
          }).catch((error)=>{
            console.error(error);
          });
    }
    const submit2=()=>{
        fetch(`${url}/jehovanissi/backend/apis/accounting-fetch-denominations.php`,{
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
            setdata2(result[0]);
            }
            
          }).catch((error)=>{
            console.error(error);
          });
    }

    
    


    let Total = isNaN(data.reduce((accumulator,item)=> isNaN(accumulator)?0:accumulator + parseFloat(item.Amount),0))?0:data.reduce((accumulator,item)=> isNaN(accumulator)?0:accumulator + parseFloat(item.Amount),0);

    let grandTotal = (1*data2['One'])+(2*data2['Two'])+(5*data2['Five'])+(10*data2['Ten'])+(20*data2['Twenty'])+(50*data2['Fifty'])+(100*data2['Hundreds'])+(200*data2['TwoHundreds'])+(500*data2['FiveHundreds'])+(2000*data2['TwoThousands']);

    let titheTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Tithe'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Tithe'?accumulator+parseFloat(item.Amount):accumulator,0);

    let offeringTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let missionaryTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Missionary'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Missionary'?accumulator+parseFloat(item.Amount):accumulator,0);

    let specialofferingTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Special Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Special Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let baptismofferingTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Baptism Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Baptism Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let birthdayofferingTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Birthday Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Birthday Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let weddingofferingTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Wedding Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Wedding Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let childdedicationofferingTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Child Dedication Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Child Dedication Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let committedofferingTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Committed Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Committed Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let buildingfundTotal = isNaN(data.reduce((accumulator,item)=> item.Type==='Building Fund'?accumulator+parseFloat(item.Amount):accumulator,0))?0:data.reduce((accumulator,item)=> item.Type==='Building Fund'?accumulator+parseFloat(item.Amount):accumulator,0);

    let churchOffering = grandTotal - Total;

        let name = data.map((k)=>k.Name);

        let type = data.map((k)=>k.Type);

        let oldtype = data.map((k)=>k.OldType);

        let amount = data.map((k)=>k.Amount);
        const [names,setnames] = useState([]);

        const [searchterm,setsearchterm]=useState();

        const results = !searchterm?names:names.filter(person=>person.toLowerCase().includes(searchterm.toLocaleLowerCase()));
        const searchapi = () =>{
            fetch(`${url}/jehovanissi/backend/apis/searchname.php`,{
                method:'POST',
                headers:{
                  'Accept' : 'application/json', 
                  'Content-Type' : 'application/json',
                  
                },
              })
                .then(res => res.json())
                .then((result) => {
                      setnames(result);
                  }).catch((error)=>{
                    console.error(error);
                  });
        }

    const confirm =() =>{
        

        fetch(`${url}/jehovanissi/backend/apis/edit-accounting.php`,{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },  
            body:JSON.stringify({
            Name:name,
            Type:type,
            Amount:amount,
            OldType:oldtype,
            date:date,
            TwoThousands:data2['TwoThousands'],
            FiveHundreds:data2['FiveHundreds'],
            TwoHundreds:data2['TwoHundreds'],
            Hundreds:data2['Hundreds'],
            Fifty:data2['Fifty'],
            Twenty:data2['Twenty'],
            Ten:data2['Ten'],
            Five:data2['Five'],
            Two:data2['Two'],
            One:data2['One'],
            ChurchOffering:churchOffering,
            TitheTotal:titheTotal,
            OfferingTotal:offeringTotal,
            SpecialOfferingTotal:specialofferingTotal,
            BaptismofferingTotal:baptismofferingTotal,
            BirthdayofferingTotal:birthdayofferingTotal,
            WeddingofferingTotal:weddingofferingTotal,
            ChilddedicationofferingTotal:childdedicationofferingTotal,
            CommittedofferingTotal:committedofferingTotal,
            MissionaryTotal:missionaryTotal,
            BuildingFundTotal:buildingfundTotal,
            GrandTotal:grandTotal
            
            })
          })
            .then(res => res.json())
            .then((result) => {
                  alert(result);
                 
              }).catch((error)=>{
                console.error(error);
              });

        }
        const deleteRow=(delName,delType)=>{
            fetch(`${url}/jehovanissi/backend/apis/accounting-delete-row.php`,{
                method:'POST',
                headers:{
                  'Accept' : 'application/json', 
                  'Content-Type' : 'application/json',
                  
                },
                body:JSON.stringify({
                    date:date,
                    name:delName,
                    type:delType

                })
            })
            .then(res => res.json())
            
            .catch((error)=>{
                console.error(error);
              });
        } 
        const addnew=()=>{
            fetch(`${url}/jehovanissi/backend/apis/accounting-add-new.php`,{
                method:'POST',
                headers:{
                  'Accept' : 'application/json', 
                  'Content-Type' : 'application/json',
                  
                },
                body:JSON.stringify({
                   Name:tempname,
                   date:date,
                   Name:tempname,
                   Type:temptype,
                   Amount:tempamount

                })
            })
            .then(res => res.json())
            .catch((error)=>{
                console.error(error);
              });
        } 

    return(
        <div style={{display:"grid",justifyContent:"center"}} >
            
            <div>
            <input type="date" onChange={(event)=>setdate(event.target.value)} />
            <button className="btn2" onClick={()=>{
                sumbit();
                submit2();
        }} >Submit</button>
        </div>
            <p style={{display:dateset?"none":"block"}} >Set Date First</p>
         <div style={{display:dateset?"block":"none"}} >
           
           <table>
               <tr>
                   <th colSpan="3" >
                       REPORT ON {date}
                   </th>
               </tr>
               

          
                {data.map((p,key)=>{
                    return(
                        <tr>
                            <td>
                                <p>{p.Name}</p>
                            </td>
                            
                       
        <td>                      <select value={p.Type} 
                            
                            onChange={(event)=>{
                          const Type = event.target.value;
                          setdata((currentPeople)=>currentPeople.map((x,l)=>l===key?{
                              ...x,
                              Type
                          }:x));
                          
                      }} >  <option className="options">Select </option>
                            <option className="options" value="Tithe">Tithe</option>
                            <option className="options" value="Offering">Offering</option>
                            <option className="options" value="Missionary">Missionary</option>
                            <option className="options" value="Special Offering">Special Offering</option>
                            <option className="options" value="Baptism Offering">Baptism Offering</option>
                            <option className="options" value="Birthday Offering">Birthday Offering</option>
                            <option className="options" value="Wedding Offering">Wedding Offering</option>
                            <option className="options" value="Child Dedication Offering">Child Dedication Offering</option>
                            <option className="options" value="Committed Offering">Committed Offering</option>
                            <option className="options" value="Building Fund">Building Fund</option>
                      </select>
                      </td>
                      <td><input onChange={(event)=>{
                          const Am = event.target.value;
                          let patt = /[^0-9]/g;
                          const Amount = parseFloat(Am.replace(patt,''));
                          setdata((currentPeople)=>currentPeople.map((x,l)=>l===key?{
                              ...x,
                              Amount
                          }:x));
                      }}   
                      value={p.Amount}
                      type="number"
                      placeholder="Enter Amount"/></td>
                        <td>
                        <button
                        style={{border:"none",cursor:"pointer"}}
                        onClick={
                        ()=>{
                            setdata(currentPeople=>currentPeople.filter((x,id)=>id!==key));
                            deleteRow(p.Name,p.Type);
                            
                        }
                    }><i style={{fontSize:"25px",backgroundColor:"transparent",color:"#f70084",padding:"5px"}} className="fas fa-trash-alt"></i></button></td>

                        </tr>
                    )
                })}

          
            <tr>
                
           <td> <button
             style={{border:"none",cursor:"pointer"}}
                onClick={()=>{
                    setclick(click+1);
                    
                }} 
            ><i style={{fontSize:"25px",backgroundColor:"transparent",color:"#f70084",padding:"5px"}} className="fas fa-user-plus"></i></button></td>
            
            </tr>
            <tr style={{display:click===0?"none":""}} >
            <td>
                <input onChange={(event)=>{
                          
                          searchapi();
                          const str = event.target.value.split(' ');
                          for (let i = 0;i<str.length;i++){

                            str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                          }
                          
                         const Name = str.join(' ');
                         setsearchterm(Name); 
                        settempname(Name);

                         
                         
                      }} 
                      value={tempname}
                      list="namelist"
                      placeholder="Enter Name" 
                      
                      />
                      <datalist id="namelist">
                              {results.map((k)=>{
                                  return(
                                      <option>{k}</option>
                                  )
                              })}  
                      </datalist>

                </td>
                <td>
                <select value={temptype} onChange={(event)=>{
                          const Type = event.target.value;
                          settemptype(Type);
                          
                      }} >  <option className="options">Select </option>
                            <option className="options" value="Tithe">Tithe</option>
                            <option className="options" value="Offering">Offering</option>
                            <option className="options" value="Missionary">Missionary</option>
                            <option className="options" value="Special Offering">Special Offering</option>
                            <option className="options" value="Baptism Offering">Baptism Offering</option>
                            <option className="options" value="Birthday Offering">Birthday Offering</option>
                            <option className="options" value="Wedding Offering">Wedding Offering</option>
                            <option className="options" value="Child Dedication Offering">Child Dedication Offering</option>
                            <option className="options" value="Committed Offering">Committed Offering</option>
                            <option className="options" value="Building Fund">Building Fund</option>
                      </select>

                </td>
                <td>
                <input onChange={(event)=>{
                          const Am = event.target.value;
                          let patt = /[^0-9]/g;
                          const Amount = parseFloat(Am.replace(patt,''));
                          settempamount(Amount);
                      }}   
                      value={tempamount}
                      type="number"
                      placeholder="Enter Amount"/>
                </td>
                <td>
                    <button
                        onClick={()=>{
                            setdata(currentPeople=>[...currentPeople,{
                                Name:tempname,
                                Type:temptype,
                                Amount:tempamount,
                            }]);
                            
                            addnew();
                            settempname('');
                            settempamount(0);
                            settemptype('');
                        }}
                    >
                        Confirm Adding
                    </button>
                </td>
                
                </tr>

             <tr>
                   <td></td>
                   <td>
                      Church Offering
                   </td>
                   <td>
                       {churchOffering}
                   </td>
                  
               </tr>


             <tr>
                   <td></td>
                   <td>
                      Total
                   </td>
                   <td>
                       {Total}
                   </td>
                  
               </tr>
              
               
               <tr>
                   <td></td>
                   <td>
                       Grand Total
                   </td>
                   <td>
                       {grandTotal}
                   </td>
                  
               </tr>
              
               
               
           </table>
            
           
           
             <div>
                <p>2000 x <input value={data2['TwoThousands']} 
                   onChange={(event)=>{setdata2({...data2,TwoThousands:event.target.value})}}
                    
                />={2000*(data2['TwoThousands'])}</p>
                <p>500 x <input value={data2['FiveHundreds']}
                onChange={(event)=>setdata2({...data2,FiveHundreds:event.target.value})} /> ={500*(data2['FiveHundreds'])}</p>
                <p>200 x <input value={data2['TwoHundreds']} 
                onChange={(event)=>setdata2({...data2,TwoHundreds:event.target.value})}
                />={200*(data2['TwoHundreds'])} </p>
                <p>100 x <input value={data2['Hundreds']} 
                onChange={(event)=>setdata2({...data2,Hundreds:event.target.value})}
                /> ={100*(data2['Hundreds'])}</p>
                <p>50 x <input value={data2['Fifty']} 
                onChange={(event)=>setdata2({...data2,Fifty:event.target.value})}
                />={50*(data2['Fifty'])}</p>
                <p>20 x <input value={data2['Twenty']} 
                onChange={(event)=>setdata2({...data2,Twenty:event.target.value})}
                />={20*(data2['Twenty'])} </p>
                <p>10 x <input value={data2['Ten']} 
                onChange={(event)=>setdata2({...data2,Ten:event.target.value})}
                />={10*(data2['Ten'])} </p>
                <p>5 x <input value={data2['Five']} 
                onChange={(event)=>setdata2({...data2,Five:event.target.value})}
                />={5*(data2['Five'])} </p>
                <p>2 x <input value={data2['Two']} 
                onChange={(event)=>setdata2({...data2,Two:event.target.value})}
                />={2*(data2['Two'])} </p>
                <p>1 x <input value={data2['One']} 
                onChange={(event)=>setdata2({...data2,One:event.target.value})}
                />={1*(data2['One'])} </p>
               <button className="btn2" style={{justifySelf:"center",paddingLeft:90,paddingRight:90,paddingTop:25,paddingBottom:25,borderRadius:"10px",marginBottom:"25px",width:"100%"}} onClick={()=>{confirm()}} >Confirm</button>
                </div>
                
                </div>

        </div>
    )
}

export default Editaccounting;