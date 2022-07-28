import React, { useEffect, useState } from 'react';
import { url } from '../Constants';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { CAlert, CFormSelect, CFormText, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { AlertMessage } from './Support/AlertMessage';
import { DataEntryForms } from './DataEntryForm';

const EditData = () => {
    const [data, setdata] = useState([]);
    const [pageno, setPageno] = useState(0);
    const [pages, setPages] = useState([]);
    const [editdata, seteditdata] = useState();
    const items = 10;
    const [familyheads, setFamilyheads] = useState([]);
    const [addresses, setAddresses] = useState([]);



    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget

        if (form.checkValidity() == false) {
            // event.preventDefault()

            event.stopPropagation()

        }
        else {
            setValidated(true);
        }
    }

    useEffect(() => {
        fetch(`${url}/member-data-count.php`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((result) => {
                if (result['status'] == 1) {
                    let pagecount = parseInt(parseInt(result['message']) / items);
                    let pageList = [];
                    for (let i = 0; i <= pagecount; i++) {
                        pageList.push(i);
                    }
                    setPages(pageList);
                    pageList = [];
                }
            })
    }, [])

    useEffect(() => {
        fetch(`${url}/data-fetch.php?page_no=${pageno}&items=${items}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((res) => res.json())
            .then((result) => {
                if (result['status'] == 1) {
                    let mess = result['message'];
                    for (let i = 0; i < mess.length; i++) {
                       mess[i].InitialSID = mess[i]['SelfID'];                        
                    }
                    setdata(mess);
                }
                else {
                    setNotify({
                        ...notify,
                        isOpen: true,
                        severity: result['status'] == 1 ? "success" : "error",
                        message: String(result['message'])
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [pageno,validated]);


    useEffect(()=>{
        searchfamilyhead();
        makechanges();
    },[validated])



    const searchfamilyhead = () => {
        fetch(`${url}/searchfamilyhead.php`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(res => res.json())
            .then((result) => {
                let filteredresult = [...new Set(result)];
                setFamilyheads(filteredresult);
            }).catch((error) => {
                console.error(error);
            });
    }
    const searchaddress = () => {
        fetch(`${url}/searchaddress.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(res => res.json())
            .then((result) => {
                let filteredresult = [...new Set(result)];
                setAddresses(filteredresult);
            }).catch((error) => {
                console.error(error);
            });
    }
    const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });

    const makechanges = () => {
        if(editdata!==undefined){
            fetch(`${url}/data-edit.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: editdata
                })
    
            }).then((res) => res.json())
                .then((result) => {
                    setNotify({
                        ...notify,
                        isOpen: true,
                        severity:result['status']==1?'success':'error',
                        message: result['message']
                    });
                    setValidated(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    const deleteRecord = () => {


        fetch(`${url}/data-delete.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selfid: editdata['SelfID']
            })

        }).then((res) => res.json())
            .then((result) => {
                setNotify({
                    ...notify,
                    isOpen: true,
                    message: result
                })
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const Typograph = (props) => {
        return (
            <p className='lead' > {props.children} </p>
        )
    }
    const [searchby, setsearchby] = useState("id");
    const [value, setvalue] = useState();
    return (
        <Grid className="editform" >
            
            {/* <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                <Typograph >
                    Search by
                </Typograph>
                <Grid
                    width={100}
                >
                    <Select
                        name="searchby"
                        defaultValue={"name"}
                        onChange={(event) => setsearchby(event.target.value)}
                    >
                        <MenuItem value="id">Id</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                    </Select>
                </Grid>
                <TextField
                    onChange={(event) => {
                        const func = (k) => {
                            const str = k.split(' ');
                            for (let i = 0; i < str.length; i++) {

                                str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
                            }

                            return str.join(' ');
                        }
                        let val = searchby === "id" ? event.target.value.toUpperCase() : func(event.target.value);
                        setvalue(searchby === "id" ? event.target.value.toUpperCase() : func(event.target.value));

                        if (searchby === "id") {
                            data.map((l, index) => {
                                if (l.FamilyID === val) {
                                    setrow(index);
                                    setdisplay2("block");
                                }
                            })
                        } else if (searchby === "name") {
                            data.map((l, index) => {
                                if (l.Name === val) {
                                    setrow(index);
                                    setdisplay2("block");
                                }
                            })

                        }
                    }}
                    style={{ width: 250, marginTop: 30, marginBottom: 30 }}
                    value={value}
                    placeholder={`Enter ${searchby}`}
                    list={searchby === "id" ? "idsearch" : "namesearch"}
                />

                <datalist id="idsearch" >
                    {data.map((k, key) => {
                        return (
                            <option key={key}>{k.FamilyID}</option>
                        )
                    })}
                </datalist>

                <datalist id="namesearch" >
                    {data.map((k, key) => {
                        return (
                            <option key={key} >{k.Name}</option>
                        )
                    })}
                </datalist>
            </Grid> */}
            {editdata != undefined ?
                <DataEntryForms
                    familyheads={familyheads}
                    data={editdata}
                    notify={notify}
                    setNotify={setNotify}
                    setData={seteditdata}
                    validated={validated}
                    handleSubmit={handleSubmit}
                />
                : ''

            }

            <Grid direction={"column"} item>
                <Select
                    placeholder="Pageno"
                    defaultValue={pageno} onChange={
                        (e) => {
                            setPageno(e.target.value)
                        }
                    }>
                    {pages.map((val, index) => {
                        return (
                            <MenuItem value={val} key={index} >{val}</MenuItem>
                        )
                    })}
                </Select>
            </Grid>
            <CTable>
                <CTableHead>
                    <CTableHeaderCell>SELF ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Family head</CTableHeaderCell>

                </CTableHead>
                <CTableBody>
                    {data.map((k, index) => {
                        return (
                            <CTableRow key={index}>
                                <CTableDataCell>{k.SelfID}</CTableDataCell>
                                <CTableDataCell>{k.Name}</CTableDataCell>
                                <CTableDataCell>{k.FamilyHead}</CTableDataCell>
                                <CTableDataCell><Button
                                    onClick={() => {
                                        seteditdata(data[index]);
                                    }}
                                >Edit</Button></CTableDataCell>

                            </CTableRow>
                        )
                    })}
                </CTableBody>
            </CTable>




        </Grid>
    )
}
export default EditData;