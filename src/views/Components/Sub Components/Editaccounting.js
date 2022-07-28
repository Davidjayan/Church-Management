import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Autocomplete, Button, Grid, IconButton, MenuItem, Select, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { url } from "../../Constants";
import { AlertMessage } from "../Support/AlertMessage";
import useFetch from 'use-http'
import { Datepicker } from "../Support/Datepicker";

const Editaccounting = (props) => {
    const { setLoading } = props;
    const [Total, setTotal] = useState();
    const [click, setclick] = useState(0);
    const [tempname, settempname] = useState('');
    const [temptype, settemptype] = useState('');
    const [tempamount, settempamount] = useState(0);
    const [dateValue, setdateValue] = useState();
    const [dateset, isDateset] = useState(false);
    const [report, setOfferingReport] = useState([]);
    const [denominationsAndTotals, setDenominationsandTotals] = useState(
        [{
            "Date": "",
            "ChurchOffering": "0",
            "TitheTotal": "0",
            "OfferingTotal": "0",
            "SpecialOfferingTotal": "0",
            "BaptismofferingTotal": "0",
            "BirthdayofferingTotal": "0",
            "WeddingofferingTotal": "0",
            "ChilddedicationofferingTotal": "0",
            "CommittedofferingTotal": "0",
            "MissionaryTotal": "0",
            "BuildingFundTotal": "0",
            "GrandTotal": "0",
            "TwoThousands": "0",
            "FiveHundreds": "0",
            "TwoHundreds": "0",
            "Hundreds": "0",
            "Fifty": "0",
            "Twenty": "0",
            "Ten": "0",
            "Five": "0",
            "Two": "0",
            "One": "0"
        }]
    );
    const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });

    const arrOfferingTypes = [
        { "name": "Select", "value": "" },
        { "name": "Tithe", "value": "Tithe" },
        { "name": "Offering", "value": "Offering" },
        { "name": "Missionary", "value": "Missionary" },
        { "name": "Special Offering", "value": "Special Offering" },
        { "name": "Baptism Offering", "value": "Baptism Offering" },
        { "name": "Birthday Offering", "value": "Birthday Offering" },
        { "name": "Wedding Offering", "value": "Wedding Offering" },
        { "name": "Child Dedication Offering", "value": "Child Dedication Offering" },
        { "name": "Committed Offering", "value": "Committed Offering" },
        { "name": "Building Fund", "value": "Building Fund" }
    ]



    const denoTypes = [
        { "name": "TwoThousands", "value": 2000 },
        { "name": "FiveHundreds", "value": 500 },
        { "name": "TwoHundreds", "value": 200 },
        { "name": "Hundreds", "value": 100 },
        { "name": "Fifty", "value": 50 },
        { "name": "Twenty", "value": 20 },
        { "name": "Ten", "value": 10 },
        { "name": "Five", "value": 5 },
        { "name": "Two", "value": 2 },
        { "name": "One", "value": 1 }
    ]
    // const { get, post, response, loading, error } = useFetch(url)

    // const fetchOffering = async ()=>{
    //     const result = await post('/accounting-fetch.php', { date: dateValue });
    //     let arr = result.message[0];


    // }







    const fetchOfferingAndDenominationsByDate = async () => {
        if (dateValue) {
            setLoading(true);
            setDenominationsandTotals(
                [{
                    "Date": dateValue,
                    "ChurchOffering": "0",
                    "TitheTotal": "0",
                    "OfferingTotal": "0",
                    "SpecialOfferingTotal": "0",
                    "BaptismofferingTotal": "0",
                    "BirthdayofferingTotal": "0",
                    "WeddingofferingTotal": "0",
                    "ChilddedicationofferingTotal": "0",
                    "CommittedofferingTotal": "0",
                    "MissionaryTotal": "0",
                    "BuildingFundTotal": "0",
                    "GrandTotal": "0",
                    "TwoThousands": "0",
                    "FiveHundreds": "0",
                    "TwoHundreds": "0",
                    "Hundreds": "0",
                    "Fifty": "0",
                    "Twenty": "0",
                    "Ten": "0",
                    "Five": "0",
                    "Two": "0",
                    "One": "0"
                }]
            );
            setOfferingReport([]);
            fetch(`${url}/accounting-fetch.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    date: dateValue
                })
            })
                .then(res => res.json())
                .then((result) => {
                    setLoading(false);
                    isDateset(true);
                    if (result.status !== 0) {
                        let mess = result['message'][0];
                        if (result['message'][1]['Date'] || mess.length !== 0) {
                            setDenominationsandTotals([result['message'][1]]);
                            for (let i = 0; i < mess.length; i++) {
                                mess[i].oldtype = mess[i]['Type'];
                            }
                            setOfferingReport(mess);

                            isDateset(true);
                        }
                        else {

                            setNotify({
                                ...notify,
                                isOpen: true,
                                severity:'error',
                                message: "No records found"
                            })
                        }
                    }
                    else {
                        setNotify({
                            ...notify,
                            isOpen: true,
                            message: result.message
                        })
                    }


                }).catch((error) => {
                    console.error(error);
                })
        }
        else {
            setNotify({
                ...notify,
                isOpen: true,
                message: "Please fill all the required input and try again"
            })
        }
    }

    const setDeno = async (value, denoName) => {
        setDenominationsandTotals([...denominationsAndTotals], denominationsAndTotals[0][denoName] = value);
    }



    useEffect(() => {
        let total = isNaN(report.reduce((accumulator, item) => isNaN(accumulator) ? 0 : accumulator + parseFloat(item.Amount), 0)) ? 0 : report.reduce((accumulator, item) => isNaN(accumulator) ? 0 : accumulator + parseFloat(item.Amount), 0);

        setTotal(total);

        let churchOffering = denominationsAndTotals[0]['GrandTotal'] - total;

        let titheTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Tithe' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Tithe' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let offeringTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let missionaryTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Missionary' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Missionary' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let specialofferingTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Special Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Special Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let baptismofferingTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Baptism Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Baptism Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let birthdayofferingTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Birthday Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Birthday Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let weddingofferingTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Wedding Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Wedding Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let childdedicationofferingTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Child Dedication Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Child Dedication Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let committedofferingTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Committed Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Committed Offering' ? accumulator + parseFloat(item.Amount) : accumulator, 0);

        let buildingfundTotal = isNaN(report.reduce((accumulator, item) => item.Type === 'Building Fund' ? accumulator + parseFloat(item.Amount) : accumulator, 0)) ? 0 : report.reduce((accumulator, item) => item.Type === 'Building Fund' ? accumulator + parseFloat(item.Amount) : accumulator, 0);


        setDenominationsandTotals([...denominationsAndTotals],
            denominationsAndTotals[0]['ChurchOffering'] = churchOffering,
            denominationsAndTotals[0]['TitheTotal'] = titheTotal,
            denominationsAndTotals[0]['BaptismofferingTotal'] = baptismofferingTotal,
            denominationsAndTotals[0]['OfferingTotal'] = offeringTotal,
            denominationsAndTotals[0]['MissionaryTotal'] = missionaryTotal,
            denominationsAndTotals[0]['SpecialOfferingTotal'] = specialofferingTotal,
            denominationsAndTotals[0]['BirthdayofferingTotal'] = birthdayofferingTotal,
            denominationsAndTotals[0]['WeddingofferingTotal'] = weddingofferingTotal,
            denominationsAndTotals[0]['ChilddedicationofferingTotal'] = childdedicationofferingTotal,
            denominationsAndTotals[0]['CommittedofferingTotal'] = committedofferingTotal,
            denominationsAndTotals[0]['BuildingFundTotal'] = buildingfundTotal,

        );
    }, [report, denominationsAndTotals[0].GrandTotal])




    const [names, setnames] = useState([]);

    const [searchterm, setsearchterm] = useState();

    const results = !searchterm ? names : names.filter(person => person.toLowerCase().includes(searchterm.toLocaleLowerCase()));
    const searchapi = () => {
        setLoading(true);
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
                setLoading(false);
            }).catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        searchapi();
    }, [])


    const confirm = () => {
        setLoading(true);

        fetch(`${url}/edit-accounting.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                denominationsAndTotals: denominationsAndTotals[0],
                report

            })
        })
            .then(res => res.json())
            .then((result) => {
                setLoading(false);
                setNotify({
                    ...notify,
                    severity: result.status == 0 ? "error" : "success",
                    isOpen: true,
                    message: result.message
                })

            }).catch((error) => {
                console.error(error);
            });

    }
    const deleteRow = (delName, delType, key) => {
        setLoading(true);
        fetch(`${url}/accounting-delete-row.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                date: dateValue,
                name: delName,
                type: delType

            })
        })
            .then(res => res.json())
            .then((result) => {
                setLoading(false);
                setNotify({
                    ...notify,
                    isOpen: true,
                    severity: result.status == 0 ? "error" : "success",
                    message: result.message
                });
                if (result.status == 1) {
                    setOfferingReport(currentPeople => currentPeople.filter((x, id) => id !== key));
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const addnew = () => {
        setLoading(true);
        fetch(`${url}/accounting-add-new.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "Name": tempname,
                "date": dateValue,
                "Type": temptype,
                "Amount": tempamount
            })
        })
            .then(res => res.json())
            .then((result) => {
                setLoading(false);
                setNotify({
                    ...notify,
                    isOpen: true,
                    severity: result.status == 0 ? "error" : "success",
                    message: result.message
                });
                if (result.status == 1) {
                    setOfferingReport(currentPeople => [...currentPeople, {
                        Name: tempname,
                        Type: temptype,
                        Amount: tempamount,
                        Date:dateValue,
                        oldtype:temptype
                    }]);
                }
            })
            .catch((error) => {
                console.error(error);
            }).then(() => {

                settempamount('');
                settempamount('');
                settemptype('');
            })
    }


    return (
        <Grid style={{ display: "grid", justifyContent: "center" }} >

            <AlertMessage
                notify={notify}
                setNotify={setNotify}
            />
            <Grid>
                <Datepicker
                    setValue={setdateValue}
                    value={dateValue}
                    label='Date'
                />
                <Button className="btn2" onClick={() => {
                    fetchOfferingAndDenominationsByDate()
                }} >Submit</Button>
            </Grid>
            <Grid style={{ display: dateset ? "block" : "none" }} >

                <Table>
                    <TableRow>
                        <TableHead>
                            <TableCell>
                                <Typography>
                                    REPORT ON {new Date(dateValue).toLocaleDateString()}
                                </Typography>
                            </TableCell>
                        </TableHead>
                    </TableRow>



                    {report.map((p, key) => {
                        return (
                            <TableRow key={key} >
                                <TableCell>
                                    <p>{p.Name}</p>
                                </TableCell>


                                <TableCell>
                                    <Select value={p.Type}
                                        onChange={(event) => {
                                            const Type = event.target.value;
                                            setOfferingReport((currentPeople) => currentPeople.map((x, l) => l === key ? {
                                                ...x,
                                                Type
                                            } : x));

                                        }} >
                                        {arrOfferingTypes.map((val, key) => {
                                            return (
                                                <MenuItem
                                                    value={val.value}
                                                    key={key}
                                                >
                                                    {val.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </TableCell>
                                <TableCell><TextField onChange={(event) => {
                                    const Am = event.target.value;
                                    let patt = /[^0-9]/g;
                                    const Amount = parseFloat(Am.replace(patt, ''));
                                    setOfferingReport((currentPeople) => currentPeople.map((x, l) => l === key ? {
                                        ...x,
                                        Amount
                                    } : x));
                                }}
                                    value={p.Amount}
                                    type="number"
                                    placeholder="Enter Amount" /></TableCell>
                                <TableCell>
                                    <IconButton
                                        style={{ border: "none", cursor: "pointer" }}
                                        onClick={
                                            () => {

                                                deleteRow(p.Name, p.Type, key);

                                            }
                                        }>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        )
                    })}


                    <TableRow>

                        <TableCell>
                            <IconButton
                                style={{ border: "none", cursor: "pointer" }}
                                onClick={() => {
                                    setclick(click + 1);

                                }}
                            >
                                <AddCircleOutline />
                            </IconButton>
                        </TableCell>

                    </TableRow>
                    <TableRow style={{ display: click === 0 ? "none" : "" }} >
                        <TableCell>
                            <Autocomplete
                                options={names}
                                value={tempname}
                                onChange={(e, v) => {
                                    settempname(v)
                                }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        placeholder="Enter Name"
                                        onChange={({ target }) => {
                                            settempname(target.value)
                                        }}
                                    />
                                }
                            />


                        </TableCell>
                        <TableCell>
                            <Select
                                value={temptype}
                                onChange={(event) => {
                                    const Type = event.target.value;
                                    settemptype(Type);

                                }} >
                                {arrOfferingTypes.map((val, key) => {
                                    return (
                                        <MenuItem
                                            key={key}
                                            value={val.value}
                                        >
                                            {val.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>

                        </TableCell>
                        <TableCell>
                            <TextField
                                onChange={(event) => {
                                    const Am = event.target.value;
                                    let patt = /[^0-9]/g;
                                    const Amount = parseFloat(Am.replace(patt, ''));
                                    settempamount(Amount);
                                }}
                                value={tempamount}
                                type="number"
                                placeholder="Enter Amount" />
                        </TableCell>
                        <TableCell>
                            <Button
                                onClick={() => {
                                    if (tempname !== '' && temptype !== '') {
                                        addnew();
                                    }
                                    else {
                                        setNotify({
                                            ...notify,
                                            isOpen: true,
                                            message: "Input all required"
                                        })
                                    }


                                }}
                            >
                                Confirm Adding
                            </Button>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <Typography>
                                Church Offering
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {denominationsAndTotals[0]['ChurchOffering']}
                        </TableCell>

                    </TableRow>


                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <Typography>
                                Total
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {Total}
                        </TableCell>

                    </TableRow>


                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            Grand Total
                        </TableCell>
                        <TableCell>
                            {denominationsAndTotals[0]['GrandTotal']}
                        </TableCell>

                    </TableRow>



                </Table>



                <Grid>

                    {
                        denoTypes.map((val, key) => {
                            let name = val.name
                            return (
                                <Grid
                                    item
                                    container
                                    key={key}
                                    direction={"row"}
                                    alignItems={"center"}
                                    margin={2}
                                >
                                    <Typography>
                                        {val.value} x
                                    </Typography>
                                    <TextField
                                        value={denominationsAndTotals[0][name]}
                                        onChange={(e) => {
                                            setDeno(e.target.value, name).then(() => {
                                                let grandTotal = (1 * denominationsAndTotals[0]['One']) + (2 * denominationsAndTotals[0]['Two']) + (5 * denominationsAndTotals[0]['Five']) + (10 * denominationsAndTotals[0]['Ten']) + (20 * denominationsAndTotals[0]['Twenty']) + (50 * denominationsAndTotals[0]['Fifty']) + (100 * denominationsAndTotals[0]['Hundreds']) + (200 * denominationsAndTotals[0]['TwoHundreds']) + (500 * denominationsAndTotals[0]['FiveHundreds']) + (2000 * denominationsAndTotals[0]['TwoThousands']);
                                                // let grandTotal = (val.value*(isNaN(parseFloat(valueOfinput)?0:parseFloat(valueOfinput))))+parseFloat(denominationsAndTotals[0]['GrandTotal']);

                                                setDenominationsandTotals([...denominationsAndTotals], denominationsAndTotals[0]['GrandTotal'] = grandTotal);
                                            })

                                            // setDenominationsandTotals([...denominationsAndTotals,{GrandTotal:n}]);
                                        }}
                                    />  
                                    <Typography>
                                        ={val.value * (isNaN(parseFloat(denominationsAndTotals[0][name])) ? 0 : parseFloat(denominationsAndTotals[0][name]))}
                                    </Typography>
                                </Grid>
                            )
                        })
                    }

                    <Button
                        onClick={() => { confirm() }}
                        variant="contained"
                    >
                        Confirm
                    </Button>
                </Grid>

            </Grid>

        </Grid>
    )
}

export default Editaccounting;