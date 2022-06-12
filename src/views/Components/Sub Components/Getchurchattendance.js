import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { url } from '../../Constants';
import { AlertMessage } from '../Support/AlertMessage';

const Getchurchattendance = () => {
    const [firstField, setfirstField] = useState();
    const [display1, setdisplay1] = useState("none");
    const [display2, setdisplay2] = useState("none");
    const [display3, setdisplay3] = useState("block");
    const [display4, setdisplay4] = useState("none");
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [namelist, setnamelist] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });
    const [service, setservice] = useState("FIRST SERVICE");

    let count = 0;

    let presentcount = 0;
    let absentcount = 0;

    let today = new Date();

    let dd = today.getDate();

    let mm = (today.getMonth() + 1) > 12 ? today.getMonth() : today.getMonth() + 1;

    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    const [present1, isPresent1] = useState(true);
    const [date, setdate] = useState(today);
    const [obj, setobj] = useState([]);
    const [obj1, setobj1] = useState([]);

    const [name, setname] = useState();

    let from = new Date(fromdate);
    let to = new Date(todate);

    let fromdd = from.getDate();
    fromdd = fromdd < 10 ? "0" + fromdd : fromdd;


    let frommm = (from.getMonth() + 1) > 12 ? from.getMonth() : from.getMonth() + 1;
    frommm = frommm < 10 ? "0" + frommm : frommm;
    if (fromdd === "00") {
        fromdd = 31;
        frommm = frommm - 1;
    }
    let fromyy = from.getFullYear();

    let todd = to.getDate();
    todd = todd < 10 ? "0" + todd : todd;


    let tomm = (to.getMonth() + 1) > 12 ? to.getMonth() : to.getMonth() + 1;
    tomm = tomm < 10 ? "0" + tomm : tomm;
    if (todd === "00") {
        todd = 31;
        tomm = tomm - 1;
    }
    let toyy = to.getFullYear();

    const submit1 = () => {
        if (date.length !== 0) {
            fetch(`${url}/searchchurchattbydate.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    date: date

                })
            })
                .then(res => res.json())
                .then((result) => {
                    if (result !== "No matches found on Record") {
                        setobj1(result);

                    }
                    else {
                        setobj1([{ "StudentName": "No results found", "Present": 1 }]);
                        setNotify({
                            ...notify,
                            isOpen:true,
                            message:result
                        })


                    }
                }).catch((error) => {
                    console.error(error);
                });

        }


        else {
            setNotify({
                ...notify,
                isOpen:true,
                message:"Input All required"
            })
        }
    }

    const submit = () => {
        if (fromdate && todate && name) {
            fetch(`${url}/searchchurchattbyname.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    name: name,
                    fromdate: fromdate,
                    todate: todate

                })
            })
                .then(res => res.json())
                .then((result) => {
                    if (result !== "No matches found on Record") {
                        setobj(result);
                        setdisplay3("block");
                        setdisplay4("block");
                    }
                    else {
                        setNotify({
                            ...notify,
                            isOpen:true,
                            message:result
                        })
                        setdisplay3("none");
                    }
                }).catch((error) => {
                    console.error(error);
                });

        }


        else {
            setNotify({
                ...notify,
                isOpen:true,
                message:"Input All required"
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
                setnamelist(result);
            }).catch((error) => {
                console.error(error);
            });
    }

    return (

        <div className="get-student-att-body" >
                <AlertMessage
                    notify={notify}
                    setNotify={setNotify}
                />
            <p>Search By:</p>
            <select value={firstField} onChange={(event) => {
                setfirstField(event.target.value);
                setdisplay1(event.target.value === "Name" ? "block" : "none");
                setdisplay2(event.target.value === "Date" ? "block" : "none");
                setdisplay3(event.target.value === "Date" ? "none" : "block");
            }} >
                <option>Select</option>
                <option value="Name" >Name</option>
                <option value="Date" >Date</option>
            </select>
            <div style={{ display: display1 }}>
                <TextField list="namelist" placeholder="Enter Name" value={name} onChange={(event) => {
                    searchapi();
                    const str = event.target.value.split(' ');
                    for (let i = 0; i < str.length; i++) {

                        str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
                    }

                    const Name = str.join(' ');

                    setname(Name);
                }} ></TextField>


                <datalist style={{ backgroundColor: "black" }} id="namelist">
                    {namelist.map((k, key) => {
                        return (
                            <option key={key}>{k}</option>
                        )
                    })}
                </datalist>
                <p>From:</p><TextField onChange={(event) => { setfromdate(event.target.valueAsDate); }} type="date" ></TextField>
                <p>To:</p><TextField onChange={(event) => { settodate(event.target.valueAsDate); }} type="date" ></TextField>


                <button style={{ margin: 10 }} className="btn" onClick={() => submit()} >Submit</button>

                <select onChange={(event) => {
                    setservice(event.target.value);
                }} >
                    <option value="FIRST SERVICE" >FIRST SERVICE</option>
                    <option value="SECOND SERVICE" >SECOND SERVICE</option>
                    <option value="THIRD SERVICE" >THIRD SERVICE</option>
                </select>
            </div>
            <div style={{ display: display2 }}>

                <TextField type="date" onChange={(event) => setdate(event.target.value)}></TextField>

                <select onChange={(event) => isPresent1(event.target.value === "true" ? true : false)}>
                    <option value="true" >Present</option>
                    <option value="false" >Absent</option>
                </select>
                <div style={{ padding: 10 }}>
                    <button className="btn" onClick={() => submit1()} >Submit</button></div>
                <select onChange={(event) => {
                    setservice(event.target.value);
                }} >
                    <option value="FIRST SERVICE" >FIRST SERVICE</option>
                    <option value="SECOND SERVICE" >SECOND SERVICE</option>
                    <option value="THIRD SERVICE" >THIRD SERVICE</option>
                </select>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <b style={{ color: "#f70084" }}> People present on {date}</b>
                            </td>

                        </tr>
                    </thead>

                    {obj1.map((p) => {
                        presentcount = p.Service === service ? (p.Present === "1" ? presentcount + 1 : presentcount) : presentcount;
                        absentcount = p.Service === service ? (p.Present === "0" ? absentcount + 1 : absentcount) : absentcount;
                        if (p.Present === present1 && p.Service === service) {



                            return (

                                <tbody key={p.Name} >
                                    <tr>
                                        <td>
                                            {p.Name}
                                        </td>
                                    </tr>
                                </tbody>

                            )

                        } else {
                            return (
                                <div></div>
                            )
                        }



                    })}
                    <div>
                        <p style={{ color: "#f70084" }}>No of Presents : <b style={{ color: "green" }}>{presentcount}</b></p>
                        <p style={{ color: "#f70084" }}>No of Absents : <b style={{ color: "red" }}>{absentcount}</b></p>
                    </div>
                </table>


            </div>
            <div style={{ display: display3 }}>
                <table style={{ display: "grid", justifyContent: "center" }}>
                    {obj.map((p) => {

                        if (p.Present == 1) {


                            count = count + 1;
                            if (service == p.Service) {
                                return (
                                    <tbody key={p.Name} style={{ backgroundColor: "#ccc" }} >
                                        <tr>
                                            <td style={{ color: "black", padding: 20 }}>{p.Name}</td>
                                            <td style={{ color: "black", padding: 20 }}>{p.Date}</td>
                                        </tr>
                                    </tbody>
                                );
                            }
                        }
                        else {
                            return (
                                <div></div>
                            )
                        }
                    })}

                </table>


                <div style={{ display: display4, margin: 10 }} >

                    {name} was present {count} {count > 1 ? "days" : "day"} between {fromdd + "/" + frommm + "/" + fromyy} to  {todd + "/" + tomm + "/" + toyy} </div>
            </div>
        </div>

    )

}

export default Getchurchattendance;