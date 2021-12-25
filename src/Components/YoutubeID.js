import React,{useState} from 'react';
import '../assets/youtubeids.css';

const YoutubeID = () =>{
    const [links,setlinks]=useState([{sno:1,id:''}]);
    const [count,setcount] =useState(2);

    let id = links.map((k)=>k.id);

    const submit = () =>{
            fetch(`${url}/jehovanissi/backend/apis/youtubeid.php`,{
            method:'POST',
            headers:{
              'Accept' : 'application/json', 
              'Content-Type' : 'application/json',
              
            },
            body:JSON.stringify({
                id:id
              
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
            
        
     
    
    return(
            <div className="yout-body">
                   
                   <button className="btn" onClick={()=>{
                          setlinks(currentPeople=>[...currentPeople,{
                              sno:count,
                              id:''
                          }]);setcount(count+1);
                      }} >Add</button>
                    {links.map((k)=>{
                        return(
                            <div key={k.sno}>
                                <input onChange={(event)=>{
                                const temp = event.target.value;
                                const id = temp.slice(17);
                                setlinks((currentPeople)=>currentPeople.map(x=>x.sno===k.sno?{
                                    ...x,
                                    id
                                }:x));
                            }}  placeholder="Enter the link"></input> 

                                <button className="btn" onClick={
                        ()=>{
                            setlinks(currentPeople=>currentPeople.filter(x=>x.sno!==k.sno));setcount(count-1)
                        }
                    }>Remove</button>

                                </div>
                        )
                    })}
                    
        <div><button  className="btn"onClick={()=>submit()}>Submit</button>
                      

        </div>
        </div>
    )
}

export default YoutubeID;