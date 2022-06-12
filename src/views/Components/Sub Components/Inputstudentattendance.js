
import React, { useEffect, useState } from "react";
import { url } from "../../Constants";
import { AlertMessage } from "../Support/AlertMessage";
import Newstudententry from "./newstudententry.js";

const Inputstudentattendance = () => {
  const [studentnames, setstudentnames] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });
  const [date, setdate] = useState();


  const obj = [];
  const [studentattendance, setstudentattendance] = useState([]);

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

  const submit = () => {
    if (studentattendance) {
      fetch(`${url}/student_attendance.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          studentattendance: studentattendance,
          date: date

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
       message:'Input All Required'
     })
    }
  }


  useEffect(() => {
    fetch(`${url}/getstudentname.php`)
      .then(res => res.json())
      .then(
        (result) => {

          setstudentnames(result);
        },
        (error) => {
          setNotify({
            ...notify,
            isOpen:true,
            message:error
          })
        }
      )
  }, [])






  let i = 0;
  const count = studentnames.length;

  for (i = 0; i < count; i++) {
    if (studentnames[i] !== '') {
      obj.push({ "name": studentnames[i], "present": false });
    }
  }

  useEffect(() => {


    setstudentattendance(obj);

  }, [studentnames]);




  return (
    <div className="student-attendance-body">
      <AlertMessage
        notify={notify}
        setNotify={setNotify}
      />
      <input className="inp" type="date" value={date} onChange={(event) => {
        setdate(event.target.value)
      }} /><button className="btn" onClick={() => setdate(today)} >Click if today</button>
      <p>Date:{date}</p>
      <table>
        <thead>
          <tr><th>Name</th>
            <th>Present</th>
            <th>Absent</th></tr>
        </thead>
        <tbody>
          {studentattendance.map((p) => {
            return (
              <tr key={p.name} >
                <td>{p.name}</td>
                <td ><label className="container"><input

                  onChange={
                    (event) => {
                      let temp = true;

                      event.target.value === 'true' ? temp = true : temp = false;
                      const present = temp;
                      setstudentattendance((cp) => cp.map(x => x.name === p.name ? {
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
                      setstudentattendance((cp) => cp.map(x => x.name === p.name ? {
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
      <button className="btn" onClick={() => submit()}>Submit</button>
      <div>
        <Newstudententry />

      </div>

    </div>
  )
}

export default Inputstudentattendance;