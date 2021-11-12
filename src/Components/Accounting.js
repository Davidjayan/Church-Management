import React, {  useState } from "react";
import '../assets/accounting.css';



const Accounting=()=>{
    const [people,setPeople]=useState([{id:1,Name:'',type:'',Amount:''}]);
    const [count,setCount]  = useState(2);
    const [names,setnames] = useState([]);

    const [searchterm,setsearchterm]=useState();

    const results = !searchterm?names:names.filter(person=>person.toLowerCase().includes(searchterm.toLocaleLowerCase()));

    const [ones,setones]=useState(0);
    const [twos,settwos]=useState(0);
    const [fives,setfives]=useState(0);
    const [tens,settens]= useState(0);
    const [twentys,settwentys]= useState(0);
    const [fiftys,setfiftys]= useState(0);
    const [hundreds,sethundreds]=useState(0);
    const [twohundreds,settwohundreds]=useState(0);
    const [fivehundreds,setfivehunndreds]=useState(0);
    const [twothousands,settwothousands]=useState(0);
    const [dateofofferings,setdateofofferings]=useState();


    let name = people.map((k)=>k.Name);

    let type = people.map((k)=>k.type);

    let amount = people.map((k)=>k.Amount);

   

    

    let today = new Date();

    let dd = today.getDate();
    dd = dd<10?"0"+dd:dd;
   

    let mm = (today.getMonth()+1)>12?today.getMonth():today.getMonth()+1;
    mm = mm<10?"0"+mm:mm;
    if(dd==="00"){
      dd=31;
      mm=mm-1;
  } 
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    let grandTotal = (1*ones)+(2*twos)+(5*fives)+(10*tens)+(20*twentys)+(50*fiftys)+(100*hundreds)+(200*twohundreds)+(500*fivehundreds)+(2000*twothousands);
    

    let Total = isNaN(people.reduce((accumulator,item)=> isNaN(accumulator)?0:accumulator + parseFloat(item.Amount),0))?0:people.reduce((accumulator,item)=> isNaN(accumulator)?0:accumulator + parseFloat(item.Amount),0);

    const churchOffering = grandTotal - Total;

    

    let titheTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Tithe'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Tithe'?accumulator+parseFloat(item.Amount):accumulator,0);

    let offeringTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let missionaryTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Missionary'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Missionary'?accumulator+parseFloat(item.Amount):accumulator,0);

    let specialofferingTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Special Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Special Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let baptismofferingTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Baptism Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Baptism Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let birthdayofferingTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Birthday Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Birthday Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let weddingofferingTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Wedding Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Wedding Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let childdedicationofferingTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Child Dedication Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Child Dedication Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let committedofferingTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Committed Offering'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Committed Offering'?accumulator+parseFloat(item.Amount):accumulator,0);

    let buildingfundTotal = isNaN(people.reduce((accumulator,item)=> item.type==='Building Fund'?accumulator+parseFloat(item.Amount):accumulator,0))?0:people.reduce((accumulator,item)=> item.type==='Building Fund'?accumulator+parseFloat(item.Amount):accumulator,0);

    const submit = () =>{
        if(name[0]&&dateofofferings&&(amount!==0)&&churchOffering>=0){
            fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/accounting.php",{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
              name:name,
              type:type,
              amount:amount,
              dateofofferings:dateofofferings,
              churchOffering:churchOffering,
              titheTotal:titheTotal,
              grandTotal:grandTotal,
              offeringTotal:offeringTotal,
              missionaryTotal:missionaryTotal,
              specialofferingTotal:specialofferingTotal,
              buildingfundTotal:buildingfundTotal,
              baptismofferingTotal:baptismofferingTotal,
              birthdayofferingTotal:birthdayofferingTotal,
              weddingofferingTotal:weddingofferingTotal,
              childdedicationofferingTotal:childdedicationofferingTotal,
              committedofferingTotal:committedofferingTotal,
              twothousands:twothousands,
              twohundreds:twohundreds,
              fivehundreds:fivehundreds,
              hundreds:hundreds,
              fiftys:fiftys,
              twentys:twentys,
              tens:tens,
              fives:fives,
              twos:twos,
              ones:ones
              
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
            alert("Input all required and check for mistakes");
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
                  setnames(result);
              }).catch((error)=>{
                console.error(error);
              });
    }


   return(
       <div className="banner">
       <div className="col1">
            
                    
          {people.map((p)=>{
              return(
                  <div key={p.id}>
                   


                      <input onChange={(event)=>{
                          
                          searchapi();
                          const str = event.target.value.split(' ');
                          for (let i = 0;i<str.length;i++){

                            str[i]=str[i].charAt(0).toUpperCase()+str[i].substring(1);
                          }
                          
                         const Name = str.join(' ');
                         setsearchterm(Name); 
                          setPeople((currentPeople)=>currentPeople.map(x=>x.id===p.id?{
                              ...x,
                              Name
                          }:x));
                      }} value={p.Name} 
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
                       

                      <select onChange={(event)=>{
                          const type = event.target.value;
                          setPeople((currentPeople)=>currentPeople.map(x=>x.id===p.id?{
                              ...x,
                              type
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
                      
                      <input onChange={(event)=>{
                          const Am = event.target.value;
                          let patt = /[^0-9]/g;
                          const Amount = parseFloat(Am.replace(patt,''));
                          setPeople((currentPeople)=>currentPeople.map(x=>x.id===p.id?{
                              ...x,
                              Amount
                          }:x));
                      }}   
                      value={p.Amount}
                      type="number"
                      placeholder="Enter Amount"/>

                    <button
                    style={{border:"none",cursor:"pointer",backgroundColor:"transparent"}}
                    onClick={
                        ()=>{
                            setPeople(currentPeople=>currentPeople.filter(x=>x.id!==p.id));setCount(count-1)
                        }
                    }><i style={{fontSize:"25px",backgroundColor:"transparent",color:"#f70084",padding:"5px"}} className="fas fa-trash-alt"></i></button>

                   
                      
                  </div>
              )

          })}
          <button
          style={{border:"none",cursor:"pointer",backgroundColor:"transparent"}}
          onClick={()=>{
                          setPeople(currentPeople=>[...currentPeople,{
                              id:count,
                              Name:'',
                              type:'',
                              Amount:'',
                          }]);setCount(count+1)
                      }} 
                      ><i style={{fontSize:"25px",backgroundColor:"transparent",color:"#f70084",padding:"5px"}} className="fas fa-user-plus"></i></button>
                
                <p>Total:{Total}</p>
                <p>Tithe Total:{JSON.stringify(titheTotal)}</p>
                <p>Offering Total:{JSON.stringify(offeringTotal)}</p>
                <p>Special Offering Total:{JSON.stringify(specialofferingTotal)}</p>
                <p>Missionary Total:{JSON.stringify(missionaryTotal)}</p>
                <p>Building Fund Total:{JSON.stringify(buildingfundTotal)}</p>


                <p>Church Offering:{isNaN(churchOffering)?0:churchOffering}</p>
                <p>Grand Total:{isNaN(grandTotal)?0:grandTotal}</p>
                <button onClick={submit} style={{justifySelf:"center",paddingLeft:90,paddingRight:90,paddingTop:25,paddingBottom:25}} >Submit</button>
       </div>
       <div className="col2"> 

       <p>Date:{dateofofferings}</p><input value={dateofofferings} onChange={(event)=>setdateofofferings(event.target.value)} type="date"  />
       <button onClick={()=>setdateofofferings(today)} >Click if date is todays date</button>

     
       

       <p>2000 x <input min="0" onChange={(event)=>settwothousands(event.target.valueAsNumber)}  type="number" /><span>={isNaN(2000*twothousands)?0:2000*twothousands}</span></p>
       <p>500 x <input  min="0" onChange={(event)=>setfivehunndreds(event.target.valueAsNumber)}  type="number" /><span>={isNaN(500*fivehundreds)?0:500*fivehundreds}</span></p>
       <p>200 x <input  min="0" onChange={(event)=>settwohundreds(event.target.valueAsNumber)}  type="number" /><span>={isNaN(200*twohundreds)?0:200*twohundreds}</span></p>
       <p>100 x <input  min="0" onChange={(event)=>sethundreds(event.target.valueAsNumber)}  type="number" /><span>={isNaN(100*hundreds)?0:100*hundreds}</span></p>
       <p>50 x <input   min="0" onChange={(event)=>setfiftys(event.target.valueAsNumber)}  type="number" /><span>={isNaN(50*fiftys)?0:50*fiftys}</span></p>
       <p>20 x <input   min="0" onChange={(event)=>settwentys(event.target.valueAsNumber)}  type="number" /><span>={isNaN(20*twentys)?0:20*twentys}</span></p>
       <p>10 x <input   min="0" onChange={(event)=>settens(event.target.valueAsNumber)}  type="number" /><span>={isNaN(10*tens)?0:10*tens}</span></p>
       <p>5 x <input    min="0" onChange={(event)=>setfives(event.target.valueAsNumber)}  type="number" /><span>={isNaN(5*fives)?0:5*fives}</span></p>
       <p>2 x <input    min="0" onChange={(event)=>settwos(event.target.valueAsNumber)}  type="number" /><span>={isNaN(2*twos)?0:2*twos}</span></p>
       <p>1 x <input    min="0" onChange={(event)=>setones(event.target.valueAsNumber)}  type="number" /><span>={isNaN(1*ones)?0:1*ones}</span></p>
       
       
          
          
</div>
       
</div>
                
   )
}
export default Accounting;