import { TextField } from "@mui/material";
import React, { useState } from "react";
import { url } from "../../Constants";
import { AlertMessage } from "../Support/AlertMessage";

const Newstudententry = () => {
  const [newname, setnewname] = useState('');
  const [names, setnames] = useState([]);
  const [searchterm, setsearchterm] = useState();
  const results = !searchterm ? names : names.filter(person => person.toLowerCase().includes(searchterm.toLocaleLowerCase()));
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });


  const submit = () => {
    if (newname) {
      fetch(`${url}/insertstudentname.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          newname: newname

        })
      })
        .then(res => res.json())
        .then((result) => {
          setNotify({
            ...notify,
            isOpen:true,
            message:result
          })
          window.location.reload();
        }).catch((error) => {
          console.error(error);
        });



    }
    else {
     setNotify({
       ...notify,
       isOpen:true,
       message:'Input All Requried'
     })
    }
  }
  const searchapi = () => {
    fetch(`${url}/searchname.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
    })
      .then(res => res.json())
      .then((result) => {
        setnames(result);
      }).catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="newentry">
      <AlertMessage
        notify={notify}
        setNotify={setNotify}
      />
      <TextField className="newentry-in"
        required
        placeholder="New Student"
        value={newname}
        onChange={(event) => {
          searchapi();
          const str1 = event.target.value.split(' ');
          for (let j = 0; j < str1.length; j++) {

            str1[j] = str1[j].charAt(0).toUpperCase() + str1[j].substring(1);
          }
          const newstr = str1.join(' ');
          setsearchterm(newstr);
          setnewname(newstr);

        }}
        list="namelist"
      ></TextField>
      <datalist id="namelist">
        {results.map((k, key) => {
          return (
            <option key={key} >{k}</option>
          )
        })}
      </datalist>


      <button className="btn" onClick={() => { submit() }}>+Add</button>
    </div>
  )
}

export default Newstudententry;