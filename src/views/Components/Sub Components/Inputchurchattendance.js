import { CAlert } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { url } from "../../Constants";
import { AlertMessage } from "../Support/AlertMessage";

const Inputchurchattendance = () => {

  const [namelist, setnamelist] = useState([]);
  const [churchattendance, setchurchattendance] = useState([]);
  const [date, setdate] = useState();
  const [service, setservice] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });

  const obj = [];

  let today = new Date();

  let dd = today.getDate();
  dd = dd < 10 ? "0" + dd : dd;
  if (dd === "00") {
    dd = 31;
    mm = mm - 1;
  }

  let mm = (today.getMonth() + 1) > 12 ? today.getMonth() : today.getMonth() + 1;
  mm = mm < 10 ? "0" + mm : mm;
  let yyyy = today.getFullYear();


  today = yyyy + "-" + mm + "-" + dd;


  useEffect(() => {
    fetch(`${url}/searchname.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
    })
      .then(res => res.json())
      .then((result) => {
        setnamelist(result);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  let i = 0;
  const count = namelist.length;

  for (i = 0; i < count; i++) {
    if (namelist[i] !== '') {
      obj.push({ "name": namelist[i], "present": false });
    }
  }

  useEffect(() => {


    setchurchattendance(obj);

  }, [namelist]);

  const submit = () => {
    if (churchattendance) {
      fetch(`${url}/church_attendance.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          churchattendance: churchattendance,
          date: date,
          service: service


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
  }

  return (

    <div className="church-attendance-body">
      <AlertMessage
        notify={notify}
        setNotify={setNotify}
      />
      <select className="sel-inp" onChange={(event) => setservice(event.target.value)}>
        <option value="FIRST SERVICE">FIRST SERVICE</option>
        <option value="SECOND SERVICE">SECOND SERVICE</option>
        <option value="THIRD SERVICE">THIRD SERVICE</option>


      </select>
      <input className="inp" type="date" onChange={(event) => { setdate(event.target.value) }} ></input>
      <button className="btn" onClick={() => {
        setdate(today)
      }}>Click if Today</button>
      <p>Date:{date}</p>
      <table>
        <thead>
          <tr><th>Name</th>
            <th>Present</th>
            <th>Absent</th></tr>
        </thead>
        <tbody>
          {churchattendance.map((p) => {
            return (
              <tr key={p.name} >
                <td>{p.name}</td>
                <td ><label className="container"><input

                  onChange={
                    (event) => {
                      let temp = true;

                      event.target.value === 'true' ? temp = true : temp = false;
                      const present = temp;
                      setchurchattendance((cp) => cp.map(x => x.name === p.name ? {
                        ...x,
                        present
                      } : x))
                    }} type="radio" name={p.name} value="true" /> <span className="fas fa-check present"></span> </label></td>
                <td ><label className="container"><input
                  onChange={
                    (event) => {
                      let temp = true;
                      event.target.value === 'false' ? temp = false : temp = true;
                      const present = temp;
                      setchurchattendance((cp) => cp.map(x => x.name === p.name ? {
                        ...x,
                        present
                      } : x))
                    }}
                  type="radio" name={p.name} value="false" /> <span className="fas fa-times absent"></span></label> </td>
              </tr>
            )
          })}</tbody>
        <tfoot></tfoot>


      </table>

      <button className="btn" onClick={() => { submit() }}>Submit</button>

    </div>
  )
}

export default Inputchurchattendance;