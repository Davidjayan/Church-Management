import React,{useState} from "react";

const Newstudententry = () =>{
    const [newname,setnewname]=useState('');
    const [names,setnames] = useState([]);
    const [searchterm,setsearchterm]=useState();
    const results = !searchterm?names:names.filter(person=>person.toLowerCase().includes(searchterm.toLocaleLowerCase()));
    

    const submit = () =>{
        if(newname){
        fetch("http://backendjnag.rf.gd/jehovanissi/backend/apis/insertstudentname.php",{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
              newname:newname
              
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
                alert("Input Required");
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
        <div className="newentry">
        <input className="newentry-in"
        required
        placeholder="New Student"
          value={newname}
          onChange={(event)=>{
            searchapi();
            const str1 = event.target.value.split(' ');
            for (let j = 0;j<str1.length;j++){

              str1[j]=str1[j].charAt(0).toUpperCase()+str1[j].substring(1);
            }
            const newstr = str1.join(' ');
            setsearchterm(newstr); 
            setnewname(newstr);
            
          }}
          list="namelist"
          ></input>
          <datalist id="namelist">
                              {results.map((k)=>{
                                  return(
                                      <option>{k}</option>
                                  )
                              })}  
                      </datalist>
          
          
          <button className="btn" onClick={()=>{submit()}}>+Add</button>
          </div>
    )
}

export default Newstudententry;